/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */


export * from '~/utils/use/state'
import { Position, SeriesItem, Unit } from './interface'
import { isNumber, numberUint } from '~/utils/index'


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
      default: () => 0
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
  let value = '-'
  if (data.origin && isNumber(data.origin)) {
    value = numberUint(data.origin as number)
  } else if (data.value && isNumber(data.value)) {
    value = numberUint(data.value as number)
  }
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


