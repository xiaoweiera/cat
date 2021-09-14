/**
 * @file 封装 href 地址
 * @description 携带中英文标识
 * @author svon.me@gmail.com
 */

import { router } from '~/utils/directive/router'
import safeGet from '@fengqiaogang/safe-get'
import { useRoute } from 'vue-router'
import { ref, toRaw, watch } from 'vue'

const location = ref<any>(null)

export const watchRoute = function(callback: () => void) {
  if (callback && location) {
    watch(location, callback)
    return true
  }
  return false
}

// 获取 url 对象
export const getLocation = function() {
  const value = useRoute()
  if (value) {
    location.value = value
    const $router = toRaw(location.value)
    console.log('location', $router, useRoute())
    if ($router) {
      return {
        // @ts-ignore
        path: $router.path.value,
        // @ts-ignore
        query: $router.query.value,
      }
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

export const config = {
  topic: '/topic',
  growthpad: '/growthpad',
  apy: '/apy',
  apyToken: '/apy/token',
  liquidity:'/liquidity',
  bull: '/bull',
  nav: '/nav',
  tih: '/tih',
  reports: 'https://ikingdata.com/reports/', // 研究报告
  news: 'https://ikingdata.com/news/' // 7x24小时监控
}

export default router
