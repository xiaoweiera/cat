/**
 * @file 定义 echarts 中常用的数据格式
 */

export interface XAxisItem {
  time: number // 时间戳
  value: string | number // 简化时间
  key?: string // 时间戳对应的格式化时间
}

export enum LegendDirection {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom'
}

export enum Unit {
  a = '$',
  a1 = '＄',
  a2 = '¥',
  a3 = '￥',
  b = '枚',
  c = 'wei',
  d = '个',
  e = '人'
}

interface AnyValue {
  [key: string]: any
}

export interface SeriesItem extends XAxisItem, AnyValue {
  klValue?: number | string
  unit?: Unit
}

export interface SeriesMap {
  [key: string]: SeriesItem[]
}

export enum triggerType {
  item = 'item',
  axis = 'axis',
  none = 'none',
}

export enum seriesType {
  bar = 'bar',
  line = 'line',
  log = 'log'
}

export enum Position {
  left = 'left',
  right = 'right'
}

export interface LegendItem {
  name: string
  unit: string
  id: string | number
  type?: seriesType // echarts 展示图形类型 line / bar ...
  position?: Position
  show?: boolean
  value?: string
}

// 颜色集合
export const colors = [
  'rgba(43, 140, 255)',
  'rgba(56, 214, 0)',
  'rgb(0, 0, 0, 0.8)',
  // 'rgba(0, 209, 134)',
  'rgba(35, 159, 149)',
  'rgba(0, 198, 225)',
  'rgba(33, 85, 169)',
  'rgba(34, 55, 238)',
  'rgba(161, 31, 240)',
  'rgba(244, 42, 151)',
  'rgba(233, 45, 45)'
]
