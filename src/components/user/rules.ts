/**
 * @file 校验规则
 * @author svon.me@gmail.com
 */

import I18n from '~/utils/i18n/index'
import { forgetData } from '~/logic/user/login'

// 手机号校验
export const mobile = [
  {
    required: true,
    message: I18n.common.placeholder.tel,
    trigger: ['blur', 'change'],
  },
  {
    trigger: 'blur',
    validator(rule: any, value: string, callback: (message?: string) => void) {
      const reg = /^[1][0-9]{10}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(I18n.common.message.telError)
      }
    },
  },
]
// 邮箱校验
export const email = [
  {
    required: true,
    message: I18n.common.placeholder.email,
    trigger: ['blur', 'change'],
  },
  {
    trigger: 'blur',
    validator(rule: any, value: string, callback: (message?: string) => void) {
      const reg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(I18n.common.message.mailError)
      }
    },
  },
]

// 密码校验
const password = [
  {
    required: true,
    message: I18n.common.placeholder.password,
    trigger: ['blur', 'change'],
  },
  {
    trigger: ['blur', 'change'],
    validator(rule: any, value: string, callback: (message?: string) => void) {
      if (value.length >= 6 && value.length <= 24) {
        callback()
      } else {
        callback(I18n.common.message.passwordError)
      }
    },
  },
]
// 密码校验
const new_password = [
  {
    required: true,
    message: I18n.common.placeholder.new_password,
    trigger: ['blur', 'change'],
  },
  {
    trigger: ['blur', 'change'],
    validator(rule: any, value: string, callback: (message?: string) => void) {
      console.log('rules')
      if (value.length < 6 || value.length > 24) {
        callback(I18n.common.message.passwordError)
      } else if (forgetData.password !== forgetData.new_password) {
        callback(I18n.common.message.new_password)
      } else {
        callback()
      }
    },
  },
]
// 协议
const checked = [
  {
    required: true,
    message: I18n.common.message.checked,
    trigger: ['blur', 'change'],
  },
  {
    trigger: ['blur', 'change'],
    validator(rule: any, value: string, callback: (message?: string) => void) {
      if (value) {
        callback()
      } else {
        callback(I18n.common.message.checked)
      }
    },
  },
]

// 密码校验
const code = [
  {
    required: true,
    message: I18n.common.placeholder.verification,
    trigger: ['blur', 'change'],
  },
  {
    trigger: ['blur', 'change'],
    validator(rule: any, value: string, callback: (message?: string) => void) {
      if (value.length === 6) {
        callback()
      } else {
        callback(I18n.common.message.verificationError)
      }
    },
  },
]

export default { mobile, password, new_password, checked, email, code }
