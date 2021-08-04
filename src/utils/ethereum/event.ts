/**
 * @file 事件处理
 */

import Ethereum from './_'
import { EventType, Callback } from './interface'
import { once } from 'ramda'

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
  ethereum.on(EventType.network, callback)
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

/**
 * 记账
 * @param contract    合约对象
 * @param onChangeCallBack  事件回调函数
 */
export const RecordAccounts = function(contract: any, onChangeCallBack?: (type: EventType, data: any) => void) {
  return new Promise((resolve: any, reject: any) => {
    const resolveCallBack = once(function(data: any) {
      return resolve(data)
    })
    const rejectCallBack = once(function(data: any) {
      return reject(data)
    })
    // 本次交易生成一个唯一地址
    const hash = function(id: string) {
      const url = `https://hecoinfo.com/tx/${id}`
      if (onChangeCallBack) {
        onChangeCallBack(EventType.transactionHash, { id, url })
      }
    }
    // 本次交易记账（会触发多次）
    const action = function(index: number) {
      console.log(`${EventType.confirmation}: %s`, index)
      if (index >= 3) {
        // todo 基本可以确认本次交易成功了
        resolveCallBack(true)
      }
      if (onChangeCallBack) {
        onChangeCallBack(EventType.confirmation, index)
      }
    }
    // 本次交易信息
    const receipt = function(data: any) {
      console.log('receipt : ', data)
      if (onChangeCallBack) {
        onChangeCallBack(EventType.receipt, data)
      }
    }

    contract.on(EventType.transactionHash, hash)
      .on(EventType.confirmation, action)
      .on(EventType.receipt, receipt)
      .on(EventType.error, rejectCallBack)
  })
}


export const onAdd = function() {
  const ethereum = Ethereum()
  ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '0x18',
      chainName: 'Heco Mainnet',
      nativeCurrency: {
        name: 'Heco',
        symbol: 'HT',
        decimals: 18,
      },
      rpcUrls: ['https://http-mainnet-node.defibox.com'],
      blockExplorerUrls: ['https://hecoinfo.com'],
    }],
  })
}
