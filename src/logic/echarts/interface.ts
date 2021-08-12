/**
 * @file 定义 echarts 中常用的数据格式
 */

export enum Direction {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export interface XAxisItem {
  value: string | number // 简化时间
  key?: string // 时间戳对应的格式化时间
  time?: number // 时间戳
  interval?: string // 颗粒度
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
  origin?: number | string // 原始数据 log 图时自动处理
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
  name: string // 名称
  unit: string // 单位
  id: string | number // id
  kline?: boolean // 是否为价格线
  type?: seriesType // echarts 展示图形类型 line / bar ...
  position?: Position
  show?: boolean
  value?: string
}

// 颜色集合
export const colors = [
  'rgba(43, 140, 255, 1)',
  'rgba(56, 214, 0, 1)',
  'rgba(0, 0, 0, 0.8)',
  // 'rgba(0, 209, 134)',
  'rgba(35, 159, 149, 1)',
  'rgba(0, 198, 225, 1)',
  'rgba(33, 85, 169, 1)',
  'rgba(34, 55, 238, 1)',
  'rgba(161, 31, 240, 1)',
  'rgba(244, 42, 151, 1)',
  'rgba(233, 45, 45, 1)'
]
