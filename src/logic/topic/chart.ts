/**
 * @file 图表数据
 * @author svon.me@gmail.com
 */

import { pick, toLower } from 'ramda'
import * as api from '~/api/topic'
import safeGet from '@fengqiaogang/safe-get'
import { forEach, map, compact, toBoolean, toNumber } from '~/utils/index'
import DBList from '@fengqiaogang/dblist'
import { LegendItem, seriesType } from '~/logic/echarts/interface'

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
    const name = safeGet<string>(data, 'alias') || '' // 名称
    const unit = safeGet<string>(data, 'chart.field_unit') || '' // 单位
    const type = safeGet<seriesType>(data, 'default_chart') || ''
    // if (!type) {
    //   type = safeGet<seriesType>(data, 'chart.default_chart')
    // }
    legends.push({ id, name, type, unit })
  }
  return compact(legends)
}

export const getChartList = async function(topId: string | number, page: number = 1, limit: number = 10, search: string = '') {
  const query = {
    page,
    page_size: limit,
    query: search
  }
  const result = await api.getChartList(topId, query)
  const list = map(function(data: any) {
    // 判断是单图还是多图
    const multiple = toBoolean(safeGet<boolean>(data, 'is_multy_chart'))
    const apiCharts: APIChart[] = safeGet<APIChart[]>(data, 'chart')
    if (apiCharts && apiCharts.length > 0) {
      const legends = getLegends(apiCharts)
      const log = toBoolean(safeGet<boolean>(data, 'log'))
      // 获取该图表的数据（根据 id 获取数据详情）
      let width = toNumber(safeGet<number>(data, 'width'))
      let height = toNumber(safeGet<number>(data, 'height'))
      if (width === 0) {
        width = 50
      } else if (width > 0 && width < 50) {
        width = 33
      } else if (width >= 50 && width < 100) {
        width = 50
      } else {
        width = 100
      }
      if (height <= 200) {
        height = 200
      }
      // 我的图表需要特殊处理
      if (topId === 'my' || topId === '0' || topId === 0) {
        width = 50
        height = 200
      }
      return {
        multiple,
        width,
        height,
        log,
        stack: toBoolean(safeGet<boolean>(data, 'stacked')),
        name: safeGet<string>(data, 'name') || '', // 图表名称
        chartId: safeGet<string>(data, 'id'), // 图表ID
        followed: toBoolean(safeGet<boolean>(data, 'followed')), // 是否已关注图表
        seriesIds: map((item: LegendItem) => item.id, legends), // 数据ID集合
        legends, // 图例集合
      }
    }
  }, safeGet<any[]>(result, 'list'))
  return {
    list: compact(list),
    count: safeGet<number>(result, 'count')
  }
}

// 获取图表详情
export const getChartDetail = function(multiple: boolean, chartId: string | number, ids: string[] | number[], query?: any) {
  if (multiple) {
    // 多图详情
    return api.getChartMultipleDetail(chartId, query)
  }
  // 单图详情
  const [ value ] = ids
  return api.getChartDetail(value, query)
}


const getDetail = function(result: any) {
  const ext = safeGet<any>(result, 'ext[0]')
  const keys = [
    'title', // 名称
  ]
  const id = safeGet<string>(result, 'id')
  const interval = safeGet<string>(result, 'interval')
  const type = safeGet<string>(result, 'default_chart')
  return Object.assign({
    id,
    type,
    interval: toLower(interval || ''),
  }, pick(keys, ext || {}))
}

export const getChartTrends = async function(multiple: boolean, value: string[] | number[], query?: any) {
  if (multiple) {
    const result = await api.getChartMultipleTrends(value, query)
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
    const result = await api.getChartTrends(id, query)
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
