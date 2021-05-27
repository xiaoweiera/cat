/**
 * @file 校验规则
 * @author svon.me@gmail.com
 */

import I18n from '~/utils/i18n/index'

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

export default { mobile, password, code }
