/**
 * @file 工具，方法
 * @author svon.me@gmail.com
 */

import { once } from 'ramda'
import Ethereum from './_'
import BigNumber from 'bignumber.js'
// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import { getAddress, getConnected, getLogin } from './status'
import { erc20ABI, PairABI } from './pair'
import { EventType, PairInfo, SymbolInfo, SymbolInfoDetail } from '~/utils/ethereum/interface'
import swapConfig from './config'
import { compact, equalsIgnoreCase, isFunction } from '~/utils'
import DBList from '@fengqiaogang/dblist'
import { tryError, before, validate, required, ErrorDefault } from '~/utils/decorate'
import * as event from '~/utils/ethereum/event'

type AccountCallback = (address: string) => void

export class Web3Util extends Web3 {
  public ethereum: any
  constructor() {
    const ethereum: any = Ethereum()
    super(ethereum);
    this.ethereum = ethereum
  }
  /**
   * 获取用户钱包地址
   */
  getUserAddress (): string | undefined {
    return getAddress()
  }

  /**
   * 连接钱包
   */
  @before(getConnected) // 判断是否已安装小狐狸插件并且已打开
  async enableEthereum () {
    // 打开钱包，让用户授权
    await event.enableEthereum()
    // 返回已授权的地址
    return this.getUserAddress()
  }

  /**
   * 监听账户状态
   * @param callback 账户发生变化时回调函数
   */
  @before(getConnected) // 判断是否已安装小狐狸插件并且已打开
  @before(getLogin)     // 判断是否已登录
  onChangeAccount(callback: AccountCallback): void {
    if (callback && isFunction(callback)) {
      const app = () => {
        const address = this.getUserAddress()
        callback(address || '')
      }
      // 切换账户
      event.onChangeAccount(app)
      // 用户断开链接
      event.onDisconnect(app)
      app()
    }
  }

  //-----------------

  /**
   * 获取合约
   * @param abi 合约类型
   * @param address 地址
   */
  @validate
  @before(getConnected) // 判断小狐狸是否已连接
  getContract(@required abi: any, @required address: string) {
    // @ts-ignore
    return new this.eth.Contract(abi, address)
  }
  // 获取储备量信息
  @validate
  async getReservesValue(@required contract: any) {
    try {
      return await contract.methods.getReserves().call()
    } catch (e) {
      console.log('小狐狸未链接火币网络 https://cointool.app/other/chainList')
    }
  }

  // 总量
  @validate
  @tryError(ErrorDefault(0))
  getTotalValue (@required contract: any): number {
    return contract.methods.totalSupply().call()
  }
  // 小数
  @validate
  @tryError(ErrorDefault(0))
  getDecimalsValue (@required contract: any) {
    return contract.methods.decimals().call()
  }
  // 合约信息
  @tryError()
  @validate
  async getPairInfo (@required address: string): Promise<PairInfo> {
    // 获取合约对象
    const contract = this.getContract(PairABI, address)
    const [total, decimals, balance, symbol0, symbol1] = await Promise.all([
      this.getTotalValue(contract),
      this.getDecimalsValue(contract),
      this.getPairBalance(contract),
      this.getSymbol0(contract),
      this.getSymbol1(contract)
    ])
    return {
      total, decimals, balance, symbol0, symbol1,
    }
  }

  /**
   * 当前用户的 pair 余额
   * @param contract
   * @param address 用户的钱包地址
   * @protected
   */
  @validate // 判断 参数是否为空
  @tryError(ErrorDefault(0)) // 监听异常，有异常返回默认值
  @before(getConnected) // 判断钱包是否已链接
  getPairBalance(@required contract: any, address: string = getAddress()): number {
    if (address) {
      return contract.methods.balanceOf(address).call()
    }
    return 0
  }

  /**
   * 获取 symbol/token 地址
   * @param contract 合约信息
   * @param index symbol 下标
   * @private
   */
  @validate // 判断 参数是否为空
  private async _getSymbolItem(@required contract: any, @required index: number | string): Promise<SymbolInfoDetail> {
    let token: string = ''
    let reserveCount: string = ''
    let name: string = ''
    let symbol: string = ''
    let decimals: number = 0
    const reserves = await this.getReservesValue(contract)
    if (reserves) {
      reserveCount = reserves[index]
      try {
        // @ts-ignore
        token = await contract.methods[`token${index}`]().call()
      } catch (e) {
        console.log(e)
      }
      if (token) {
        // weth 地址
        const contract = await this.getContract(erc20ABI, token)
        name = await this.getSymbolName(contract)
        symbol = await this.getSymbolSymbol(contract)
        decimals = await this.getDecimalsValue(contract)
      }
    }
    return { token, reserveCount, name, symbol, decimals}
  }

  /**
   * 获取 symbol0/token0 地址
   * @param contract 合约信息
   * @private
   */
  protected getSymbol0(contract: any): Promise<SymbolInfo> {
    return this._getSymbolItem(contract, 0)
  }

  /**
   * 获取 symbol1/token1 地址
   * @param contract 合约信息
   * @private
   */
  protected getSymbol1 (@required contract: any): Promise<SymbolInfo> {
    return this._getSymbolItem(contract, 1)
  }
// ------------------------------------
  // symbol/token 名称
  @validate // 判断 参数是否为空
  @tryError(ErrorDefault(''))
  protected getSymbolName (@required contract: any): string {
    return contract.methods.name().call()
  }
  // symbol/token 代号
  @validate // 判断 参数是否为空
  @tryError(ErrorDefault(''))
  protected getSymbolSymbol (@required contract: any): string {
    return contract.methods.symbol().call()
  }
  // -----------
  /**
   * 查询余额
   * @param contractAddress 合约地址(symbol0/symbol1)
   * @param address 用户地址(默认当前链接的钱包地址)
   * @protected
   */
  @validate // 判断 参数是否为空
  @before(getAddress)
  @tryError(ErrorDefault(0)) // 监听异常，返回默认值
  async getSymbolBalance (@required contractAddress: string, address: string = getAddress()): Promise<number> {
    const status = [
      equalsIgnoreCase(contractAddress, swapConfig.UniWETHAddress),
      equalsIgnoreCase(contractAddress, swapConfig.SushiWETHAddress),
      equalsIgnoreCase(contractAddress, swapConfig.WBNBAddress),
      equalsIgnoreCase(contractAddress, swapConfig.WHTAddress)
    ]
    // 如果地址是 weth 地址就查询地址的 eth 余额
    if (compact(status).length > 0) {
      // @ts-ignore
      return this.eth.getBalance(address)
    } else {
      // 查询余额
      // @ts-ignore
      const contract = await this.getContract(erc20ABI, contractAddress)
      // @ts-ignore
      return contract.methods.balanceOf(address).call()
    }
  }
  //----------------------
  /**
   * 查询 symbol 授权状态
   * @param symbolAddress symbol 地址
   * @param userAddress   钱包地址（默认小狐狸钱包链接的地址）
   */
  @tryError(ErrorDefault(false))
  @validate
  async getAuthorizatioStatus (@required symbolAddress: string, userAddress: string = getAddress()): Promise<boolean> {
    // 如果币种的地址是 wht 则默认为已授权
    if (symbolAddress === '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F') {
      return true
    }
    const erc20contract = await this.getContract(erc20ABI, symbolAddress)
    const res = await erc20contract.methods.allowance(userAddress, swapConfig.MdexRouterAddress).call()
    return res.toString(10) !== '0';
  }

  /**
   * 钱包将某一币种授权给当前站点
   * @param symbolAddress
   * @param userAddress
   */
  @validate
  async postApprove (@required symbolAddress: string, userAddress: string = getAddress()) {
    const erc20contract = await this.getContract(erc20ABI, symbolAddress)
    const $0xff = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const approve = await erc20contract.methods.approve(swapConfig.MdexRouterAddress, $0xff)

    return new Promise((resolve: any) => {

      const callback = once(function(data: any) {
        return resolve(data)
      })

      // 本次交易生成一个唯一地址
      const hash = function(id: string) {
        const url = `https://hecoinfo.com/tx/${id}`
        window.open(url)
      }
      // 本次交易记账（会触发多次）
      const action = function(index: number) {
        if (index >= 3) {
          // todo 基本可以确认本次交易成功了
          callback(true)
        }
      }
      // 本次交易信息
      const receipt = function(data: any) {
        console.log('receipt : ', data)
      }

      approve.send({ from: userAddress })
        .on(EventType.transactionHash, hash)
        .on(EventType.confirmation, action)
        .on(EventType.receipt, receipt)
        .on(EventType.error, function(data: any) {
          console.log('error : ', data);
        })
    })
  }
}


/**
 * 给定一项资产的输入量和配对的储备，返回另一项资产的最大输出量
 * @param amountIn 输入数额
 * @param reserveIn 储备量
 * @param reserveOut 储备量Out
 */
export const getAmountOut = function(amountIn: string | number, reserveIn: string | number, reserveOut: string | number): string {
  const amountInBig = new BigNumber(amountIn)
  const reserveInBig = new BigNumber(reserveIn)
  const reserveOutBig = new BigNumber(reserveOut)
  // 判断输入数额是否小于等于 0
  if (amountInBig.lte(0)) {
    return new BigNumber(-1).toString(10)
  }
  // 判断 储备量In 和 储备量Out 小于等于 0
  if (reserveInBig.lte(0) && reserveOutBig.lte(0)) {
    return new BigNumber(-1).toString(10)
  }
  // 税后输入数额 = 输入数额 * 997
  const amountInWithFee = amountInBig.multipliedBy(997)
  // 分子 = 税后输入数额 * 储备量Out
  const numerator = amountInWithFee.multipliedBy(reserveOut)
  // 分母 = 储备量In * 1000 + 税后输入数额
  const denominator = reserveInBig.multipliedBy(1000).plus(amountInWithFee)
  // 输出数额 = 分子 / 分母
  const amountOut = numerator.dividedBy(denominator)
  return amountOut.dp(0, 1).toString(10)
}

/**
 * 查询 pair 信息中的 symbol 信息
 * @param pairData pair 数据 (web3.getPairInfo 获取)
 * @param symbol symbol 名称
 */
export const getPairSymbolData = function(pairData: PairInfo, symbol: string): SymbolInfoDetail | undefined {
  const primaryKey = 'symbol'
  const list = compact([pairData.symbol0, pairData.symbol1])
  const db = new DBList(list, primaryKey)
  const where = {[primaryKey]: symbol}
  return db.selectOne<SymbolInfoDetail>(where)
}

