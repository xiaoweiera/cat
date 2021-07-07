/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */

import { upperFirst } from '~/utils/index'
import { inject, provide, ref, toRaw } from 'vue'

type SetCallback = (value?: any, index?: number | string) => void

export enum EchartsOptionName {
  series = 'series',
  yAxis = 'yAxis',
  xAxis = 'xAxis',
  legend = 'legend',
  tooltip = 'tooltip'
}

export const useProvide = function<T>(name: string, value?: any): any[] {
  const state = ref<T[]>(value ? [].concat(value) : [])
  const set = function(data: any, index: number | string = 0) {
    const arr = toRaw(state.value)
    // @ts-ignore
    arr[index] = data
    state.value = arr
  }
  provide(name, set)
  provide(`get${upperFirst(name)}`, () => state)
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
  if (name && args.length > 0) {
    const set = setInject(name)
    if (set) {
      set(...args)
      return true
    }
  }
  return false
}

export const initProps = {
  index: function() {
    return {
      type: [Number, String],
      default () {
        return 0
      }
    }
  },
  position: function() {
    return {
      type: String,
      default(): string {
        return 'left'
      },
      validator (value: string): boolean {
        if (value === 'left' || value === 'right') {
          return true
        }
        return false
      }
    }
  }
}


