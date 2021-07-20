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
  const [ state ] = useProvide(name, value)
  watch(state, callback)
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
  console.log(name, args)
  if (name) {
    const set = setInject(name)
    if (set) {
      console.log('update : ', name, set)
      set(...args)
      return true
    }
  }
  return false
}

export const margeInject = function(name: string, value: any): boolean {
  if (name && value) {
    const set = setInject(name)
    const state = getInject(name)
    if (set && state) {
      const [ oldValue = {} ] = state.value
      set(Object.assign({}, oldValue, value))
      return true
    }
  }
  return false
}



