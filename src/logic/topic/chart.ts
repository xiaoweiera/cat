/**
 * @file 图表数据
 * @author svon.me@gmail.com
 */

import { pick, toLower } from 'ramda'
import * as api from '~/api/topic'
import safeGet from '@fengqiaogang/safe-get'
import { forEach ,map, compact, toBoolean } from '~/utils/index'
import DBList from '@fengqiaogang/dblist'

enum Position {
  left = 'left',
  right = 'right'
}

interface LegendItem {
  name: string
  unit: string
  id: string | number,
  type: string // echarts 展示图形类型 line / bar ...
  position?: Position,
}

interface APIChartDetail {
  field_unit: string
  relation_title: string
  relation_unit: string
}

interface APIChart {
  alias: string
  chart: APIChartDetail
}

const getLegends = function(list: APIChart[]): LegendItem[] {
  const legends: LegendItem[] = []
  for(let i = 0, len = list.length; i < len; i++) {
    const data: APIChart =  list[i]
    const id = safeGet<number>(data, 'chart.id')
    const name = safeGet<string>(data, 'alias') // 名称
    legends.push({
      id,
      name,
      unit: safeGet<string>(data, 'chart.field_unit'), // 单位
      type: safeGet<string>(data, 'chart.default_chart'),
    })
  }
  // if (list.length === 1 || rightYAxis) {
  //   // 价格线（约定为右Y轴）
  //   legends.push({
  //     id: rightYAxis || safeGet<number>(list, '[0].chart.id'), // 默认取第一条数据
  //     name: safeGet<string>(list, '[0].chart.relation_title'), // 默认取第一条数据
  //     unit: safeGet<string>(list, '[0].chart.relation_unit'),
  //     type: safeGet<string>(list, '[0].chart.default_chart'),
  //     position: Position.right
  //   })
  // }
  return compact(legends)
}

export const getChartList = async function(topId: string | number, page?: number, limit?: number) {
  const result = await api.getChartList(topId, page, limit)
  const list = map(function(data: any) {
    // 判断是单图还是多图
    const multiple = toBoolean(safeGet<boolean>(data, 'is_multy_chart'))
    // const stack = toBoolean(safeGet<boolean>(data, 'stacked'))

    const apiCharts: APIChart[] = safeGet<APIChart[]>(data, 'chart')
    const legends = getLegends(apiCharts)

    // 获取该图表的数据（根据 id 获取数据详情）
    return {
      multiple,
      name: safeGet<string>(data, 'name') || '', // 图表名称
      chartId: safeGet<string>(data, 'id'), // 图表ID
      seriesIds: map((item: LegendItem) => item.id, legends), // 数据ID集合
      legends, // 图例集合
    }
  }, safeGet<any[]>(result, 'list'))
  return {
    list,
    count: safeGet<number>(result, 'count')
  }
}
/*
详情中的数据可以从 trends 接口中获取
const chartDetail = function(data: any) {
  const keys = [
    'value', // 涨浮数(不需要计算百分比)
    'change', // 涨浮（需要计算百分比）
  ]
  return pick(keys, data)
}
*/

// 获取图表详情
export const getChartDetail = function(multiple: boolean, chartId: string | number, ids: string[] | number[]) {
  if (multiple) {
    // 多图详情
    return api.getChartMultipleDetail(chartId)
  }
  // 单图详情
  const [ value ] = ids
  return api.getChartDetail(value)
}


const getDetail = function(result: any) {
  const ext = safeGet<any>(result, 'ext[0]')
  const keys = [
    'value', // 涨浮数(不需要计算百分比)
    'change', // 涨浮（需要计算百分比）
    'title', // 名称
  ]
  const id = safeGet<string>(result, 'id')
  const interval = safeGet<string>(result, 'interval')
  return Object.assign({
    id,
    interval: toLower(interval || ''),
  }, pick(keys, ext || {}))
}

export const getChartTrends = async function(multiple: boolean, value: string[] | number[]) {
  if (multiple) {
    const result = await api.getChartMultipleTrends(value)
    const db = new DBList(result, 'id')
    const data: any = {}
    const detail: any = {}
    forEach(function(id: string | number) {
      const item = db.selectOne<any>({ id })
      data[id] = safeGet<any>(item, 'trend.data')
      detail[id] = getDetail(safeGet<any>(item, 'trend'))
    }, value)
    return {
      detail,
      series: data
    }
  } else {
    const id = value[0]
    // 单图数据
    const result = await api.getChartTrends(id)
    const detail = getDetail(result)
    return {
      detail: {
        [id]: detail
      },
      series: {
        [id]: safeGet<any[]>(result, 'data')
      }
    }
  }
}
