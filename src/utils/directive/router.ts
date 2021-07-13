/**
 * @file 路由地址处理
 * @author svon.me@gmail.com
 */

import { is } from 'ramda'
import { href } from '~/utils/lang'

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
    const to = href<To>(data as any)
    const query: string[] = []
    Object.keys(to.query).forEach((key: string) => {
      query.push(`${key}=${to.query[key]}`)
    })
    const path = `${to.path}?${query.join('&')}`
    return path
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
