/**
 * @file 定义 echarts 中常用的数据格式
 */

export { colors } from './colors'

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
  bottom = 'bottom',
  custom = 'custom', // 自定义图例
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

export const iconFontName = {
  [seriesType.bar]: 'icon-Column',
  [seriesType.line]: 'icon-Broken_line'
}

export enum Position {
  left = 'left',
  right = 'right'
}

export interface FormatterTemplate {
  icon: string
  name: string
  value: string
}

export interface FormatterParams {
  // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
  value: number
  // 数据图形的颜色
  color: string
  // 传入的原始数据项
  data: SeriesItem
  // 数据展示类型
  seriesType: seriesType
  // x 轴几点名称
  axisValue: string
  // 数据名称（图例名称）
  seriesName: string
  // x 轴名称
  name: string;
}

export interface LegendItem {
  name: string // 名称
  unit?: string // 单位
  id: string | number // id
  kline?: boolean // 是否为价格线
  type?: seriesType // echarts 展示图形类型 line / bar ...
  position?: Position
  show?: boolean
  value?: string
  index?: number
  color?: string
  [key: string]: any
}

export interface YAxis {
  left: string | undefined,
  right: string | undefined
}

// 图表数据结构
export class EchartData {
  key?: string;
  legends: Array<LegendItem> = [];
  yAxis: YAxis = { left: '', right: '' }; // Y 轴刻度单位
  xAxis: Array<XAxisItem | number | string> = [];
  series: SeriesMap = {}
}



