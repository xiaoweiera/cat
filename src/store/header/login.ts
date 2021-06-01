/**
 * @file 导航 - 登录
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'

export const visible = ref<boolean>(false) // 弹窗状态(默认为登录状态)
export const visibleRegister = ref<boolean>(false) // 登录弹窗状态
export const loginType = ref<string>('tel') // 手机号 还是邮箱
export const showVisible = function(): void {
  visibleRegister.value = false
  visible.value = true
}

export const hideVisible = function(): void {
  visible.value = false
  visibleRegister.value = false
}

export const showRegisterVisible = function(): void {
  visibleRegister.value = true
  visible.value = true
}

export const hideRegisterVisible = function(): void {
  return hideVisible()
}
