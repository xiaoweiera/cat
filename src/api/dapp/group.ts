/**
 * @file 获取分组
 */

import { isEmpty } from '~/utils'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

interface Query {
  position: string
  chain?: string
}

export const getList = function<T>(query: Query) {
  // 默认为全部
  if (isEmpty(query.chain)) {
    query.chain = 'all'
  }
  const result = request.get('/api/dapps/{version}/groups', {
    params: query
  })
  return asyncCheck<T>(result)
}
