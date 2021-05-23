/**
 * @file growthpad 任务
 * @author svon.md@gmail.com
 */
import { toRaw } from 'vue'
import { useRoute } from 'vue-router'
import safeGet from '@fengqiaogang/safe-get'
import Store from '~/store/growthpad/store'
import { Project, getProjectType } from '~/api/growtask'

// 活动名称
const getActiveName = function() {
  const router = toRaw(useRoute())
  const params = router.params.value
  const value = safeGet<string>(params, 'activeName')
  return getProjectType(value)
}

// 缓存数据
const cache = new Map<string, Store>()
cache.set(Project.mdx, new Store(Project.mdx))

// 初始化
const task = function(): Store {
  const name = getActiveName()
  // 所有子组件根据路由名称来获取 stroe 数据
  if (Project.mdx === name && cache.has(Project.mdx)) {
    // @ts-ignore
    return cache.get(Project.mdx)
  }
  console.warn('create store = %s', name)
  return new Store(name)
}

export default task
