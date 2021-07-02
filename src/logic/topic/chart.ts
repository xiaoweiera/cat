/**
 * @file 图表数据
 * @author svon.me@gmail.com
 */

import { map } from 'ramda'
import * as api from '~/api/topic'
import safeGet from '@fengqiaogang/safe-get'
import { compact } from '~/utils/index'

const getIds = function(list: any[]): string[] {
  return map((data: any) => safeGet(data, 'chart.id'), list)
}

export const getChartList = async function(topId: string | number, page?: number, limit?: number) {
  const result = await api.getChartList(topId, page, limit)
  return map(function(data: any) {
    // 判断是单图还是多图
    const isMultyChart = safeGet<boolean>(data, 'is_multy_chart')
    // 获取该图表的数据（根据 id 获取数据详情）
    const ids = getIds(safeGet<any[]>(data, 'chart'))
    return {
      ids: compact(ids),
      isMultyChart: !!isMultyChart,
    }
  }, safeGet<any[]>(result, 'list'))
}

export const getChartDetail = async function(id: string | number | string[] | number[]) {
  const data = await api.getChartDetail(id)
  console.log(data)
}
