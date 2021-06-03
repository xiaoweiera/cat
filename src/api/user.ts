/**
 * @file 用户
 * @author svon.me@gmail.com
 */

import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/devRequest'
import { addUserToken, removeUserToken } from '~/logic/user/token'

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
    const reuslt = await request.get('/api/v1/users/my')
    return safeGet(reuslt, 'data.data')
  } catch (e) {
    return Promise.reject(e)
  }
}
export const logout = async function() {
  const method = 'post'
  const url = '/api/v1/users/logout'
  try {
    const reuslt = await request({ url, method })
    // 清理 cookie
    removeUserToken()
    return safeGet(reuslt, 'data.data')
  } catch (e) {
    return Promise.reject(e)
  }
}

// 登录
export const logo = async function(query: LogoData): Promise<LogoResult> {
  const method = 'post'
  const url = '/api/v1/users/login'
  // 电话区号默认为 +86
  const data = Object.assign({ area_code: 86 }, query)
  try {
    // 登录前清理 cookie, 保证账户信息干净
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
export const getCaptcha = async function(mobile: string): Promise<void> {
  const url = '/api/v1/users/captcha'
  // 电话区号默认为 +86
  const data = { area_code: 86, mobile }
  return request.post(url, data)
}

// 注册
export const register = async function(data: any): Promise<any> {
  const url = '/api/v1/users/signup'
  const value = Object.assign({ area_code: 86 }, data)
  return request.post(url, value)
}
