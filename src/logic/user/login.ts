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
  growthpad_invited_count: number
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
  growthpad_invited_count: 0, // 邀请的总人数
})

// 是否已登录
export const isLogin = ref<boolean>(false)

interface FormData {
  mobile: string
  password: string
  area_code: string
  checked: boolean
}
export const formdata = reactive<FormData>({
  mobile: '',
  password: '',
  area_code: '+86',
  checked: true,
})
// 注册
export const registerData = reactive({
  code: '', // 验证码
  password: '',
  mobile: '',
  area_code: '+86',
  invitation_code: '', // 邀请码
  platform: 'web',
  checked: false,
})
// 注册
export const registerMailData = reactive({
  code: '', // 验证码
  password: '',
  mail: '',
  invitation_code: '', // 邀请码
  platform: 'web',
  checked: false,
})
// 找回密码
export const forgetData = reactive({
  code: '', // 验证码
  password: '',
  new_password: '',
  area_code: '+86',
  mobile: '',
})
export const registerForm = ref<any>(null)
export const logoForm = ref<any>(null)
export const forgetForm = ref<any>(null)

const update = function(result: UserData): void {
  userData.area_code = result.area_code
  userData.avatar_url = result.avatar_url
  userData.expired_at = result.expired_at
  userData.follow_charts_count = result.follow_charts_count
  userData.follow_posts_count = result.follow_posts_count
  userData.follow_push_enabled = result.follow_push_enabled
  userData.follow_topics_count = result.follow_topics_count
  userData.invited_count = result.invited_count
  userData.is_vip = result.is_vip
  userData.mobile = result.mobile
  userData.my_invitation_code = result.my_invitation_code
  userData.nickname = result.nickname
  userData.recommend_push_enabled = result.recommend_push_enabled
  userData.registration_rank = result.registration_rank
  userData.username = result.username
  userData.growthpad_invited_count = result.growthpad_invited_count
  isLogin.value = true
}
export const logout = async function(): Promise<void> {
  try {
    // 退出
    await user.logout()
    jsCookie.remove('token')
    update({} as UserData)
    isLogin.value = false
    window.location.reload()
  } catch (e) {
    // todo
  }
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
// 找回密码
export const onFindPwd = async function(): Promise<any> {
  const form = toRaw(forgetForm).value
  try {
    if (form) {
      await form.validate()
    }
    const data = toRaw(forgetData)
    // 注册
    const result = await user.findPwd(data)
    return result?.data || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
// 注册
export const onRegisterSubmit = async function(): Promise<any> {
  const form = toRaw(registerForm).value
  console.log(toRaw(registerData))
  try {
    if (form) {
      await form.validate()
    }
    const data = toRaw(registerData)
    // 注册
    const result = await user.register(data)
    return result?.data || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}

// 登录
export const onSubmit = async function(): Promise<any> {
  const form = toRaw(logoForm).value
  try {
    if (form) {
      await form.validate()
    }
    // @ts-ignore
    const data = R.pick<user.LogoData>(
      ['mobile', 'password', 'area_code'],
      formdata,
    )
    const result = await user.logo(data)
    if (result?.data) {
      if (window.location.hostname !== 'kingdata.com') {
        jsCookie.set('token', result?.data?.token || '', {
          path: '/',
        })
      }
      jsCookie.set('token', result?.data?.token || '', {
        path: '/',
      })
      jsCookie.set('token', result?.data?.token || '', {
        path: '/',
        domain: 'ikingdata.com',
      })
      jsCookie.set('token', result?.data?.token || '', {
        path: '/',
        domain: 'kingdata.com',
      })
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
