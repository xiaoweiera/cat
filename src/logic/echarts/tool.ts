/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */

import { Position, SeriesItem } from './interface'
import { isNumber, isString, numberUint } from '~/utils/index'

export * from '~/utils/use/state'

export enum EchartsOptionName {
  series = 'series',
  yAxis = 'yAxis',
  xAxis = 'xAxis',
  legend = 'legend',
  tooltip = 'tooltip'
}

export const initProps = {
  index: function() {
    return {
      type: [Number, String],
      required: true
    }
  },
  position: function() {
    return {
      type: String,
      default: () => Position.left,
      validator (value: string): boolean {
        return value === Position.left || value === Position.right;
      }
    }
  }
}

export const valueFormatter = function(data: SeriesItem): string {
  if (isNumber(data) || isString(data)) {
    data = { value: data } as any
  }
  let value: any = '-'
  if (data.value) {
    if (isNumber(data.value)) {
      if (data.origin && isNumber(data.origin)) {
        value = numberUint(data.origin as number)
      } else {
        value = numberUint(data.value as number)
      }
    } else {
      value = data.value
    }
  }
  if (data.unit) {
    if (['$', '＄', '¥', '￥'].includes(data.unit)){
      return `${data.unit}${value}`
    }
    if (['%'].includes(data.unit)){
      return `${value}${data.unit}`
    }
    return `${value} ${data.unit}`
  }
  return value
}


