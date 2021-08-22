/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { map } from '~/utils'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

import { TokenItem } from '~/logic/apy2/interface'

const API ={
  tokenList: '/api/apy/ninja/tokens', // 币种列表
  detail: '/api/apy/ninja/token_detail' // 详情
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
export const detail = async function(query: Object) {
  try {
    return await asyncCheck(request.get(API.detail, {
      params: { cache: true, ...query }
    }))
  } catch (e) {
    return {
      'name': 'BTC',
      'icon': 'http://xxxx.jpg',
      'category': ['mining', 'lend'],
      'ticker': {
        'prince': 47500,
        'change_percent': 30.5
      }
    }
  }
}
