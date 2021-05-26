/**
 * @file 校验规则
 * @author svon.me@gmail.com
 */

// 手机号校验
export const mobile = [
  { required: true, message: '请输入手机号！', trigger: ['blur', 'change'] },
  {
    trigger: 'blur',
    validator(rule: any, value: string, callback: (message?: string) => void) {
      const reg = /^[1][0-9]{10}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback('手机号格式不正确！')
      }
    },
  },
]

// 密码校验
const password = [
  { required: true, message: '请输入密码！', trigger: ['blur', 'change'] },
  {
    trigger: ['blur', 'change'],
    validator(rule: any, value: string, callback: (message?: string) => void) {
      if (value.length >= 6 && value.length <= 24) {
        callback()
      } else {
        callback('请输入6至24位的密码！')
      }
    },
  },
]

// 密码校验
const code = [
  { required: true, message: '请输入验证码！', trigger: ['blur', 'change'] },
  {
    trigger: ['blur', 'change'],
    validator(rule: any, value: string, callback: (message?: string) => void) {
      if (value.length === 6) {
        callback()
      } else {
        callback('请输入6位验证码！')
      }
    },
  },
]

export default { mobile, password, code }
