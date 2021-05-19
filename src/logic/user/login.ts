/**
 * @file 用户登录逻辑
 * @author svon.me@gmail.com
 */

import * as R from 'ramda'
import { reactive, ref, toRaw } from 'vue'
import * as user from '~/api/user'

interface FormData {
  mobile: string
  password: string
  checked: boolean
}

export const formdata = reactive<FormData>({
  mobile: '',
  password: '',
  checked: false,
})

export const logoForm = ref<any>(null)

// @ts-ignore
export const onSubmit = async function(): Promise<any> {
  const form = toRaw(logoForm).value
  try {
    if (form) {
      await form.validate()
    }
    // @ts-ignore
    const data = R.pick<user.LogoData>(['mobile', 'password'], formdata)
    const result = await user.logo(data)
    const number = parseInt(result?.code as any, 10)
    if (number === 0) {
      return true
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      message: result?.message || '账号或者密码输入有误！',
    })
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
