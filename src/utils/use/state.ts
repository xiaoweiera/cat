/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */

import { inject, provide, ref, toRaw, watch } from 'vue'
import { upperFirst, isUndefined, debounce, toArray, map } from '~/utils'

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
  provide(`${upperFirst(name)}state`, state)
  const merge = function(data: any) {
    const [ oldValue = {} ] = state.value
    const newValue = Object.assign({}, oldValue, data)
    set(newValue)
  }
  return [state, set, merge]
}

export const useWatch = function<T>(name: string, callback: SetCallback, value?: any) {
  const array = useProvide(name, value)
  const [ state ] = array
  if (state) {
    watch(state, callback)
  }
  return array
}

export const getState = function(name: string) {
  const key = `${upperFirst(name)}state`
  return inject(key)
}

export const watchState = function(names: string | string[], callback: SetCallback) {
  const states = map(function(key: string) {
    return getState(key)
  }, toArray(names))
  if (states && callback) {
    const app = debounce<SetCallback>(callback)
    // @ts-ignore
    watch(states, app, {
      deep: true
    })
    app(...states)
  }
  if (states.length > 1) {
    return states
  }
  return states[0]
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
  console.warn('⚠️ 该方法不推荐使用, 请使用 setInject')
  if (name) {
    const set = setInject(name)
    if (set) {
      set(...args)
      return true
    }
  }
  return false
}

export const mergeState = function(name: string) {
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

export const mergeInject = function(name: string, value: any): boolean {
  console.warn('不建议使用，请改为 margeState 方法')
  if (name && value) {
    const marge = mergeState(name)
    return marge(value)
  }
  return false
}



