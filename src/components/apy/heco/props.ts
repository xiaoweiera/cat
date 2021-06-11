/**
 * @file heco
 * @author svon.me@gmail.com
 */

export interface TD {
  label: string
  key: string
}

export const header: TD[] = [
  { label: '节点名称', key: 'node_name' },
  { label: '所在地区', key: 'country_name_en' },
  { label: '得票数', key: 'vote_count' },
  { label: '得票占比', key: 'vote_percent' },
  { label: '收益分成比例', key: 'rate' },
  { label: 'APY', key: 'apy' },
]
