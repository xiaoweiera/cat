/**
 * @file 图表数据
 * @author svon.me@gmail.com
 */

import { map, pick } from 'ramda'
import * as api from '~/api/topic'
import safeGet from '@fengqiaogang/safe-get'
import { compact, toNumber } from '~/utils/index'

export const getChartList = async function(topId: string | number, page?: number, limit?: number) {
  const result = await api.getChartList(topId, page, limit)
  const getIDs = function(list: any[]) {
    return map((data: any) => {
      return safeGet<number>(data, 'chart.id')
    }, list)
  }

  return map(function(data: any) {
    // 判断是单图还是多图
    const multiple = !!safeGet<boolean>(data, 'is_multy_chart')
    const width = toNumber(safeGet<number>(data, 'width'))
    const height = toNumber(safeGet<number>(data, 'height'))
    // 获取该图表的数据（根据 id 获取数据详情）
    return Object.assign({ multiple }, {
      width: width > 50 ? width : 50,
      height: height > 0 ? height : 200,
      id: compact(getIDs(safeGet<any[]>(data, 'chart')))
    })
  }, safeGet<any[]>(result, 'list'))
}

const chartDetail = function(data: any) {
  const keys = [
    'id',
    'name', // 图表名称
    'desc', // 描述
    'last', // 最后更新时间（秒）
    'relation_unit', // 价格单位
    'value', // 涨浮数(不需要计算百分比)
    'change', // 涨浮（需要计算百分比）
  ]
  return pick(keys, data)
}

// 获取图表详情
export const getChartDetail = async function(multiple: boolean, value: string[] | number[]) {
  if (multiple) {
    // 多图详情
    const data = await api.getChartMultipleDetail(value as any)
    return chartDetail(data)
  } else {
    // 单图详情
    const result = await api.getChartDetail(value[0])
    return chartDetail(result)
  }
}

export const getChartTrends = async function(multiple: boolean, value: string[] | number[]) {
  const keys = [
    'default_chart', // 图形类型
    'interval', // 更新时间频率
  ]
  if (multiple) {

  } else {
    // 单图数据
    const result = await api.getChartTrends(value[0])
    const data = pick(keys, result)
    data['legend'] = safeGet<any[]>(result, 'ext')
    data['series'] = safeGet<any[]>(result, 'data')
    return data
  }
}
