/**
 * @file 工具，方法
 * @author svon.me@gmail.com
 */

import Ethereum from './_'
import BigNumber from 'bignumber.js'
// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import { getAddress, getConnected, getLogin } from './status'
import { erc20ABI, PairABI, UniSwapV2Router02ABI } from './pair'
import { EventType, PairInfo, SymbolInfoDetail } from '~/utils/ethereum/interface'
import swapConfig from './config'
import { compact, equalsIgnoreCase, isFunction, numberDecimal } from '~/utils'
import DBList from '@fengqiaogang/dblist'
import { tryError, before, validate, required, ErrorDefault } from '~/utils/decorate'
import * as event from '~/utils/ethereum/event'
import { RecordAccounts } from '~/utils/ethereum/event'

type AccountCallback = (address: string) => void

export class Web3Util extends Web3 {
  public ethereum: any
  public pairAddress: string // pair 地址
  constructor(pairAddress: string) {
    const ethereum: any = Ethereum()
    super(ethereum);
    this.pairAddress = pairAddress
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
  async getReservesValue() {
    try {
      const contract = this.getContract(PairABI, this.pairAddress)
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
  async getPairInfo (address: string = this.pairAddress): Promise<PairInfo> {
    // 获取合约对象
    const contract = this.getContract(PairABI, address)
    const [total, decimals, balance, symbol0, symbol1] = await Promise.all([
      this.getTotalValue(contract),
      this.getDecimalsValue(contract),
      this.getBalanceCount(contract),
      this.getSymbol(0),
      this.getSymbol(1)
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
  getBalanceCount(@required contract: any, address: string = getAddress()): number {
    if (address) {
      return contract.methods.balanceOf(address).call()
    }
    return 0
  }

  /**
   * 获取 symbol/token 地址
   * @param index symbol 下标
   * @private
   */
  @validate // 判断 参数是否为空
  protected async getSymbol(@required index: number | string): Promise<SymbolInfoDetail> {
    let token: string = ''
    let reserveCount: string = ''
    let name: string = ''
    let symbol: string = ''
    let decimals: number = 0
    const contract = this.getContract(PairABI, this.pairAddress)
    const reserves = await this.getReservesValue()
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
      const contract = await this.getContract(erc20ABI, contractAddress)
      return this.getBalanceCount(contract, address)
    }
  }
  //----------------------
  /**
   * 查询 symbol 授权状态
   * @param symbolAddress symbol 地址
   */
  @tryError(ErrorDefault(false))
  @validate
  @before(getAddress) // 判断钱包地址是否为空 钱包地址（默认小狐狸钱包链接的地址）
  async getAuthorizatioStatus (@required symbolAddress: string): Promise<boolean> {
    // 如果币种的地址是 wht 则默认为已授权
    if (symbolAddress === '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F') {
      return true
    }
    const erc20contract = await this.getContract(erc20ABI, symbolAddress)
    const res = await erc20contract.methods.allowance(getAddress(), swapConfig.MdexRouterAddress).call()
    return res.toString(10) !== '0';
  }

  /**
   * 钱包将某一币种授权给当前站点
   * @param symbolAddress
   */
  @validate
  async postApprove (@required symbolAddress: string) {
    const erc20contract = await this.getContract(erc20ABI, symbolAddress)
    const $0xff = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const approve = await erc20contract.methods.approve(swapConfig.MdexRouterAddress, $0xff)
    return RecordAccounts(approve.send({ from: this.getUserAddress() }))
  }

  //--- 交易 ------
  @validate
  private async _getAmountIn (@required fromAddress: string, @required toAddress: string, @required inputAddress: string, @required amount: number) {
    const slipPointValue = 5
    if (fromAddress === inputAddress) {
      const contract = await this.getContract(erc20ABI, fromAddress)
      const decimals = await this.getDecimalsValue(contract)
      // 兑换数量
      const value = numberDecimal(amount, decimals)
      // 计算滑点（求最小交易量）
      const amountMinValue = await this.getAmountValue(fromAddress, toAddress, inputAddress, SlipPoint(value, slipPointValue))
      return [value, amountMinValue]
    } else {
      const contract = await this.getContract(erc20ABI, toAddress)
      const decimals = await this.getDecimalsValue(contract)
      // 兑换数量
      const value = numberDecimal(amount, decimals)
      // 计算滑点（求最小交易量）
      const amountMinValue = await this.getAmountValue(fromAddress, toAddress, inputAddress, SlipPoint(value, slipPointValue * -1))
      return [value, amountMinValue]
    }


  }
  /**
   * 交易
   * @param fromAddress  地址
   * @param toAddress    地址
   * @param inputAddress 输入 symbol 地址
   * @param amount       兑换数量
   * @param onChangeCallBack 事件回调函数
   */
  @validate
  async swap (@required fromAddress: string, @required toAddress: string, @required inputAddress: string, @required amount: number, onChangeCallBack?: (type: EventType, data: any) => void) {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20
    // console.log('from = %s, to = %s, input = %s, amount = %s', fromAddress, toAddress, inputAddress, amount)
    // 兑换数量, 计算滑点（求最小交易量）
    const [amountValue, amountMinValue] = await this._getAmountIn(fromAddress, toAddress, inputAddress, amount)
    // console.log('兑换数量 ： %s', amountValue)
    // console.log('计算最小兑换量 : %s', amountMinValue)
    const metaMaskAccount = this.getUserAddress() // 钱包地址

    const uniswapV2Router = await this.getContract(UniSwapV2Router02ABI, swapConfig.MdexRouterAddress)

    const path = [fromAddress, toAddress]

    // console.log('amountIn = "%s"  amountMinValue = "%s" deadline = "%s"', amountValue, amountMinValue, deadline)
    // console.log('form address = "%s"  to address = "%s"', path[0], path[1])
    // console.log('metaMaskAccount = "%s"', metaMaskAccount)

    if (fromAddress === inputAddress) {
      // 输入换输出
      if (equalsIgnoreCase(swapConfig.WHTAddress, fromAddress)) {
        // 判断输入地址是否是 eth
        const contract = uniswapV2Router.methods.swapExactETHForTokens(amountMinValue, path, metaMaskAccount, deadline)
          .send({ from: metaMaskAccount, value: amountValue })
        return RecordAccounts(contract, onChangeCallBack)
      } else if (equalsIgnoreCase(swapConfig.WHTAddress, toAddress)) {
        // 判断输出是否是 eth
        const contract = uniswapV2Router.methods.swapExactTokensForETH(amountValue, amountMinValue, path, metaMaskAccount, deadline)
          .send({ from: metaMaskAccount })
        return RecordAccounts(contract, onChangeCallBack)
      } else {
        const contract = uniswapV2Router.methods.swapExactTokensForTokens(amountValue, amountMinValue, path, metaMaskAccount, deadline)
          .send({ from: metaMaskAccount })
        return RecordAccounts(contract, onChangeCallBack)
      }
    } else {
      // 输出换输入
      if (equalsIgnoreCase(swapConfig.WHTAddress, fromAddress)) {
        // 判断输入地址是否是 eth
        const contract = uniswapV2Router.methods.swapETHForExactTokens(amountValue, path, metaMaskAccount, deadline)
          .send({ from: metaMaskAccount, value: amountMinValue })
        return RecordAccounts(contract, onChangeCallBack)
      } else if (equalsIgnoreCase(swapConfig.WHTAddress, toAddress)) {
        // 判断输出是否是 eth
        const contract = uniswapV2Router.methods.swapTokensForExactETH(amountValue, amountMinValue, path, metaMaskAccount, deadline)
          .send({ from: metaMaskAccount })
        return RecordAccounts(contract, onChangeCallBack)
      } else {
        const contract =  uniswapV2Router.methods.swapTokensForExactTokens(amountValue, amountMinValue, path, metaMaskAccount, deadline)
          .send({ from: metaMaskAccount })
        return RecordAccounts(contract, onChangeCallBack)
      }
    }
  }
  @validate
  async getAmountValue (@required fromAddress: string, @required toAddress: string, @required inputAddress: string, @required amount: number | string) {
    const input = new BigNumber(amount).toString(10)
    // 获取合约对象
    const uniswapV2Router = await this.getContract(UniSwapV2Router02ABI, swapConfig.MdexRouterAddress)
    const [symbol0, symbol1] = await Promise.all([this.getSymbol(0), this.getSymbol(1)])

    let info0: SymbolInfoDetail
    let info1: SymbolInfoDetail

    if (fromAddress === symbol0.token) {
      info0 = symbol0
      info1 = symbol1
    } else {
      info0 = symbol1
      info1 = symbol0
    }

    if (fromAddress === inputAddress) {
      // symbol0 换 symbol1
      // 输入计算输出
      // @ts-ignore
      return uniswapV2Router.methods.getAmountOut(input, info0.reserveCount, info1.reserveCount).call()
    } else {
      // symbol1 换 symbol0
      // 输出计算输入
      // @ts-ignore
      return uniswapV2Router.methods.getAmountIn(input, info0.reserveCount, info1.reserveCount).call()
    }
  }
}

export const SlipPoint = function(number: number | string, slipValue: number) {
  const num1 = new BigNumber(number)
  const num2 = new BigNumber(number).multipliedBy(slipValue / 100)
  return num1.minus(num2).toString(10)
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

