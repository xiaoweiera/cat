
// 币种基础信息
export interface TokenItem {
  id: string | number
  name: string
  icon: string
  href?: string
}
//挖矿页面top5榜单
export interface mining_rankModel {
  symbol:string
  symbol_type:string
  symbol_alias:string
  symbol_price:number
  symbol_change:number
  symbol_contract_addr:string
  symbol_logo:string
  strategy_tags:string
  chain:string
  project:string
  project_category:string
  tvl:string
  quota:string
  quota_used:string
  quota_used_percent:string
  quota_remain:string
  quota_remain_percent:string
  lever:string
  single_apy:string
  single_apy_detail:string
  compound_apy:string
  compound_detail:string
  mortgage_rate:string
  liquidation_rate:string
  followed:string
  new:string
  market:string
}
