/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { omit } from 'ramda'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'
import { TabCategoryData } from '~/logic/apy2/interface'
import { TokenItem } from '~/logic/apy2/interface'
import safeGet from '@fengqiaogang/safe-get'
import { EchartData } from '~/logic/echarts/interface'

const API ={
  tokenList: '/api/apy/ninja/tokens', // 币种列表
  detail: '/api/apy/ninja/token_detail', // 详情
  trend: {
    [TabCategoryData.mining]: '/api/apy/ninja/token/mining_best10', // 挖矿趋势图(top10)
    [TabCategoryData.deposit]: '/api/apy/ninja/token/lending_best10' // 借贷趋势图(top10)
  }
}

// 币种列表
export const list = function() {
  const result = request.get(API.tokenList, {
    // params: { cache: true }
  })
  return asyncCheck<TokenItem[]>(result)
}
// 币种详情
export const detail = function(query: Object) {
  return asyncCheck(request.get(API.detail, {
    params: { ...query }
  }))
}
// 矿池趋势图(top10)
export const trend = function(query: Object) {
  const type = safeGet<string>(query, 'type')
  if (type === TabCategoryData.mining) {
    return asyncCheck<EchartData>(request.get(API.trend[TabCategoryData.mining], {
      params: { ...omit(['type'], query) }
    }))
  }
  if (type === TabCategoryData.deposit) {
    return asyncCheck<EchartData>(request.get(API.trend[TabCategoryData.deposit], {
      params: { ...omit(['type'], query) }
    }))
  }
}
