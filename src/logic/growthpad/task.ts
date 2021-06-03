/**
 * @file growthpad 任务
 * @author svon.md@gmail.com
 */
// import { toRaw } from 'vue'
import UrlPattern from 'url-pattern'
// import { useRoute } from 'vue-router'
import safeGet from '@fengqiaogang/safe-get'
import Store from '~/store/growthpad/store'
import { Project, getProjectType } from '~/api/growtask'

// 活动名称
const getActiveName = function() {
  // const router = toRaw(useRoute())
  // @ts-ignore
  const pathname = window.location.pathname
  if (pathname) {
    // 解析 url
    const pattern = new UrlPattern('/growthpad/:activeName')
    const activeName
      = safeGet<string>(pattern.match(pathname), 'activeName') || ''
    const name = activeName.toLocaleLowerCase()
    return getProjectType(name)
  }
  return ''
}

// 缓存数据
const cache = new Map<string, Store>()
cache.set(Project.mdx, new Store(Project.mdx))
cache.set(Project.channels, new Store(Project.channels))
cache.set(Project.coinwind, new Store(Project.coinwind))
cache.set(Project.growth, new Store(Project.growth))

// 初始化
const task = function(): Store {
  const name = getActiveName()
  // 所有子组件根据路由名称来获取 stroe 数据
  if (Project.mdx === name && cache.has(Project.mdx)) {
    // @ts-ignore
    return cache.get(Project.mdx)
  }
  if (Project.channels === name && cache.has(Project.channels)) {
    // @ts-ignore
    return cache.get(Project.channels)
  }
  if (Project.coinwind === name && cache.has(Project.coinwind)) {
    // @ts-ignore
    return cache.get(Project.coinwind)
  }
  if (Project.growth === name && cache.has(Project.growth)) {
    // @ts-ignore
    return cache.get(Project.growth)
  }
  console.warn('create store = %s', name)
  return new Store(name)
}

export default task
