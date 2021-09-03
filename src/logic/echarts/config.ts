/**
 * @file 基础配置
 */
import { omit } from 'ramda'
import { layout } from './colors'
import { compact, map, forEach, toBoolean, numberUint, toNumber } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import safeGet from '@fengqiaogang/safe-get'
import { viewWidth } from '~/utils/event/scroll'
import * as logicLegend from '~/logic/echarts/legend'
import { calcYAxis } from '~/logic/echarts/series'
import { yAxisKline as makeYAxisOption } from '~/lib/chartOption'
import { Direction, LegendDirection, LegendItem, Position, seriesType } from '~/logic/echarts/interface'

export const getProps = function() {
  return {
    // 是否开启log效果
    log: {
      type: Boolean,
      default: () => false
    },
    // 是否开启堆积
    stack: {
      type: Boolean,
      default: () => false
    },
    // 图形位置
    direction: {
      type: String,
      default: () => Direction.horizontal,
      validator: (value: string) => {
        return value === Direction.horizontal || value === Direction.vertical;
      }
    },
    // 图列位置及是否显示
    legend: {
      type: [String, Boolean],
      default: () => LegendDirection.bottom,
      validator (value: string | boolean): boolean {
        let status = false
        switch(value) {
        case LegendDirection.top:
        case LegendDirection.left:
        case LegendDirection.right:
        case LegendDirection.bottom:
        case LegendDirection.custom:
          status = true
          break
        }
        if (value === false) {
          status = true
        }
        return status
      }
    },
    bgColor: {
      type: String,
      default: () => layout.bgColor
    },
    // 只定义 Class
    customClass: {
      type: String,
      default: () => 'h-full'
    },
  }
}

const getYAxisData = function(yAxisData: any[]) {
  return function(position: Position) {
    for(let i = 0; i < yAxisData.length; i++) {
      const item: any = yAxisData[i]
      if (item?.position === position) {
        return item
      }
    }
  }
}

// 获取图列数据
export const getLegend = function(list: LegendItem[], yAxisData: any[], props: any) {
  const getYAxisValue = getYAxisData(yAxisData)
  const data = map((item: LegendItem) => {
    if (item.show) {
      // @ts-ignore
      const code = logicLegend.source[item.type]
      const icon = `path://${code}`
      const { itemStyle } = item
      const opt = { icon, name: item.value}
      if (itemStyle) {
        Object.assign(opt, { itemStyle })
      }
      if (item.position === Position.right) {
        const yAxis = getYAxisValue(Position.right)
        const color = safeGet(yAxis, 'axisLabel.textStyle.color')
        safeSet(opt, 'itemStyle.color', color)
      }
      return opt
    }
  }, list)
  const option = { data: compact(data), itemWidth: 14, }
  if (props.legend === LegendDirection.top) {
    safeSet(option, 'top', 0)
  } else if (props.legend === LegendDirection.left) {
    safeSet(option, 'left', 0)
    safeSet(option, 'top', 'auto')
    safeSet(option, 'orient', 'vertical')
  } else if (props.legend === LegendDirection.right) {
    safeSet(option, 'right', 0)
    safeSet(option, 'top', 'auto')
    safeSet(option, 'orient', 'vertical')
  } else {
    // if (props.legend === LegendDirection.bottom)
    safeSet(option, 'bottom', 0)
  }
  return option
}

// chart Layout 容器配置
export const getGrid = function(legend: LegendDirection, dom: HTMLCanvasElement, list: LegendItem[]) {
  const row = logicLegend.clacLegendRows(list, dom)
  let height: number = 35
  if (row > 1) {
    height = row * 25
  }

  if (legend === LegendDirection.top) {
    return {
      top: height,
      left: 15,
      right: 15,
      bottom: 5,
      containLabel: true,
    }
  } else if (legend === LegendDirection.bottom) {
    return {
      top: 15,
      left: 15,
      right: 15,
      bottom: height,
      containLabel: true,
    }
  } else if (legend === LegendDirection.left) {
    return {
      top: 10,
      right: 20,
      bottom: 10,
      containLabel: true,
    }
  } else if (legend === LegendDirection.right) {
    return {
      top: 10,
      left: 10,
      bottom: 10,
      containLabel: true,
    }
  }
  // else if (props.legend === LegendDirection.custom) {
  //   return {
  //     top: 15,
  //     left: 15,
  //     right: 15,
  //     bottom: 15,
  //     containLabel: true,
  //   }
  // }
  return {
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    containLabel: true,
  }
}

export const getYAxis = function(yAxisData: any[], legends: LegendItem[], seriesList: any[], props: any) {
  const leftData: any[] = []
  const rightData: any[] = []
  forEach(function(item: any, index: number) {
    const value = safeGet<any[]>(seriesList, `[${index}].data`)
    if (item.position === Position.right) {
      rightData.push(value)
    } else {
      leftData.push(value)
    }
  }, legends)

  const getYAxisValue = getYAxisData(yAxisData)

  const app = function(data: any[], position: Position) {
    const value = calcYAxis(data, props.stack && position === Position.left, props.log)
    const yaxisData = getYAxisValue(position)
    const textStyleKey = 'axisLabel.textStyle'
    const textStyle = safeGet(yaxisData, textStyleKey)
    const [ option ] = makeYAxisOption(function(value: number) {
      const formatter = safeGet<any>(yaxisData, 'axisLabel.formatter')
      let res: string | number = 0
      if (props.log) {
        if (value === 0) {
          return 0
        }
        res = numberUint(Math.pow(10, value))
      } else {
        res = numberUint(value)
      }
      if (formatter) {
        return formatter(res, {
          number: value,
          log: props.log
        })
      }
      return res
    })
    if (textStyle) {
      const temp = safeGet(option, textStyleKey) || {}
      const value = Object.assign(temp, textStyle)
      safeSet(option, textStyleKey, value)
    }
    const opt = Object.assign({}, option, value, { position })
    return { ...opt, ...omit(['position', 'axisLabel'], yaxisData) }
  }
  const yaxis: any[] = []
  if (leftData.length > 0) {
    const opt = app(leftData, Position.left)
    yaxis.push(opt)
  }
  if (rightData.length > 0) {
    const opt = app(rightData, Position.right)
    yaxis.push(opt)
  }
  if (viewWidth() < 768) {
    return map(function(item: any) {
      safeSet(item, 'axisLabel.inside', true)
      return item
    }, yaxis)
  }
  return yaxis
}

// 设置 series Y轴参考位置
const correctYaxisIndex = function(legends: LegendItem[]): any {
  return function(index: number): any {
    const item = legends[index]
    let value = 0
    if (item?.position === Position.right) {
      value = 1
    }
    return Object.assign({}, item, { index: value })
  }
}

// 设置 series 配置数据
export const getSeries = function(legends: LegendItem[], result: any[], yAxisOption: any[], props: any) {
  const getLegendItem = correctYaxisIndex(legends)
  const seriesList = map((item: any, index: number) => {
    const data = getLegendItem(index)
    // 判断是否需要隐藏数据
    if (!toBoolean(data.show) || toBoolean(data.disabled)) {
      return void 0
    }
    const option: any = {
      ...item,
      name: data.value,
      type: data.type,
      connectNulls: true,
      yAxisIndex: data.index,
      label: {
        show: false,
      },
      symbol: 'none',
    }
    safeSet(option, 'itemStyle.color', data.itemStyle.color)


    if (data.type === seriesType.line) {
      // 线条平滑处理
      option.smooth = true;
      if (data.index === 1) {
        // 右侧价格线删除渐变色
        safeSet(option, 'areaStyle', null)
      }
      safeSet(option, 'itemStyle.borderWidth', 1)
    } else {
      // 取消阴影部分设置
      safeSet(option, 'areaStyle', null)
    }
    // 使用 Y 轴刻度为坐标参照时
    if (data.index === 1) {
      // 获取颜色
      const color = safeGet(yAxisOption, '[1].axisLabel.textStyle.color')
      safeSet(option, 'itemStyle.color', color)
    }
    if (data.type === seriesType.bar) {
      // 柱状图最大宽度
      option.barMaxWidth = 50
      const color = safeGet(option, 'itemStyle.color')
      if (color) {
        safeSet(option, 'itemStyle.color', function(d: any) {
          // 负数时强制设置为红色
          if (d.value < 0) {
            return layout.warn
          }
          return color
        })
      }
    }
    if (props.stack && data.position === Position.left) {
      // 开启堆积图
      option.stack = 'stack'
    }
    if (props.log) {
      option.data = map(function(item: any) {
        const value: number = item.value
        if (value || value === 0) {
          // @ts-ignore
          let num: number
          const origin = value
          if (value > 0) {
            num = Math.log10(value)
          } else {
            num = Math.abs(toNumber(value))
            num = Math.log10(num) * -1
          }
          return { ...item, value: num, origin }
        }
        return item
      }, option.data)
    }
    return option
  }, result)
  return compact(seriesList)
}
