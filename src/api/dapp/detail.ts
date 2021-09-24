/**
 * @file Dapp 项目
 */

import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

interface Query {
  id: string | number
}

export const get = async function<T>(query: Query) {
  const result = request.get('/api/dapps/{version}/latest/dapp', {
    params: query
  })
  return await asyncCheck<T>(result)
}
