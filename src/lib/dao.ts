/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import Url from 'url'
import jsCookie from 'js-cookie'
import safeGet from '@fengqiaogang/safe-get'
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ignore } from '~/api/pathname'
import { addUserToken, tokenName } from '~/logic/user/token'

const getUserCookie = function(): string {
  const value = jsCookie.get(tokenName)
  if (value) {
    return value
  }
  const funName = 'getUserToken'
  // @ts-ignore
  if (window[funName]) {
    try {
      // @ts-ignore
      const token = window[funName]()
      if (token) {
        addUserToken(token)
        return token
      }
    } catch (e) {
      // todo
    }
  }
  return ''
}

const getUserAuth = function(config: AxiosRequestConfig): string {
  const cookie = getUserCookie()
  if (cookie) {
    // @ts-ignore
    const data = Url.parse(config.url as string, true)
    // @ts-ignore
    const pathname: string = safeGet<string>(data, 'pathname') || config.url
    const value = pathname.split('?')[0]
    let flag = true
    // 判断当前接口是否为忽略对象
    for (let i = 0, len = ignore.length; i < len; i++) {
      const url = ignore[i]
      if (url === value || pathname.includes(url)) {
        flag = false
        break
      }
    }
    if (flag) {
      return cookie
    }
  }
  return ''
}

const Dao = function(option: AxiosRequestConfig | undefined): AxiosInstance {
  const setting = Object.assign(
    {
      timeout: 20000, // request timeout
      baseURL: 'https://ikingdata.com',
      withCredentials: false,
    },
    option || {},
  )
  const service = Axios.create(setting)

  service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getUserAuth(config)
      if (token) {
        config.headers.Authorization = `Token ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  service.interceptors.response.use(
    (res) => {
      if (res.status !== 200) {
        return Promise.reject('error')
      } else {
        return res
      }
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return service
}

export default Dao
