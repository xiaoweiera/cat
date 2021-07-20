/**
 * @file 常用数据定义
 * @author svon.me@gmail.com
 */

export type Callback = (value: any) => void

interface Any {
  [key: string]: any
}

export enum stateName {
  statePair = 'symbolDetail',
  stateInput = 'symbolForm',
}

export interface SymbolForm {
  // @ts-ignore
  trigger?: string
  [key: string]: string | number
}

export enum EventType {
  account = 'accountsChanged', // 切换账号
  connect = 'connect', // 链接
  disconnect = 'disconnect', // 断开
  netword = 'chainChanged', // 网络切换
  message = 'message', // 消息通信
}

export interface SymbolInfo extends Any{
  token: string        // 地址
  reserveCount: string // 储存地址
  name: string     // 名称
  symbol: string   // 代号（币名称）
  decimals: number // 小数
  balance: number
}

export interface PairInfo extends Any {
  total: string | number // 总数
  decimals: string | number // 小数
  balance: string | number // 余额
  symbol0: SymbolInfo
  symbol1: SymbolInfo
}
