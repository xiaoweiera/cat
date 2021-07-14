/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */


export * from '~/utils/use/state'
import { SeriesItem, Unit } from './interface'
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

export const valueFormatter = function(data: SeriesItem): string {
  let value = '-'
  if (isNumber(data.value)) {
    value = numberUint(data.value as number)
  }
  // 判断是否是 $
  if (data.unit === Unit.a) {
    return `${data.unit}${value}`
  }
  return `${value}${data.unit}`
}


