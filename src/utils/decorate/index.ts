/**
 * @file 装饰器
 */
import 'reflect-metadata'
import { isString, isFunction, isEmpty, compact, toBoolean } from '~/utils'

export type ErrCatch = (e: Error, ...args: any[]) => void

// 处理异常默认值
export const ErrorDefault = function(value?: any, log?: boolean) {
  return function(e: Error, ...args: any[]) {
    console.log(e)
    if (log) {
      if (args.length > 0) {
        console.log(...args)
      }
    }
    return value
  }
}

// 处理异常，默认返回空
export const ErrorNull = ErrorDefault(void 0)


export const before = function(fun: () => any) {
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value
    descriptor.value = function(...args: any[]) {
      const status = toBoolean(fun())
      if (status) {
        return app.apply(this, args)
      } else {
        throw new Error('before result = false, Function name = ' + methodName)
      }
    }
  }
}

export const tryError = function(errCatch?: string | ErrCatch) {
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value
    descriptor.value = async function(...args: any[]) {
      try {
        return await Promise.resolve(app.apply(this, args))
      } catch (e) {
        const query: any[] = compact([e].concat(args))
        // @ts-ignore
        if (errCatch && isString(errCatch) && this[errCatch]) {
          // @ts-ignore
          return this[errCatch](...query)
        }
        if (errCatch && isFunction(errCatch)) {
          // @ts-ignore
          return errCatch(...query)
        }
        console.warn('Function %s trigger Error', methodName)
        // @ts-ignore
        return ErrorNull(...query)
      }
    }
  }
}


const requiredMetadataKey = Symbol('required')

export const required = function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

export const validate = function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const fun = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (const parameterIndex of requiredParameters) {
        if (parameterIndex >= args.length || isEmpty(args[parameterIndex])) {
          throw new Error("Missing required argument.");
        }
      }
    }
    // @ts-ignore
    return fun.apply(this, args);
  }
}
