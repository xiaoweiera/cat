/**
 * @file growthpad 任务
 * @author svon.md@gmail.com
 */

import UrlPattern from 'url-pattern'
import Store from '~/store/growthpad/store'
import safeGet from '@fengqiaogang/safe-get'
import { ProjectKey, getProjectType } from '~/logic/growthpad/config'

// 用户缓存 url 解析结果
const url = new Map<string, ProjectKey | undefined>()

// 活动名称
const getProjecctId = function(): ProjectKey | undefined {
  const pathname = window.location.pathname
  if (pathname) {
    // 判断是否有对应的数据
    if (!url.has(pathname)) {
      // 解析 url
      const pattern = new UrlPattern('/growthpad/:project')
      const project = safeGet<string>(pattern.match(pathname), 'project')
      if (project) {
        // 缓存 url 数据
        url.set(pathname, getProjectType(project))
      }
    }
  }
  return url.get(pathname)
}

// 缓存数据
const cache = new Map<string | ProjectKey, Store>()
// 初始化所有项目对象
Object.values(ProjectKey).forEach((key: ProjectKey) => {
  cache.set(key, new Store(key))
})


// 根据当前项目 id 获取项目对象
const task = function(): Store {
  const key = getProjecctId()
  if (key) {
    const value = cache.get(key)
    if (value) {
      return value
    }
  }
  console.warn('create store = %s', key)
  return new Store(key as string)
}

export default task
