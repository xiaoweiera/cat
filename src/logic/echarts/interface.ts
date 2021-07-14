/**
 * @file 定义 echarts 中常用的数据格式
 */

export interface XAxisItem {
  time: number // 时间戳
  value: string | number // 简化时间
  key?: string // 时间戳对应的格式化时间
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

export enum seriesType {
  bar = 'bar',
  line = 'line'
}

export interface LegendItem extends AnyValue{
  position: string
  show?: boolean
  type: seriesType
  value: string
}
