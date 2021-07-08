/**
 * @file 监听页面滚动条
 * @author svon.me@gmail.com
 */

import * as event from './index'

type Callback = (e: Event) => void

let initAdd = false

const data = new Map<string, Callback>()

const onScroll = function(e: Event) {
  data.forEach(function(callback: Callback) {
    callback(e)
  })
}

const init = function() {
  if (initAdd) {
    return initAdd
  }
  initAdd = true
  event.addEvent(document as any, 'scroll', onScroll)
}

export const viewHieght = function() {
  return document.documentElement.clientHeight
}

export const bodyHeight = function() {
  return document.body.clientHeight
}

export const scrollTop = function(): number {
  let scroll_top = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop
  }
  else if (document.body) {
    scroll_top = document.body.scrollTop
  }
  return scroll_top;
}

export const bind = function(namespace: string, callback: Callback) {
  init()
  const value = function(e: Event) {
    return callback(e)
  }
  data.set(namespace, value)
}

export const unbind = function(namespace: string) {
  if (data.has(namespace)) {
    data.delete(namespace)
    if (data.size < 1) {
      event.removeEvent(document as any, 'scroll', onScroll)
    }
  }
}
