/**
 * @file 路由地址处理
 * @author svon.me@gmail.com
 */

import Url from 'url'
import { is } from 'ramda'
import { href } from '~/utils/lang'
import { forEach } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'

interface Query {
  [key: string]: number | string | undefined
}

interface To {
  path: string
  query: Query
}

interface Binding {
  modifiers: any
  value: string | To
  arg?: string
}

export const router = function(data: string | To): any {
  if (data && is(String, data)) {
    return href<string>(data as string)
  }
  if (data && is(Object, data)) {
    // @ts-ignore
    const url = Url.parse(data.path || window.location.href, true)
    url.search = ''
    // @ts-ignore
    const query: any = data.query ? data.query : {}
    forEach(function(value: string, key: string) {
      const name = `query.${key}`
      safeSet(url, name, `${value}`)
    }, query)
    const src = Url.format(url)
    // @ts-ignore
    if (data.path) {
      return href<string>(src)
    } else {
      const value = href<string>(src)
      const temp = Url.parse(value)
      return `?${temp.query}`
    }
  }
  if (data) {
    return data
  }
  return ''
}

export const install = function(vue: any) {
  // 添加指令
  vue.directive('router', (el: HTMLElement, binding: Binding) => {
    const value = router(binding.value)
    if (value) {
      el.setAttribute('href', value)
    }
  })
}
