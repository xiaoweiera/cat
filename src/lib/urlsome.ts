// 判断当前 url 是否符合过滤条件
import Url from 'url'
import { AxiosRequestConfig } from 'axios'
import safeGet from '@fengqiaogang/safe-get'

const urlSome = function(config: AxiosRequestConfig, urls: string[]): boolean {
  // @ts-ignore
  const data = Url.parse(config.url as string, true)
  // @ts-ignore
  const pathname: string = safeGet<string>(data, 'pathname') || config.url
  const value = pathname.split('?')[0]
  let flag = false
  // 判断当前接口是否为忽略对象
  for (let i = 0, len = urls.length; i < len; i++) {
    const url = urls[i]
    if (url === value || pathname.includes(url)) {
      flag = true
      break
    }
  }
  return flag
}

export default urlSome
