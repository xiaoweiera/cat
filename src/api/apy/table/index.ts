/**
 * @file 表格数据
 * @author svon.me@gmail.com
 */

import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

enum API {
  list = 'api/apy/ninja/mining_table',
  expand = '/api/apy/ninja/mining_table/drill_down'
}

export const getList = function<T>(query: any): Promise<T[]> {
  const params = Object.assign({
    apy_type: 'all',
    chain: 'all',
    page_size: 10,
    page: 1,
  }, query || {})
  const result = request.get(API.list, { params })
  return asyncCheck<T[]>(result)
}

export const getExpandList = function<T>(query: any): Promise<T[]> {
  const params = Object.assign({
    apy_type: 'all',
    chain: 'all',
  }, query || {})
  const result = request.get(API.expand, { params })
  return asyncCheck<T[]>(result)
}
