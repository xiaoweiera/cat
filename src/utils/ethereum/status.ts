import Ethereum from './_'
import { toBoolean } from '~/utils'

/**
 * 判断是否已安装小狐狸浏览器插件
 */
export const getOpenStatus = function(): boolean {
  const ethereum = Ethereum()
  return toBoolean(ethereum && ethereum.isMetaMask);
}

/**
 * 地址
 */
export const getAddress = function(): string {
  const open = getOpenStatus()
  if (open) {
    const ethereum = Ethereum()
    return ethereum?.selectedAddress
  }
  return ''
}

/**
 * 判断是否已登录小狐狸插件
 */
export const getLogin = function(): boolean {
  const address = getAddress()
  return toBoolean(address)
}

/**
 * 是否已安装小狐狸插件并且为打开状态
 */
export const getConnected = function(): boolean {
  const open = getOpenStatus()
  if (open) {
    const ethereum = Ethereum()
    return toBoolean(ethereum?.isConnected())
  }
  return false
}
