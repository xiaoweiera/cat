/**
 * @file 用户
 * @author svon.me@gmail.com
 */

import safeGet from '@fengqiaogang/safe-get'
import * as pathname from './pathname'
import request from '~/lib/service'
import {
  addUserToken,
  removeUserToken,
  getUserTooken,
} from '~/logic/user/token'
import * as lang from '~/utils/lang'
export interface LogoData {
  mobile: string
  password: string
  area_code?: number
}

export interface LogoResult {
  code: number
  message?: string
  [key: string]: any
}

export const getInfo = async function() {
  try {
    // 判断用户是否为已登陆状态
    const token = getUserTooken()
    if (token) {
      const reuslt = await request.get(pathname.user.info)
      return safeGet(reuslt, 'data.data')
    }
    return {}
  } catch (e) {
    return Promise.reject(e)
  }
}
export const logout = async function() {
  try {
    const reuslt = await request.post(pathname.user.logout)
    // 清理 cookie
    removeUserToken()
    return safeGet(reuslt, 'data.data')
  } catch (e) {
    return Promise.reject(e)
  }
}

// 登录
export const logo = async function(query: LogoData): Promise<LogoResult> {
  // 电话区号默认为 +86
  const data = Object.assign({ area_code: 86 }, query)
  // 去掉非数字的字符
  // @ts-ignore
  data.area_code = parseInt(data.area_code.replace(/[^0-9]/g, ''), 10)
  try {
    // 登录前清理 cookie, 保证账户信息干净
    removeUserToken()
    const result = await request.post(pathname.user.login, data)
    const value = safeGet<LogoResult>(result, 'data')
    // 获取 token
    const token = safeGet<string>(value, 'data.token')
    if (token) {
      addUserToken(token)
    }
    return value
  } catch (e) {
    console.log(e)
    // todo
    return Promise.reject(e)
  }
}
// 邮箱登录
export const logoMail = async function(query: LogoData): Promise<LogoResult> {
  const method = 'post'
  const url = '/api/v1/users/email_login'
  // 电话区号默认为 +86
  // const data = Object.assign(query)
  const data = { ...query, lang: lang.current.value }
  try {
    removeUserToken()
    const result = await request({ url, method, data })
    const value = safeGet<LogoResult>(result, 'data')
    // 获取 token
    const token = safeGet<string>(value, 'data.token')
    if (token) {
      addUserToken(token)
    }
    return value
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
// 验证码
// export const getCaptcha = async function(mobile: string): Promise<void> {
//   // 电话区号默认为 +86
//   const data = {area_code: 86, mobile}
//   return request.post(pathname.user.verify, data)
// }
export const getCaptcha = async function(data: any): Promise<void> {
  const url = '/api/v1/users/captcha'
  // 电话区号默认为 +86
  const value = Object.assign({ area_code: '+86' }, data)
  value.area_code = parseInt(value.area_code.replace(/[^0-9]/g, ''), 10)
  return request.post(url, value)
}
// 邮箱验证码
export const getMailCaptcha = async function(
  email: string,
  type: string,
): Promise<void> {
  const url = '/api/v1/users/email_send_code'
  const data = { email, lang: lang.current.value, forget_type: type }
  return request.post(url, data)
}
// 重置密码 验证码
export const getForgetCaptcha = async function(data: any): Promise<any> {
  const url = '/api/v1/users/forget_pass_captcha'
  const value = Object.assign({ area_code: '+86' }, data)
  // value.area_code = data.area_code.replace(/[^0-9]/g, '')
  return request.post(url, value)
}
// 注册
export const register = async function(data: any): Promise<any> {
  const value = Object.assign({ area_code: 86 }, data)
  value.area_code = parseInt(value.area_code.replace(/[^0-9]/g, ''), 10)
  return request.post(pathname.user.signup, value)
}
// 邮箱注册
export const registerMail = async function(data: any): Promise<any> {
  const url = '/api/v1/users/email_signup'
  const value = { ...data, lang: lang.current.value }
  return request.post(url, value)
}
// 重置密码
export const findPwd = async function(data: any): Promise<any> {
  const url = '/api/v1/users/change_password'
  // const value = Object.assign({ area_code: '+86' }, data)
  const value = { ...data, lang: lang.current.value }
  value.area_code = parseInt(value.area_code.replace(/[^0-9]/g, ''), 10)
  return request.post(url, value)
}
// 邮箱重置密码
export const findPwdMail = async function(data: any): Promise<any> {
  const url = '/api/v1/users/email_change_password'
  // const value = Object.assign({ area_code: '+86' }, data)
  const value = { ...data, lang: lang.current.value }
  return request.post(url, value)
}
// 获取区域号码
export const areaCode = async function(): Promise<void> {
  try {
    const reuslt = await request.get('/api/v1/area_codes')
    return safeGet(reuslt, 'data.data')
  } catch (e) {
    return Promise.reject(e)
  }
}
