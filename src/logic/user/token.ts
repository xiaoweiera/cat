/**
 * @file 处理 token
 * @author svon.me@gmail.com
 */
import jsCookie from 'js-cookie'
import UrlPattern from 'url-pattern'

export const tokenName = 'token'

export const getDomain = function(): string {
  const hostname = window.location.hostname
  if (hostname === 'localhost') {
    return hostname
  }
  const value = hostname.replace(/[^0-9]/g, '')
  if (/^[0-9]+$/.test(value)) {
    return hostname
  }
  try {
    const pattern = new UrlPattern(
      '(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)',
    )
    // @ts-ignore
    const data = pattern(hostname)
    return `${data.domain}.${data.tld}`
  } catch (e) {
    console.log('UrlPattern', e)
  }
  return hostname
}
// 删除 token
export const removeUserToken = function() {
  const domain = getDomain()
  jsCookie.remove(tokenName, {
    domain,
    path: '/',
  })
}

// 添加 token
export const addUserToken = function(value: string) {
  const domain = getDomain()
  jsCookie.set(tokenName, value, {
    domain,
    path: '/',
  })
}

export const setUserToken = function(value?: string) {
  if (value) {
    return addUserToken(value)
  } else {
    return removeUserToken()
  }
}
