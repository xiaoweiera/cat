/**
 * @file 工具，方法
 * @author svon.me@gmail.com
 */

import Ethereum from './_'
import BigNumber from 'bignumber.js'
// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import { getAddress, getConnected } from './status'
import { erc20ABI, PairABI } from './pair'
import { PairInfo, SymbolInfo } from '~/utils/ethereum/interface'
import swapConfig from './config'
import { compact, equalsIgnoreCase } from '~/utils'
import DBList from '@fengqiaogang/dblist'


export class Web3Util extends Web3 {
  constructor() {
    const ethereum: any = Ethereum()
    super(ethereum);
  }

  /**
   * 获取合约
   * @param abi
   * @param address
   */
  getContract(abi: any, address: string) {
    if (getConnected()) {
      // @ts-ignore
      return new this.eth.Contract(abi, address)
    }
  }

  // 获取储备量信息
  async getReservesValue(contract: any) {
    try {
      const value = await contract.methods.getReserves().call()
      return value
    } catch (e) {
      console.log('小狐狸未链接火币网络 https://cointool.app/other/chainList')
    }
  }

  // 总量
  async getTotalValue (contract: any) {
    try {
      return await contract.methods.totalSupply().call()
    } catch (e) {
      return 0
    }
  }
  // 小数
  async getDecimalsValue (contract: any) {
    try {
      return await contract.methods.decimals().call()
    } catch (e) {
      return 0
    }
  }
  // 合约信息
  async getPairInfo (address: string): Promise<PairInfo> {
    const contract = this.getContract(PairABI, address)
    const [total, decimals, balance, symbol0, symbol1] = await Promise.all([
      this.getTotalValue(contract),
      this.getDecimalsValue(contract),
      this.getPairBalance(contract),
      this.getSymbol0(contract, true),
      this.getSymbol1(contract, true)
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
  async getPairBalance(contract: any, address: string = getAddress()): Promise<number> {
    if (contract && address) {
      try {
        return await contract.methods.balanceOf(address).call()
      } catch (e) {
        console.log('pairBalance : ', e)
      }
    }
    return 0
  }

  /**
   * 获取 symbol0/token0 地址
   * @param contract 合约信息
   * @param info 是否查询相信信息
   * @private
   */
  protected async getSymbol0(contract: any, info: boolean = false): Promise<SymbolInfo> {
    let token: string = ''
    let reserveCount: string = ''
    const reserves = await this.getReservesValue(contract)
    if (reserves) {
      reserveCount = reserves['0']
      try {
        // @ts-ignore
        token = await contract.methods.token0().call()
      } catch (e) {
        console.log(e)
      }
      if (info && token) {
        const data = await this.getSymbolInfo(token)
        return { ...data, token, reserveCount }
      }
    }
    return { token, reserveCount, name: '', symbol: '', decimals: 0, balance: 0 }
  }

  /**
   * 获取 symbol1/token1 地址
   * @param contract 合约信息
   * @param info 是否查询相信信息
   * @private
   */
  protected async getSymbol1 (contract: any, info: boolean = false): Promise<SymbolInfo> {
    let token: string = ''
    let reserveCount: string = ''
    const reserves = await this.getReservesValue(contract)
    if (reserves) {
      reserveCount = reserves['1']
      try {
        // @ts-ignore
        token = await contract.methods.token1().call()
      } catch (e) {
        console.log(e)
      }
      if (info && token) {
        const data = await this.getSymbolInfo(token)
        return { ...data, token, reserveCount }
      }
    }
    return { token, reserveCount, name: '', symbol: '', decimals: 0, balance: 0 }
  }
// ------------------------------------
  /**
   * 查询地址详情信息
   * @param contractAddress 合约地址
   * @protected
   */
  async getSymbolInfo (contractAddress: string) {
    // weth 地址
    const contract = await this.getContract(erc20ABI, contractAddress)
    const [name, symbol, decimals, balance] = await Promise.all([
      this.getSymbolName(contract),
      this.getSymbolSymbol(contract),
      this.getDecimalsValue(contract),
      this.getSymbolBalance(contractAddress)
    ])
    return { name, symbol, decimals, balance }
  }
  // symbol/token 名称
  protected async getSymbolName (contract: any): Promise<string> {
    try {
      return await contract.methods.name().call()
    } catch (e) {
      console.log(e)
      return ''
    }
  }
  // symbol/token 代号
  protected async getSymbolSymbol (contract: any): Promise<string> {
    try {
      return await contract.methods.symbol().call()
    } catch (e) {
      console.log(e)
      return ''
    }
  }
  // -----------
  /**
   * 查询余额
   * @param contractAddress 合约地址(symbol0/symbol1)
   * @param address 用户地址(默认当前链接的钱包地址)
   * @protected
   */
  async getSymbolBalance (contractAddress: string, address: string = getAddress()): Promise<number> {
    const status = [
      equalsIgnoreCase(contractAddress, swapConfig.UniWETHAddress),
      equalsIgnoreCase(contractAddress, swapConfig.SushiWETHAddress),
      equalsIgnoreCase(contractAddress, swapConfig.WBNBAddress),
      equalsIgnoreCase(contractAddress, swapConfig.WHTAddress)
    ]
    // 如果地址是 weth 地址就查询地址的 eth 余额
    if (compact(status).length > 0) {
      // @ts-ignore
      try {
        // @ts-ignore
        return await this.eth.getBalance(address)
      } catch (e) {
        // todo
      }
    } else {
      // 查询余额
      try {
        // @ts-ignore
        const contract = await this.getContract(erc20ABI, contractAddress)
        // @ts-ignore
        return await contract.methods.balanceOf(address).call()
      } catch (e) {
        // todo
      }
    }
    return 0
  }
  //----------------------
  /**
   * 查询 symbol 授权状态
   * @param symbolAddress symbol 地址
   * @param userAddress   钱包地址（默认小狐狸钱包链接的地址）
   */
  async getAuthorizatioStatus (symbolAddress: string, userAddress: string = getAddress()): Promise<boolean> {
    if (symbolAddress && userAddress) {
      const erc20contract = await this.getContract(erc20ABI, symbolAddress)
      try {
        const res = await erc20contract.methods.allowance(userAddress, swapConfig.MdexRouterAddress).call()
        return res.toString(10) !== '0';
      } catch (e) {
        return Promise.reject(e)
      }
    }
    return Promise.reject({
      message: 'symbolAddress 不能为空'
    })
  }

  /**
   * 钱包将某一币种授权给当前站点
   * @param symbolAddress
   * @param userAddress
   */
  async postApprove (symbolAddress: string, userAddress: string = getAddress()) {
    const erc20contract = await this.getContract(erc20ABI, symbolAddress)
    const $0xff = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const approve = await erc20contract.methods.approve(swapConfig.MdexRouterAddress, $0xff)
    approve.send({ from: userAddress })
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
export const getPairSymbolData = function(pairData: PairInfo, symbol: string): SymbolInfo | undefined {
  const primaryKey = 'symbol'
  const list = compact([pairData.symbol0, pairData.symbol1])
  const db = new DBList(list, primaryKey)
  const where = {[primaryKey]: symbol}
  return db.selectOne<SymbolInfo>(where)
}

