/**
 * @file 导航 - 登录
 * @author svon.me@gmail.com
 */

import { reactive, ref } from 'vue'

export const visible = ref<boolean>(false) // 弹窗状态(默认为登录状态)
export const visibleRegister = ref<boolean>(false) // 登录弹窗状态
export const loginType = ref<string>('email') // 手机号 还是邮箱
export const loginTypeStatus = reactive({ type: 'email', name: 'login' })
export const headerTag = reactive({ name: '', index: -1 })
export const goDialogLogin = function(): void {
  loginTypeStatus.name = loginTypeStatus.name === 'login' ? 'register' : 'login'
}
export const goDialogforGet = function(): void {
  loginTypeStatus.name = 'forget'
}
export const goLogin = function(): void {
  loginTypeStatus.type = 'email'
  loginTypeStatus.name = 'login'
  visible.value = true
}
export const goRegister = function(): void {
  loginTypeStatus.type = 'email'
  loginTypeStatus.name = 'register'
  visible.value = true
}

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
