/**
 * @file 判断登录
 * @author svon.me@gmail.com
 */

import { isLogin } from '~/logic/user/login'
import { showVisible } from '~/store/header/login'

const app = function(e: Event) {
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

// @ts-ignore
const install = function(vue): void {
  // 添加指令
  vue.directive('login', {
    created(el: HTMLElement) {
      el.addEventListener('click', app, true)
    },
    beforeUnmount(el: HTMLElement) {
      el.removeEventListener('click', app)
    },
  })
}

export default { install }
