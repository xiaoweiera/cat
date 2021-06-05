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
    const value = getUserTooken()
    if (value) {
      const config = { url } as any
      const status = urlSome(config, urls)
      if (status) {
        args.push(url)
        return next(...args)
      }
    }
    const result = {} as any
    return result
  }
  return app
}
