
// 币种基础信息
import { EchartData } from '~/logic/echarts/interface'

export enum SymbolType {
  Lp = 'lp',
  Token = 'token',
  Child = 'children',
  Apy = 'apy',
  name = 'symbol_type'
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
