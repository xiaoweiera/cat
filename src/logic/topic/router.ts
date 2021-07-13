/**
 * @file 路由处理
 */
import { useRoute } from 'vue-router'
import safeGet from '@fengqiaogang/safe-get'
import { toRaw, reactive, watch as vueWatch } from 'vue'
import { isFunction } from '~/utils/index'

interface Param {
  tagID: string
  topicID: string
}

type Callback = (param: Param) => void

const hooks = new Set<Callback>()

// 默认数据
export const param = reactive<Param>({
  tagID: 'item',
  topicID: '0'
})

// 绑定路由变化时事件
export const watch = function(callback: Callback) {
  const status = isFunction(callback)
  if (status) {
    hooks.add(callback)
  }
}

// 路由更新时出发
const updated = function(router: any) {
  const $router = toRaw(router)
  const query: Param = $router?.query?.value as any
  const tagId = safeGet(query, 'tagID') || 'item'
  const topId =  safeGet(query, 'topicID') || 0
  param.tagID = `${tagId}`
  param.topicID = `${topId}`

  hooks.forEach(function(callback: Callback) {
    callback(param)
  })
}


export const onReady = function() {
  const router = useRoute()
  vueWatch(router, (value: any) => updated(value), {
    deep: true
  })
  return updated(router)
}


