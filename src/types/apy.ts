// {"project_name":"venus",
// "token_name":"ADA",
// "apy":1.57341408486365,
// "apy_detail":"利率(0.59%) + 挖矿(0.99%)",
// "quota_remain":null,
// "quota_remain_percent":null,
// "quota_used":null,
// "tvl":198758317.857189,
// "quota":null,
// "timestamp":1618830000,
// "high_light":false}

export interface ItemModel {
  project_name: String
  token_name: String
}

export interface coinModelInfo {
  name: string
  key: string
  value: string
  status: boolean
}

export interface CoinModel {
  project_name: string
  token_name: string
  apy: number
  apy_detail: number
  quota_remain: string
  quota_remain_percent: string
  quota_used: string
  tvl: number
  quota: string
  timestamp: string
  interval: number
  chain: string
  category: string
  high_light: boolean
}

export interface HeaderModel {
  token_name: String
  price: Number
  change: Number
  logo: String
}

export interface RowModel {
  project_name: String
  icon: String
  chain: String
  url: String
  data: Map<String, CoinModel>
}

export interface RowResponse {
  code: Number
  data: RowModel[]
}

export interface OriginTableModel {
  headers: HeaderModel[]
  rows: RowModel[]
}

export interface TableModel {
  project: string
  title: string
  headers: HeaderModel[]
  rows: RowModel[]
}

export interface OptionModel {
  key: string
  name: string
  status: boolean
  format_func: Function
  format_cb: Function
}
