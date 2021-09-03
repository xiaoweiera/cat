/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */


export * from '~/utils/use/state'
import { Position, SeriesItem, Unit } from './interface'
import { isNumber, isString, numberUint } from '~/utils/index'


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
    // 判断是否是金额
    switch (data.unit) {
    case Unit.a:
    case Unit.a1:
    case Unit.a2:
    case Unit.a3:
      return `${data.unit}${value}`
    }
    return `${value}${data.unit}`
  }
  return value
}


