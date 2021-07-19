/**
 * @file 单个图表数据详情
 * @author svon.me@gmail.com
 */

import { getChartDetail, getChartTrends } from './chart'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'
import { map, toNumber, toArray, toBoolean } from '~/utils'
import { toRaw } from 'vue'
import {
  getInterval,
  calcLegends,
  calcDates,
  calcSeries,
  // calcYAxis
} from '~/logic/echarts/series'

export enum Position {
  left = 'left',
  right = 'right'
}

interface Legends {
  id: number
  name: string
  unit: string // 单位
  type: string
  position?: Position
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

const getDetail = async function(data: ItemData) {
  const result = await getChartDetail(data.multiple, data.chartId, data.seriesIds)
  const kline_chart = safeGet<number>(result, 'kline_chart')
  const charts = getCharts(result)
  const line = 'line'
  const type = safeGet<string>(result, 'default_chart')

  // @ts-ignore
  const legends: Legends[] = map(function(item: any) {
    return Object.assign({}, item, { type })
  }, toArray(toRaw(data.legends)))

  // 如果是单线图
  if (data.multiple) {
    if(kline_chart && charts && charts.length > 0) {
      const db = new DBList(charts, 'id')
      const item = db.selectOne<any>({ id: kline_chart })
      if (item) {
        legends.push({
          kline: true, // 价格线
          id: safeGet<number>(item, 'chart.id'), // 默认取第一条数据
          name: safeGet<string>(item, 'chart.relation_title'), // 默认取第一条数据
          unit: safeGet<string>(item, 'chart.relation_unit'),
          type: line,
          position: Position.right
        })
      }
    }
  } else {
    const temp = {
      kline: true, // 价格线
      id: safeGet<number>(result, 'id'), // 默认取第一条数据
      name: safeGet<string>(result, 'relation_title'), // 默认取第一条数据
      unit: safeGet<string>(result, 'relation_unit'),
      type: line,
      position: Position.right
    }
    legends.push(temp)
  }
  data.legends = map(function(item: any) {
    item.kline = toBoolean(item.kline)
    return item
  }, legends)

  data.last = safeGet<number>(result, 'last')

  const followed = toBoolean(safeGet<boolean>(result, 'followed'))
  if (followed) {
    data.followed = followed
  }

  const width = toNumber(safeGet<number>(result, 'width'))
  data.width = width > 50 ? 100 : 50

  const height = toNumber(safeGet<number>(result, 'height'))
  data.height = height > 200 ? height : 200

  // const stack = toBoolean(safeGet<boolean>(result, 'stacked'))
  // data.stack = stack // 是否开启堆积图

  const desc = safeGet<string>(result, 'desc') || ''

  data.desc = desc  // 图表描述

  // 涨浮数(不需要计算百分比)
  data.rateValue = safeGet<number>(result, 'value')
  data.rateUnit = safeGet<string>(result, 'field_unit')
  // 涨浮（需要计算百分比）
  data.rateChange = safeGet<number>(result, 'change')

  return data
}

export const getItemData = async function(data: ItemData) {
  const [ detail, trends ] = await Promise.all([
    getDetail(data),
    getChartTrends(data.multiple, data.seriesIds)
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
