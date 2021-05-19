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
export const password = [
  { required: true, message: '请输入密码！', trigger: ['blur', 'change'] },
]
