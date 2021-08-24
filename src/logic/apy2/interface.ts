
// 币种基础信息
import { EchartData } from '~/logic/echarts/interface'

export enum SymbolType {
  Lp = 'lp',
  Token = 'token',
  Child = 'children',
  Apy = 'apy',
  name = 'symbol_type'
}

export const TabCategoryData = {
  mining: 'mining',
  deposit: 'lend'
}

export interface TokenItem {
  id: string | number
  name: string
  icon: string
  href?: string
}

export class HecoDetail{
  votes: number = 0; // 总票数
  voters: number = 0; // 总投票人数
}

export class HecoTrends extends HecoDetail{
  trends: EchartData | undefined
}

export class NodeTrends {
  update_time?: number
  trends: EchartData | undefined
}

export class HecoNode {
  id: string = ''
  votes: number = 0
  voters: number = 0
  node_name: string = ''
  percent: string = ''
  user_profit_percent: string = ''
  apy: string = ''
  data_type: string = ''
  area: string = ''
  node_logo: string = ''
  website: string = ''
  address: string = ''
  update_time: string = ''
  custom?: boolean = false // 是否为自定义数据
  expand?: boolean = false // 是否展开数据
}
export interface projectParam {
  chain:string
  query:string
}
export interface poolsParam {
  project_id:number
  pool_type:string
  chain:string
  symbol_type:string
  query:string
}
export interface addDialog {
  radioValue:string
  chain:string
  search:string
}
export interface tokenSearch {
  query:string
  category:string
  chain:string
  page:number
  page_size:number
}
export interface poolSearch {
  query:string
  pool_type:string
  chain:string
  page:number
  page_size:number
}
export interface miningPoolParam{
  group_id:number
  symbol_type:string
  project_id:number
  query:string
  chain:string
  ordering:string
  page:number
  page_size:number
}
export interface loanPoolParam{
  lend_symbol:number
  loan_symbol:string
  project_id:number
  chain:string
  page:number
  page_size:number
}
export interface miningChart{
  chain:string
  symbol:string
}
export interface loanChart{
  chain:string
  symbol:string
}
export interface projectMiningChart{
  from_ts:string
  to_ts:string
  project_id:number
  pools:string
  field1:number
}
