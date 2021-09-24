/**
 * @file 币种相关
 */

import { map } from '~/utils'
import * as API from '~/api/index'
import { asyncCheck } from '~/lib/response'
import router, { config } from '~/utils/router'
import { TokenItem } from './interface'
import { echartTransform } from '~/lib/common'

import { tokenList } from '~/store/apy2/state'
import safeGet from '@fengqiaogang/safe-get'

// 获取币种列表数据
export const getTokenList = async function(tokenType:string) {
  const list = await API.apy.token.list({symbol_type:tokenType})
  const array = map(function(data: TokenItem, index: number){
    const category = safeGet<string>(data, 'category[0]')
    return Object.assign({}, data, {
      href: router({
        path: tokenType==='token'?config.apyToken:config.apyLp,
        query: {
          symbol: data.name,
          category: category ? category : ''
        }
      }),
    })
  }, list)
  tokenList.value = array
  return array
}

export const getTokenDetail = function(name: string) {
  return API.apy.token.detail({ name })
}

// 初始化，加载币种数据
export const ready = function(tokenType:string) {
  return getTokenList(tokenType)
}

// 趋势图
export const getEchartData = async function(query: object) {
  const data = await API.apy.token.trend(query)
  return echartTransform(data)
}

// 获取矿池列表
export const getPoolsList = function(query: object) {
  return asyncCheck(API.apy.common.getPoolsList(query as any))
}
