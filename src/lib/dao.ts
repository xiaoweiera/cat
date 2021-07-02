/**
 * @file 构造请求对象
 * @author svon.me@gmail.com
 */

import Url from 'url'
import I18n from '~/utils/i18n/index'
import { production as env } from '~/lib/process'
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import safeSet from '@fengqiaogang/safe-set'
import { ignore } from '~/api/pathname'
import { getUserTooken } from '~/logic/user/token'
import { current } from '~/utils/lang'

import urlSome from '~/lib/urlsome'
import safeGet from '@fengqiaogang/safe-get'

const getUserAuth = function (config: AxiosRequestConfig): string {
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

// 判断请求的地址是否和业务域名相同
const isKinddataDomain = function(config: AxiosRequestConfig): boolean {
  const data = Url.parse(config.url as string)
  if (data.hostname) {
    const temp = Url.parse(config.baseURL as string)
    if (data.hostname.includes(temp.hostname as string)) {
      return true
    }
    return false
  }
  return true
}

const Dao = function (option: AxiosRequestConfig | undefined): AxiosInstance {
  const setting = Object.assign(
    {
      timeout: 20000, // request timeout
      baseURL: env.api,
      withCredentials: false,
      maxRedirects: 3, // 支持三次重定向
    },
    option || {},
  )
  const service = Axios.create(setting)

  service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const status = isKinddataDomain(config)
      if (status) {
        // 设置 token
        const token = getUserAuth(config)
        if (token) {
          config.headers.Authorization = `Token ${token}`
        }
        // 设置当前系统语言环境
        safeSet(config, 'params.lang', current.value)
      }
      // 处理 url 中的变量
      if (config.params && config.url) {
        /**
         * 借助 i18n 模块中的 template 可以对字符串中的变量进行替换
         * const url = "xxx/{id}/{name}/xxx"
         * const params = { id: "1", name: "aaa" }
         * 替换后为 "xxx/1/aaa/xxx"
         */
        const url = I18n.template(config.url, config.params)
        config.url = url
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
  // @ts-ignore
  service.check = function<T>(result: any): T | undefined {
    const code = safeGet<number>(result, 'data.code')
    if (code) {
      return safeGet<T>(result, 'data.data')
    }
    return void 0
  }
  return service
}

export default Dao
