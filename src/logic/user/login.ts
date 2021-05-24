/**
 * @file 用户登录逻辑
 * @author svon.me@gmail.com
 */

import * as R from 'ramda'
import { reactive, ref, toRaw } from 'vue'
import jsCookie from 'js-cookie'
import * as user from '~/api/user'

interface UserData {
  area_code: number
  avatar_url: string
  expired_at: number
  follow_charts_count: number
  follow_posts_count: number
  follow_push_enabled: boolean
  follow_topics_count: number
  invited_count: number
  is_vip: boolean
  mobile: string | number
  my_invitation_code: string
  nickname: string
  recommend_push_enabled: boolean
  registration_rank: any
  username: string
  token?: string
}

export const userData = reactive<UserData>({
  area_code: 86,
  avatar_url: '',
  expired_at: 0,
  follow_charts_count: 0,
  follow_posts_count: 0,
  follow_push_enabled: false,
  follow_topics_count: 0,
  invited_count: 0,
  is_vip: false,
  mobile: '',
  my_invitation_code: '',
  nickname: '',
  recommend_push_enabled: false,
  registration_rank: null,
  username: '',
})

// 是否已登录
export const isLogin = ref<boolean>(false)

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

const update = function(result: UserData): void {
  // @ts-ignore
  // eslint-disable-next-line no-restricted-syntax
  for (const key in result) {
    // @ts-ignore
    userData[key] = result[key]
  }
  isLogin.value = true
  jsCookie.set('token', result.token || '', {})
}

// 更新用户信息
export const syncUser = async function(): Promise<void> {
  console.log('sync user')
  try {
    // 临时使用一个接口来判断用户是否已登录
    const result = await user.getInfo()
    update(result as UserData)
    return
  } catch (e) {
    // todo
  }
  isLogin.value = false
}
// 登录
export const onSubmit = async function(): Promise<any> {
  const form = toRaw(logoForm).value
  try {
    if (form) {
      await form.validate()
    }
    // @ts-ignore
    const data = R.pick<user.LogoData>(['mobile', 'password'], formdata)
    const result = await user.logo(data)
    console.log(JSON.stringify(result))
    if (result?.data) {
      update(result.data as UserData)
    }
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
