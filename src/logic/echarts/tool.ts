/**
 * @file echarts 公共方法
 * @author svon.me@gmail.com
 */

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


