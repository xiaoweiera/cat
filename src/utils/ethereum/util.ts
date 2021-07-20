/**
 * @file 工具，方法
 * @author svon.me@gmail.com
 */

import Ethereum from './_'
import { erc20ABI, PairABI } from './pair'
// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import { getAddress } from './status'
import { SymbolInfo } from '~/utils/ethereum/interface'
import swapConfig from './config'
import { equalsIgnoreCase, compact } from '~/utils'


class Web3Util extends Web3 {
  constructor() {
    const ethereum: any = Ethereum()
    super(ethereum);
  }

  // 获取储备量信息
  private async getReservesValue(contract: any) {
    try {
      const value = await contract.methods.getReserves().call()
      return value
    } catch (e) {
      console.log('小狐狸未链接火币网络 https://cointool.app/other/chainList')
    }
  }

  // 总量
  private async getTotalValue (contract: any) {
    try {
      return await contract.methods.totalSupply().call()
    } catch (e) {
      return 0
    }
  }
  // 小数
  private async getDecimalsValue (contract: any) {
    try {
      return await contract.methods.decimals().call()
    } catch (e) {
      return 0
    }
  }
  async getPairInfo (address: string) {
    // @ts-ignore
    const contract = new this.eth.Contract(PairABI, address)
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
  protected async getPairBalance(contract: any, address: string = getAddress()): Promise<number> {
    if (contract && address) {
      try {
        // const value = await contract.methods.balanceOf(address).call()
        // return value
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
  private async getSymbol0(contract: any, info: boolean = false): Promise<SymbolInfo> {
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
    return { token, reserveCount }
  }

  /**
   * 获取 symbol1/token1 地址
   * @param contract 合约信息
   * @param info 是否查询相信信息
   * @private
   */
  private async getSymbol1 (contract: any, info: boolean = false): Promise<SymbolInfo> {
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
    return { token, reserveCount }
  }
// ------------------------------------
  /**
   * 查询地址详情信息
   * @param contractAddress 合约地址
   * @protected
   */
  protected async getSymbolInfo (contractAddress: string) {
    // weth 地址
    // @ts-ignore
    const contract = new this.eth.Contract(erc20ABI, contractAddress)
    const [name, symbol, decimals] = await Promise.all([
      this.getSymbolName(contract),
      this.getSymbolSymbol(contract),
      this.getDecimalsValue(contract)
    ])
    return { name, symbol, decimals }
  }
  // symbol/token 名称
  private async getSymbolName (contract: any): Promise<string> {
    try {
      return await contract.methods.name().call()
    } catch (e) {
      console.log(e)
      return ''
    }
  }
  // symbol/token 代号
  private async getSymbolSymbol (contract: any): Promise<string> {
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
  protected async getSymbolBalance (contractAddress: string, address: string = getAddress()): Promise<number> {
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
        const value = await this.eth.getBalance(address)
        console.log(value)
        return value
      } catch (e) {
        // todo
      }
    } else {
      // 查询余额
      try {
        // @ts-ignore
        const contract = new this.eth.Contract(erc20ABI, contractAddress)
        // @ts-ignore
        const value = await contract.methods.balanceOf(address).call()
        console.log('value : ', value)
        return value
      } catch (e) {
        // todo
      }
    }
    return 0
  }
}

export default Web3Util
