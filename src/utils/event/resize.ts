/**
 * @file 监听页面滚动条
 * @author svon.me@gmail.com
 */

import * as event from './index'

type Callback = (e: Event) => void

let initAdd = false

const data = new Map<string, Callback>()

// 删除事件
const removeResize = function() {
  if (data.size === 0) {
    initAdd = false
    event.removeEvent(window as any, 'resize', onResize)
  }
}

const onResize = function(e: Event) {
  data.forEach(function(callback: Callback) {
    callback(e)
  })
  removeResize()
}

const init = function() {
  if (initAdd) {
    return initAdd
  }
  initAdd = true
  event.addEvent(window as any, 'resize', onResize)
}

export const unbind = function(namespace: string) {
  if (data.has(namespace)) {
    data.delete(namespace)
  }
}

export const bind = function(namespace: string, callback: Callback) {
  init()
  const value = function(e: Event) {
    return callback(e)
  }
  unbind(namespace)
  data.set(namespace, value)
}


