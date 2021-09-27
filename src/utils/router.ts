/**
 * @file 封装 href 地址
 * @description 携带中英文标识
 * @author svon.me@gmail.com
 */

import { router } from '~/utils/directive/router'
import safeGet from '@fengqiaogang/safe-get'
import { useRoute } from 'vue-router'
import { toRaw } from 'vue'

let $router: any

// 获取 url 对象
export const getLocation = function() {
  if (!$router) {
    $router = useRoute()
  }
  if ($router) {
    const data = toRaw($router)
    return {
      // @ts-ignore
      path: data.path.value,
      // @ts-ignore
      query: data.query.value,
    }
  }
  return {
    path: window.location.pathname,
    query: {}
  }
}
// 获取参数
export const getParam = function<T>(key?: string, defaultValue?: T) {
  const data = getLocation()
  if (key) {
    return safeGet<T>(data, `query.${key}`) || defaultValue
  }
  return safeGet<Object>(data, 'query')
}

const r = parseInt(Math.random() * 1000 as any)

export const config = {
  topic: '/topic',
  growthpad: '/growthpad',
  apy: '/apy',
  apyToken: '/apy/token',
  liquidity:'/liquidity',
  bull: 'https://kingdata.com/bull', // 板块龙头
  nav: 'https://kingdata.com/nav', // 数据网站导航
  tih: 'https://kingdata.com/tih', // 历史的今天
  reports: `https://ikingdata.com/reports/?r=${r}`, // 研究报告
  news: 'https://kingdata.com/news/', // 7x24小时监控
  dapp: '/dapp',
  nft: '/nft',
}

export default router
