/**
 * @file 判断用户信息
 * @author svon.me@gmail.com
 */

import urlSome from '~/lib/urlsome'
import { getUserTooken } from '~/logic/user/token'
// @ts-ignore
import { LoginStatus as urls } from '~/api/pathname'

type Next = <T>(...args: Array<any>) => Promise<T>

export const LoginStatus = function(url: string, next: Next): Next {
  const app: Next = function <T>(...args: Array<any>): Promise<T> {
    const config = { url } as any
    args.push(url)
    // 当前接口地址是否需要判断登录状态
    if (urlSome(config, urls)) {
      // 判断是否登录
      if (getUserTooken()) {
        return next(...args)
      }
      // 未登录直接返回空
      return {} as any
    }
    return next(...args)
  }
  return app
}
