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
    return ethereum.selectedAddress
  }
  return ''
}

/**
 * 是否已链接
 */
export const getConnected = function(): boolean {
  const open = getOpenStatus()
  if (open) {
    const ethereum = Ethereum()
    return toBoolean(ethereum.isConnected())
  }
  return false
}
