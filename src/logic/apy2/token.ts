/**
 * @file 币种相关
 */

import { map } from '~/utils'
import * as API from '~/api/index'
import router, { config } from '~/utils/router'
import { TokenItem } from './interface'

import { tokenList } from '~/store/apy2/state'
import safeGet from '@fengqiaogang/safe-get'

export const TabCategoryData = {
  mining: 'mining',
  deposit: 'lend'
}

// 获取币种列表数据
export const getTokenList = async function() {
  const list = await API.apy.token.list()
  const array = map(function(data: TokenItem, index: number){
    const category = safeGet<string>(data, 'category[0]')
    return Object.assign({}, data, {
      href: router({
        path: config.apyToken,
        query: {
          id: data.id,
          category
        }
      }),
    })
  }, list)
  tokenList.value = array
  return array
}

export const getTokenDetail = function(id: string) {
  return API.apy.token.detail({ id })
}

// 初始化，加载币种数据
export const ready = function() {
  return getTokenList()
}

export const echartData = function(query: Object) {
  API.apy.token.trend(query).then(function(data) {
    console.log(data)
  })
  const legends = [
    {
      id: 'd-1',
      name: 'BTC', // 名称
      unit: '', // 单位
      kline: false, // 是否为价格线 (价格线会放到右侧显示)
      type: 'line',  // line / bar
      color: '', // 颜色 （为空取系统默认颜色）
    },
    { id: 'd-2', name: 'ETH', unit: '', type: 'line' },
    { id: 'd-3', name: 'HT', unit: '', type: 'line' },
    { id: 'd-4', name: 'BNB', unit: '', type: 'line' },
    { id: 'd-5', name: 'PI', unit: '', type: 'line' },
    { id: 'd-6', name: 'USDT', unit: '', type: 'line', kline: true }
  ]
  const xAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const randomSeriesValue = function() {
    const array: Array<any> = []
    for (let i = 0; i < xAxis.length; i++) {
      const value = parseInt(Math.random() * 30 as any)
      array.push({ value })
    }
    return array
  }

  const series = {
    'd-1': randomSeriesValue(),
    'd-2': randomSeriesValue(),
    'd-3': randomSeriesValue(),
    'd-4': randomSeriesValue(),
    'd-5': randomSeriesValue(),
    'd-6': randomSeriesValue(),
  }
  return {
    legends,
    xAxis,
    series
  }
}
