/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */

import { inject, provide, ref, toRaw, watch } from 'vue'
import { upperFirst, isUndefined } from '~/utils/index'

type SetCallback = (value?: any, index?: number | string) => void
const autoValue = function(value?: any): Array<any> {
  if (isUndefined(value)) {
    return []
  }
  return [].concat(value)
}

export const useProvide = function<T>(name: string, value?: any): any[] {
  const state = ref<T[]>(autoValue(value))
  const set = function(data: any, index: number | string = 0) {
    if (data) {
      // @ts-ignore
      const arr = [].concat(toRaw(state.value))
      // @ts-ignore
      arr[index] = data
      state.value = arr
    } else {
      state.value = []
    }
  }
  provide(name, set)
  provide(`get${upperFirst(name)}`, () => state)
  return [state, set]
}

export const useWatch = function<T>(name: string, callback: SetCallback, value?: any) {
  const [ state, set ] = useProvide(name, value)
  watch(state, callback)
  return [state, set]
}

export const getInject = function(name: string) {
  const get = inject(`get${upperFirst(name)}`)
  if (get) {
    // @ts-ignore
    return get()
  }
  return void 0
}

export const setInject = function(name: string): SetCallback {
  return inject<SetCallback>(name) as any
}
export const updateInject = function(name: string, ...args: any[]): boolean {
  if (name) {
    const set = setInject(name)
    if (set) {
      set(...args)
      return true
    }
  }
  return false
}

export const margetState = function(name: string) {
  const set = setInject(name)
  const state = getInject(name)
  return function<T>(value: T) {
    if (set && state) {
      const [ oldValue = {} ] = state.value
      const data = Object.assign({}, oldValue, value)
      set(data)
      return true
    }
    return false
  }
}

export const margeInject = function(name: string, value: any): boolean {
  console.warn('不建议使用，请改为 margetState 方法')
  if (name && value) {
    const marge = margetState(name)
    return marge(value)
  }
  return false
}



