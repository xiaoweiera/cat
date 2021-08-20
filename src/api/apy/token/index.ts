/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { map } from '~/utils'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

import { TokenItem } from '~/logic/apy2/interface'

const API ={
  tokenList: '/api/apy/ninja/tokens',
}

// 币种列表
export const list = async function(): Promise<TokenItem[]> {
  const list = await asyncCheck(request.get(API.tokenList))
  return map(function(item: TokenItem) {
    const { id, name } = item
    if (id) {
      return item
    }
    return { ...item, id: name }
  }, list)
}
