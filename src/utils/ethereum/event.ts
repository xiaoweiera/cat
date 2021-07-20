/**
 * @file 事件处理
 */

import Ethereum from './_'
import { EventType, Callback } from './interface'

/**
 * 切换账户的时候会调用此方法
 */
export const onChangeAccount = function(callback: Callback) {
  const ethereum = Ethereum()
  ethereum.on(EventType.account, callback)
}

/**
 * 用户连接钱包
 */
export const onConnect = function(callback: Callback) {
  const ethereum = Ethereum()
  ethereum.on(EventType.connect, callback)
}


/**
 * 断开连接
 */
export const onDisconnect = function(callback: Callback) {
  const ethereum = Ethereum()
  ethereum.on(EventType.disconnect, callback)
}

/**
 * 切换网络
 */
export const onChangeNetWord = function(callback: Callback) {
  const ethereum = Ethereum()
  ethereum.on(EventType.netword, callback)
}


/**
 * 消息通信
 */
export const onMessage = function(callback: Callback) {
  const ethereum = Ethereum()
  ethereum.on(EventType.message, callback)
}

// 主动链接钱包
export const enableEthereum = async function() {
  const ethereum = Ethereum()
  return ethereum.request({ method: 'eth_requestAccounts' })
}
