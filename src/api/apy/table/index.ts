/**
 * @file 表格数据
 * @author svon.me@gmail.com
 */

import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'
import safeGet from '@fengqiaogang/safe-get'

const API ={
  mining: {
    list: 'api/apy/ninja/mining_table',
    expand: '/api/apy/ninja/mining_table/drill_down'
  },
  loan: {
    list: '/api/apy/ninja/lending_table',
    expand: '/api/apy/ninja/lending_table/drill_down'
  }
}

const transform = function(query: any) {
  const data: any = {}
  for(const key in query) {
    const value: any = query[key]
    if (value) {
      data[key] = value
    }
  }
  return data
}


export const getList = function<T>(query: any): Promise<T[]> {
  const { type } = query
  const params = {
    page: query.page ? query.page : 1,
    page_size: query.page ? query.page : 10,
    apy_type: query.apyType,
    group_id: query.groupId,
    chain: query.chain
  }
  const url = safeGet<string>(API, `${type}.list`)
  const result = request.get(url, {
    params: transform(params)
  })
  return asyncCheck<T[]>(result)
}

export const getExpandList = function<T>(query: any): Promise<T[]> {
  const { type } = query
  const params = {
    apy_type: query.apyType,
    group_id: query.groupId,
    chain: query.chain,
    symbol_alias: query.symbol_alias
  }
  const url = safeGet<string>(API, `${type}.expand`)
  const result = request.get(url, {
    params: transform(params)
  })
  return asyncCheck<T[]>(result)
}
