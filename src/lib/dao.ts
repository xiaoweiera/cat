/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import safeSet from '@fengqiaogang/safe-set'
import { ignore } from '~/api/pathname'
import { getUserTooken } from '~/logic/user/token'
import { current } from '~/utils/lang'

import urlSome from '~/lib/urlsome'

const getUserAuth = function(config: AxiosRequestConfig): string {
  const cookie = getUserTooken()
  if (cookie) {
    // 判断当前接口地址是否需要携带 cookie
    // 此处接口为 true 时为不携带
    const status = urlSome(config, ignore)
    if (status) {
      return ''
    }
  }
  return cookie
}

const Dao = function(option: AxiosRequestConfig | undefined): AxiosInstance {
  const setting = Object.assign(
    {
      timeout: 20000, // request timeout
      baseURL: 'https://ikingdata.com',
      withCredentials: false,
      maxRedirects: 3, // 支持三次重定向
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
      // 设置当前系统语言环境
      safeSet(config, 'params.lang', current.value)
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
