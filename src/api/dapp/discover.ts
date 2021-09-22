/**
 * @file Dapp 项目
 */

import { isEmpty } from '~/utils'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

interface Query {
  chain: string
  group_id: string | number
  is_online?: boolean
  sort?: string
  page: number
  page_size: number
}

export const getList = async function<T>(query: Query) {
  // 默认为全部
  if (isEmpty(query.chain)) {
    query.chain = 'all'
  }
  const result = request.get('/api/dapps/{version}/latest/dapps', {
    params: Object.assign({
      page: 1,
      page_size: 10
    }, query)
  })
  try {
    return await asyncCheck<T>(result)
  } catch (e) {
    return {}
  }
}
