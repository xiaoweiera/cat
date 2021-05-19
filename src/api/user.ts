/**
 * @file 用户
 * @author svon.me@gmail.com
 */

import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/request'

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

// 登录
export const logo = async function(query: LogoData): Promise<LogoResult> {
  const method = 'post'
  const url = '/api/v1/users/login'
  // 电话区号默认为 +86
  const data = Object.assign({ area_code: 86 }, query)
  try {
    const result = await request({ url, method, data })
    const value = safeGet<LogoResult>(result, 'data')
    return value
  } catch (e) {
    // todo
    return Promise.reject(e)
  }
}
