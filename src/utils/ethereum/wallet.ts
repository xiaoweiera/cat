/**
 * @file 钱包
 */

// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import Ethereum from '~/utils/ethereum/_'
import { compact, forEach, isNumber, toArray, toBoolean, toNumber } from '~/utils'
import { before, ErrorDefault, tryError } from '~/utils/decorate'
import { Callback, EventType, ChainItem } from '~/utils/ethereum/interface'
import { chainList } from './chainlist'
import DBList from '@fengqiaogang/dblist'
import safeGet from '@fengqiaogang/safe-get'


export default class Wallet extends Web3 {
  public ethereum: any
  // 线路ID
  public chainId: number
  // 事件回调函数
  private eventCallback: Map<EventType, Callback[]>
  constructor(chainId: number) {
    const ethereum: any = Ethereum() // 获取小狐狸对象
    super(ethereum);
    this.chainId = chainId
    this.ethereum = ethereum
    this.eventCallback = new Map()
    if (ethereum) {
      this.init()
    }
  }
  // 初始化
  private init () {
    const eventCallback = (type: EventType, data: any) => {
      this.eventCallback.forEach(function(list: Callback[], key: EventType) {
        if (key === type) {
          forEach((callback: Callback) => callback(data), list)
        }
      })
    }
    // 切换账户
    this.ethereum.on(EventType.account, (data: any) => {
      eventCallback(EventType.account, data)
    })
    // 断开连接
    this.ethereum.on(EventType.disconnect, function(data: any) {
      eventCallback(EventType.disconnect, data)
    })
    // 网络切换
    this.ethereum.on(EventType.network, function(data: any) {
      // 切换网络时刷新页面
      window.location.reload()
      // eventCallback(EventType.network, data)
    })
  }

  /**
   * 绑定事件
   * @param eventName 事件名称
   * @param callback  事件回调函数
   */
  on(eventName: EventType, callback: Callback) {
    let list: Callback[] = []
    if (this.eventCallback.has(eventName)) {
      list = toArray(list, this.eventCallback.get(eventName))
    }
    list.push(callback)
    this.eventCallback.set(eventName, compact(list))
  }
  /**
   * 判断 chain id 是否存在
   * @private
   */
  // @ts-ignore
  private chainIdIsNaN(): boolean {
    return isNumber(this.chainId);
  }
  /**
   * 判断网络是否与指定的相同
   */
  expectNetWork () {
    try {
      if (this.chainIdIsNaN()) {
        const id = toNumber(this.chainId)
        const version = toNumber(this.ethereum.networkVersion)
        if (version === id) {
          return true
        }
      } else {
        // 网络不相同
        throw { code: 5001 }
      }
    } catch (e) {
    }
    return false
  }

  /**
   * 判断是否已安装小狐狸插件
   */
  @tryError(ErrorDefault(false)) // 设置默认返回值
  @before(Ethereum) // 判断钱包对象是否存在
  getIsMetaMaskInstalled(): boolean {
    return toBoolean(this.ethereum.isMetaMask)
  }

  /**
   * 是否已安装小狐狸插件并且为打开状态
   */
  @tryError(ErrorDefault(false)) // 设置默认返回值
  @before('getIsMetaMaskInstalled') // 判断小狐狸插件对象是否存在
  getConnected () {
    return toBoolean(this.ethereum.isConnected())
  }
  /**
   * 获取小狐狸选中的线路地址(用户钱包地址)
   */
  @before('getConnected') // 判断小狐狸插件对象是否存在
  getChainAddress (): string | undefined {
    try {
      return this.ethereum.selectedAddress
    } catch (e) {
      // todo
    }
    return void 0
  }
  /**
   * 判断是否已登录
   */
  getIsLogin() {
    // 获取钱包地址
    const address = this.getChainAddress()
    // 地址存在则已登录，否则为未登录
    return toBoolean(address)
  }
  /**
   * 连接钱包
   */
  @before('chainIdIsNaN') // 判断是否设置了线路 id
  @before('getConnected') // 判断是否已安装小狐狸插件并且已打开
  async enableEthereum () {
    try {
      if (this.getIsLogin()) {
        return true
      }
      // 打开钱包，让用户授权
      await this.ethereum.request({
        method: 'eth_requestAccounts'
      })
      return true
    } catch (e) {
      const code = safeGet(e, 'code')
      if (code === -32002) {
        return Promise.reject({ code: 6001 })
      } else if (code === 4001) {
        return Promise.reject({ code: 4001 })
      }
    }
    return Promise.reject({ code: 6002 })
  }

  /**
   * 网络授权或者切换网络
   */
  @before('chainIdIsNaN') // 判断是否设置了线路 id
  @before('getConnected') // 判断是否已安装小狐狸插件并且已打开
  async connectChain () {
    const db = new DBList(chainList, 'chainID')
    const data = db.selectOne<ChainItem>({ 'chainID': this.chainId })
    if (data) {
      const opt = {
        method: 'wallet_addEthereumChain',
        params: [{
          // @ts-ignore
          chainId: this.utils.toHex(data.chainID),
          chainName: data.name,
          nativeCurrency: {
            name: data.currency,
            symbol: data.currency,
            decimals: data.decimals,
          },
          rpcUrls: [data.rpc],
          blockExplorerUrls: [data.scan],
        }],
      }
      try {
        return await this.ethereum.request(opt)
      } catch (e) {
        const code = safeGet<number>(e, 'code')
        if (code === 4001) {
          return Promise.reject({
            code: 5003
          })
        } else {
          return Promise.reject({
            code: 5004
          })
        }
      }
    }
    return Promise.reject({
      code: 5002
    })
  }
}
