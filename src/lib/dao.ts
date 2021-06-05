/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ignore } from '~/api/pathname'
import { getUserTooken } from '~/logic/user/token'

import urlSome from '~/lib/urlsome'

const getUserAuth = function(config: AxiosRequestConfig): string {
  const cookie = getUserTooken()
  if (cookie) {
    const status = urlSome(config, ignore)
    if (status) {
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
