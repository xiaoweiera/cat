/**
 * @file 表格数据
 * @author svon.me@gmail.com
 */

import { omit } from 'ramda'
import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'
import safeGet from '@fengqiaogang/safe-get'

const API ={
  // 挖矿
  mining: {
    list: 'api/apy/ninja/mining_table',
    expand: '/api/apy/ninja/mining_table/drill_down',

    detail: '/api/apy/ninja/mining_pool_detail',
    trends: '/api/apy/ninja/poll/mining_chart',
    top5: '/api/apy/ninja/poll/mining_top5',
    diff: '/api/apy/ninja/poll/mining_top5_chart'
  },
  // 借贷
  lend: {
    list: '/api/apy/ninja/lending_table',
    expand: '/api/apy/ninja/lending_table/drill_down',

    detail: '/api/apy/ninja/lend_pool_detail',
    trends : '/api/apy/ninja/poll/lending_chart',
    top5: '/api/apy/ninja/poll/lending_top5',
    diff: '/api/apy/ninja/poll/lending_top5_chart'
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


export const getList = function<T>(query: any) {
  const { type } = query
  const params = {
    page: query.page ? query.page : 1,
    page_size: query.page_size ? query.page_size : 10,
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

export const getExpandList = function<T>(query: any) {
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

// 弹窗详情
export const getDetail = function<T>(query: object) {
  const { type, id } = query as any
  const url = safeGet<string>(API, `${type}.detail`)
  const result = request.get(url, {
    params: { pool_id: id }
  })
  return asyncCheck<T>(result)
}

// APY 趋势图
export const trends = function<T>(query: object) {
  const { type, id } = query as any
  const url = safeGet<string>(API, `${type}.trends`)
  const result = request.get(url, {
    params: { pool_id: id, ...omit(['type', 'id'], query) }
  })
  return asyncCheck<T>(result)
}

// top5 数据
export const top5 = function<T>(query: object) {
  const { type } = query as any
  const url = safeGet<string>(API, `${type}.top5`)
  const result = request.get(url, {
    params: omit(['type'], query)
  })
  return asyncCheck<T>(result)
}

// top5 数据
export const diff = function<T>(query: object) {
  const { type } = query as any
  const url = safeGet<string>(API, `${type}.diff`)
  console.log(url, query)
  const result = request.get(url, {
    params: omit(['type'], query)
  })
  return asyncCheck<T>(result)
}
