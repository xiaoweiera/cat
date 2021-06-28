/**
 * @file 判断登录
 * @author svon.me@gmail.com
 */

import { isLogin } from '~/logic/user/login'
import { showVisible } from '~/store/header/login'
import * as event from '~/utils/event/index'

const login = function(e: Event) {
  // 已登录状态
  if (isLogin.value) {
    return true
  }
  // 未登录时
  e.stopPropagation()
  e.preventDefault()
  // 显示登录框
  showVisible()
}

const install = function(vue: any) {
  const eventName = 'click'
  // 添加指令
  vue.directive('login', {
    created(el: HTMLElement, _: any, vNode: any) {
      event.bind(vNode, eventName, login, true)
    },
    beforeUnmount(el: HTMLElement, _: any, vNode: any) {
      event.unbind(vNode, eventName, true)
    },
  })
}

export default install
