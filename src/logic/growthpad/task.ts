/**
 * @file growthpad 任务
 * @author svon.md@gmail.com
 */
import { toRaw } from 'vue'
import { useRoute } from 'vue-router'
import safeGet from '@fengqiaogang/safe-get'
import Store from '~/store/growthpad/store'

// 活动名称
const getActiveName = function() {
  const router = toRaw(useRoute())
  const params = router.params.value
  return safeGet<string>(params, 'activeName')
}

const cache = new Map<string, Store>()

// 初始化
const task = function() {
  const name = getActiveName()
  if (cache.has(name)) {
    return cache.get(name)
  }
  const store = new Store(name)
  cache.set(name, store)
  return store
}

export default task
