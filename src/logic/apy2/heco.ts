/**
 * @file heco 数据
 * @author svon.me@gmail.com
 */

import { omit } from 'ramda'
import * as API from '~/api/index'
import I18n from '~/utils/i18n/index'
import { HecoNode, HecoTrends, NodeTrends } from './interface'
import { map, dateTime, dateYMDFormat, dateMDFormat, toNumber, formatCash } from '~/utils'
import DBList from '@fengqiaogang/dblist'
import { EchartData } from '~/logic/echarts/interface'

const transform = function(trends?: EchartData): EchartData | undefined {
  if (trends) {
    const xAxis = map(function(date: number) {
      const time = dateTime(date)
      const key = dateYMDFormat(time)
      const value = dateMDFormat(time)
      return { key, time, value }
    }, trends?.xAxis)
    const series = map(function(list: Array<string | number>) {
      return map(function(value: string | number) {
        return { value }
      }, list)
    }, trends?.series)
    return Object.assign({
      xAxis,
      series,
    }, omit(['xAxis', 'series'], trends))
  }
}

// 投票
export const getHecoTrendsList = async function(): Promise<HecoTrends> {
  const result: HecoTrends = await API.apy.heco.trends()
  result.trends = transform(result.trends)
  return result
}

// 节点数据
export const getHecoNodeTrends = async function(query: any): Promise<NodeTrends> {
  const result: NodeTrends = await API.apy.heco.nodeTrends(query)
  result.trends = transform(result.trends)
  return result
}

interface Head {
  label: string
  key: string
  sortable?: boolean
  className?: string
  fixed?: string
  width?: string | number
  render?: (data: HecoNode, key: string) => string
}

const render = function(item: HecoNode, key: string): string {
  // @ts-ignore
  const value = item[key]
  let data:any
  switch (key) {
  case 'votes':
  case 'voters':
    data = formatCash(value)
    break
  case 'percent':
  case 'rate':
  case 'user_profit_percent':
    data = `${value}%`
    break
  case 'apy':
    data = `+${value}%`
    break
  default:
    data = value
  }
  return data
}

export const pcHeader: Array<Head> = [
  { label: I18n.apy.heco.head.name, key: 'node_name' },
  { label: I18n.apy.heco.head.region, key: 'area' },
  { label: I18n.apy.heco.head.participants, key: 'voters', sortable: true, render },
  { label: I18n.apy.heco.head.voters, key: 'votes', sortable: true, render },
  { label: I18n.apy.heco.head.percent, key: 'percent', sortable: true, render },
  { label: I18n.apy.heco.head.ratio, key: 'user_profit_percent', sortable: true, render },
  { label: 'APY', key: 'apy', sortable: true, className: 'text-green font-bold text-xl whitespace-nowrap', render},
]

export const mobileHeader: Array<Head> = [
  { label: I18n.apy.heco.head.name, key: 'node_name', fixed: 'left'},
  { label: 'APY', key: 'apy', width: '100px', sortable: true, className: 'text-green font-bold text-xl', render},
  { label: I18n.apy.heco.head.region, key: 'area' },
  { label: I18n.apy.heco.head.participants, key: 'voters', width: '100px', sortable: true, render },
  { label: I18n.apy.heco.head.voters, key: 'votes', width: '100px', sortable: true, render },
  { label: I18n.apy.heco.head.percent, key: 'percent', width: '100px', sortable: true, render },
  { label: I18n.apy.heco.head.ratio, key: 'user_profit_percent', width: '130px', sortable: true, render },
]



export const getTableList = async function(column?: string, sort_type?: string): Promise<HecoNode[]> {
  try {
    const list: HecoNode[] = await API.apy.heco.nodeList({ column, sort_type })
    const db = new DBList(list)
    return db.clone(function(item: HecoNode) {
      return map(function(value: any, key: string) {
        let data:any
        switch (key) {
        case 'votes':
        case 'voters':
        case 'percent':
        case 'rate':
        case 'apy':
          data = toNumber(value)
          break
        default:
          data = value
        }
        return data
      }, item)
    })
  } catch (e) {
    return []
  }
}
