/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { omit } from 'ramda'
import { map } from '~/utils'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'
import { TabCategoryData } from '~/logic/apy2/token'
import { TokenItem } from '~/logic/apy2/interface'
import safeGet from '@fengqiaogang/safe-get'
import { EchartData } from '~/logic/echarts/interface'

const API ={
  tokenList: '/api/apy/ninja/tokens', // 币种列表
  detail: '/api/apy/ninja/token_detail', // 详情
  trend: '/api/apy/ninja/token/mining_best10' // 矿池趋势图(top10)
}

// 币种列表
export const list = async function(): Promise<TokenItem[]> {
  const list = await asyncCheck(request.get(API.tokenList, {
    params: { cache: true }
  }))
  return map(function(item: TokenItem) {
    const { id, name } = item
    if (id) {
      return item
    }
    return { ...item, id: name }
  }, list)
}
// 币种详情
export const detail = function(query: Object) {
  return asyncCheck(request.get(API.detail, {
    params: { cache: true, ...query }
  }))
}
// 矿池趋势图(top10)
export const trend = function(query: Object): Promise<EchartData> {
  const type = safeGet<string>(query, 'type')
  if (type ===  TabCategoryData.mining) {
    return asyncCheck(request.get(API.trend, {
      params: { cache: true, ...omit(['type'], query) }
    }))
  }
  return asyncCheck(request.get(API.trend, {
    params: { cache: true, ...omit(['type'], query) }
  }))
}
