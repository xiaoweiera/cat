/**
 * @file 用户登录逻辑
 * @author svon.me@gmail.com
 */

import * as R from 'ramda'
import { reactive, ref, toRaw } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
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
interface FormMailData {
  email: string
  password: string
  checked: boolean
}
export const formMailData = reactive<FormMailData>({
  email: '',
  password: '',
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
  email: '',
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
// 邮箱找回密码
export const forgetMailData = reactive({
  code: '', // 验证码
  password: '',
  new_password: '',
  area_code: '+86',
  email: '',
})

export const registerForm = ref<any>(null)
export const registerMailForm = ref<any>(null)
export const logoForm = ref<any>(null)
export const logoMailForm = ref<any>(null)

export const forgetForm = ref<any>(null)
export const forgetMailForm = ref<any>(null)
// 更新用户信息
const update = function(result: UserData): void {
  userData.area_code = safeGet<number>(result, 'area_code')
  userData.avatar_url = safeGet<string>(result, 'avatar_url')
  userData.expired_at = safeGet<number>(result, 'expired_at')
  userData.follow_charts_count = safeGet<number>(result, 'follow_charts_count')
  userData.follow_posts_count = safeGet<number>(result, 'follow_posts_count')
  userData.follow_push_enabled = safeGet<boolean>(result, 'follow_push_enabled')
  userData.follow_topics_count = safeGet<number>(result, 'follow_topics_count')
  userData.invited_count = safeGet<number>(result, 'invited_count')
  userData.is_vip = !!safeGet<boolean>(result, 'is_vip')
  userData.mobile = safeGet<string>(result, 'mobile')
  userData.my_invitation_code = safeGet<string>(result, 'my_invitation_code')
  userData.nickname = safeGet<string>(result, 'nickname')
  userData.recommend_push_enabled = safeGet(result, 'recommend_push_enabled')
  userData.registration_rank = safeGet(result, 'registration_rank')
  userData.username = safeGet<string>(result, 'username')
  userData.growthpad_invited_count = safeGet<number>(
    result,
    'growthpad_invited_count',
  )
  isLogin.value = !!safeGet<boolean>(result, 'nickname')
}

export const logout = async function(): Promise<void> {
  try {
    // 退出
    await user.logout()
    update({} as UserData)
    isLogin.value = false
    // 刷新页面
    window.location.reload()
  } catch (e) {
    // todo
  }
}
// 更新用户信息
export const syncUser = async function(): Promise<void> {
  try {
    // 临时使用一个接口来判断用户是否已登录
    const result = await user.getInfo()
    update(result as UserData)
    return
  } catch (e) {
    console.log(e)
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
// 邮箱找回密码
export const onFindPwdMail = async function(): Promise<any> {
  const form = toRaw(forgetMailForm).value
  try {
    if (form) {
      await form.validate()
    }
    const data = toRaw(forgetMailData)
    // 注册
    const result = await user.findPwdMail(data)
    return result?.data || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}

// 注册
export const onRegisterSubmit = async function(): Promise<any> {
  const form = toRaw(registerForm).value
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
// 邮箱注册
export const onRegisterMailSubmit = async function(): Promise<any> {
  const form = toRaw(registerMailForm).value
  try {
    if (form) {
      await form.validate()
    }
    const data = toRaw(registerMailData)
    // 注册
    const result = await user.registerMail(data)
    return result?.data || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
const emailField = function(formData: any) {
  const form = toRaw(formData).value
  return new Promise((resolve, reject) => {
    form.validateField(['email'], (error: any) => {
      if (error) {
        reject(error)
      } else {
        // @ts-ignore
        resolve()
      }
    })
  })
}
const phoneField = function(formData: any) {
  const form = toRaw(formData).value
  return new Promise((resolve, reject) => {
    form.validateField(['mobile'], (error: any) => {
      if (error) {
        reject(error)
      } else {
        // @ts-ignore
        resolve()
      }
    })
  })
}
// 忘记密码邮箱验证码
export const onMailCaptchaForget = async function(type: string): Promise<any> {
  const form = toRaw(forgetMailForm).value
  try {
    if (form) {
      await emailField(forgetMailForm)
    }
    const data = toRaw(forgetMailData)
    const result = await user.getMailCaptcha(data.email, type)
    // @ts-ignore
    return result || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
// 注册邮箱验证码
export const onMailCaptchaResgister = async function(
  type: string,
): Promise<any> {
  const form = toRaw(registerMailForm).value
  try {
    if (form) {
      await emailField(registerMailForm)
    }
    const data = toRaw(registerMailData)
    // 注册
    const result = await user.getMailCaptcha(data.email, type)
    // @ts-ignore
    return result || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
// 注册手机号验证码
export const onCaptchaResgister = async function(): Promise<any> {
  const form = toRaw(registerForm).value
  try {
    if (form) {
      await phoneField(registerForm)
    }
    const data = toRaw(registerData)
    // 注册
    const result = await user.getCaptcha({
      area_code: data.area_code,
      mobile: data.mobile,
    })
    // @ts-ignore
    return result || {}
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
// 忘记密码手机号验证码
export const onCaptchaForget = async function(): Promise<any> {
  const form = toRaw(forgetForm).value
  try {
    if (form) {
      await phoneField(forgetForm)
    }
    const data = toRaw(forgetData)
    // 注册
    const result = await user.getForgetCaptcha({
      area_code: data.area_code,
      mobile: data.mobile,
    })
    // @ts-ignore
    return result || {}
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
    const param = ['mobile', 'password', 'area_code']
    // @ts-ignore
    const data = R.pick<user.LogoData>(param, formdata)
    const result = await user.logo(data)
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
// 邮箱登录
export const onSubmitMail = async function(): Promise<any> {
  const form = toRaw(logoMailForm).value
  try {
    if (form) {
      await form.validate()
    }
    const param = ['email', 'password']
    // @ts-ignore
    const data = R.pick<user.LogoData>(param, formMailData)
    const result = await user.logoMail(data)
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
