/**
 * @file 处理 token
 * @author svon.me@gmail.com
 */
import jsCookie from 'js-cookie'
import UrlPattern from 'url-pattern'

export const tokenName = 'auth_token'

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
    const data = pattern.match(hostname)
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

export const getUserTooken = function(): string {
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
