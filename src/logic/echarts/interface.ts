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
  'rgba(42, 42, 42, 1)',
  'rgba(158, 255, 0, 1)',
  'rgba(0, 87, 255, 1)',
  'rgba(43, 141, 255, 1)',
  'rgba(97, 102, 126, 1)',
  'rgba(253, 193, 64, 1)',
  'rgba(162, 176, 59, 1)',
  'rgba(115, 84, 64, 1)',
  'rgba(217, 212, 182, 1)',
  'rgba(49, 138, 135, 1)',
  'rgba(220, 149, 85, 1)',
  'rgba(235, 137, 160, 1)',
  'rgba(81, 197, 151, 1)',
  'rgba(172, 171, 239, 1)',
  'rgba(2, 72, 186, 1)',
  'rgba(52, 155, 204, 1)',
  'rgba(204, 90, 186, 1)',
  'rgba(49, 85, 59, 1)',
  'rgba(140, 138, 80, 1)',
  'rgba(146, 215, 227,1)',
]
