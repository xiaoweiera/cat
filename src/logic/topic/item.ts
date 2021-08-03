/**
 * @file 单个图表数据详情
 * @author svon.me@gmail.com
 */

import { trim } from 'ramda'
import { getChartDetail, getChartTrends } from './chart'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'
//@ts-ignore
import { convertInterval, map, toArray, toBoolean } from '~/utils'
import { reactive, toRaw } from 'vue'
import {
  getInterval,
  calcLegends,
  calcDates,
  calcSeries,
  // calcYAxis
} from '~/logic/echarts/series'
//@ts-ignore
import { Position, LegendItem, seriesType } from '~/logic/echarts/interface'

interface Legends extends LegendItem{
  kline?: boolean
}

interface ItemData {
  multiple: boolean
  log: boolean // 是否启用对数
  name: string // 图表名称
  chartId: number // 图表ID
  seriesIds: number[] // 数据ID集合
  legends: Legends[]
  width: number
  height: number
  desc: string
  stack: boolean
  followed: boolean
  last: number

  rateValue: number // 数量
  rateUnit: string // 数量单位
  rateChange: number // 涨浮（需要计算百分比）
  [key: string]: any
}

interface ChartDetail {
  default_chart?: string // 图形类型
  interval?: number // 更新时间频率
  relation_unit?: string // 价格单位
  value?: number // 涨浮数(不需要计算百分比)
  change?: number // 涨浮（需要计算百分比）
  width?: number
  height?: number
}
interface Result {
  detail?: ChartDetail
  legends: Array<any>
  xAxis: Array<any>
}

export const createItemChartResult = function() {
  return reactive<Result>({
    detail: void 0,
    legends: [],
    xAxis: [],
  })
}



const getCharts = function(result: any): any[] {
  const chart = safeGet<any[]>(result, 'chart')
  if (chart && chart.length > 0) {
    // 多图数据
    return map(function(item: any) {
      return Object.assign({}, item, {
        id: safeGet<number>(item, 'chart.id')
      })
    }, chart)
  }
  return []
}

// 获取图表详情
const getDetail = async function(data: ItemData, query?: any) {
  const result = await getChartDetail(data.multiple, data.chartId, data.seriesIds, query)
  const kline_chart = safeGet<number>(result, 'kline_chart')
  const charts = getCharts(result)
  // const type = safeGet<seriesType>(result, 'default_chart')
  // @ts-ignore
  const legends: Legends[] = map(function(item: LegendItem) {
    const temp = { ...item }
    if (!temp.type) {
      // 设置默认值
      // temp.type = type || seriesType.line
      temp.type = seriesType.line
    }
    return temp
  }, toArray(toRaw(data.legends)))

  // 如果是单线图
  if (data.multiple) {
    if(kline_chart && charts && charts.length > 0) {
      const db = new DBList(charts, 'id')
      const item = db.selectOne<any>({ id: kline_chart })
      if (item) {
        const name = safeGet<string>(item, 'chart.relation_title')
        if (name) {
          //@ts-ignore
          legends.push({
            kline: true, // 价格线
            name,
            id: safeGet<number>(item, 'chart.id'), // 默认取第一条数据
            unit: safeGet<string>(item, 'chart.relation_unit'),
            type: seriesType.line,
            position: Position.right
          })
        }
      }
    }
  } else {
    const name = safeGet<string>(result, 'relation_title') // 默认取第一条数据
    if (name) {
      const temp = {
        kline: true, // 价格线
        name,
        id: safeGet<number>(result, 'id'), // 默认取第一条数据
        unit: safeGet<string>(result, 'relation_unit'),
        type: seriesType.line,
        position: Position.right
      }
      //@ts-ignore
      legends.push(temp)
    }
  }
  data.legends = map(function(item: any) {
    item.kline = toBoolean(item.kline)
    return item
  }, legends)
  data.last = safeGet<number>(result, 'last')
  const stack = toBoolean(safeGet<boolean>(result, 'stacked'))
  if (stack) {
    data.stack = stack // 是否开启堆积图
  }

  const followed = toBoolean(safeGet<boolean>(result, 'followed'))
  if (followed) {
    data.followed = followed
  }

  const desc = safeGet<string>(result, 'desc') || ''
  data.desc = desc  // 图表描述

  // 涨浮数(不需要计算百分比)
  data.rateValue = safeGet<number>(result, 'value')
  data.rateUnit = trim(safeGet<string>(result, 'field_unit') || '')
  // 涨浮（需要计算百分比）
  data.rateChange = safeGet<number>(result, 'change')

  try {
    const { type } = convertInterval(safeGet<string>(result, 'interval'))
    data.interval = type
  } catch (e) {
    console.log(e)
  }
  return data
}

export const getItemData = async function(data: ItemData, query?: any): Promise<Result> {
  const [ detail, trends ] = await Promise.all([
    getDetail(data, query),
    getChartTrends(data.multiple, data.seriesIds, query)
  ])

  // 计算图例
  let legends = calcLegends(detail.legends, trends.detail)
  detail.legends = legends

  const interval = getInterval(trends.detail)

  // 处理日期数据( X 轴)
  const xAxis = calcDates(trends.series, interval)

  // 处理 series 数据
  legends = calcSeries(legends, xAxis, trends.series, interval)

  return {
    detail,
    legends,
    xAxis,
  }
}
