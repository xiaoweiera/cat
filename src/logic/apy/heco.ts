/**
 * @file heco
 * @author svon.me@gmail.com
 */

import { formatCash, toNumber } from '~/utils/index'

export interface TD {
  label: string
  key: string
  [key: string]: any
}

export const header: TD[] = [
  { label: '节点名称', key: 'node_name' },
  { label: '所在地区', key: 'country_name_cn' },
  { label: '得票数', key: 'vote_count' },
  { label: '得票占比', key: 'vote_percent' },
  { label: '收益分成比例', key: 'rate' },
  { label: 'APY', key: 'apy', className: 'apy-count' },
]
export const mobileHeader: TD[] = [
  { label: '节点名称', key: 'node_name', fixed: true },
  { label: 'APY', key: 'apy', className: 'apy-count' },
  { label: '所在地区', key: 'country_name_cn' },
  { label: '得票数', key: 'vote_count' },
  { label: '得票占比', key: 'vote_percent' },
  { label: '收益分成比例', key: 'rate' },
]

export const transform = function (list: any[]) {
  const array: any[] = []
  for (let i = 0, size = list.length; i < size; i++) {
    const data = Object.assign({}, list[i])
    for (let k = 0, len = header.length; k < len; k++) {
      const item: TD = header[k]
      // 得票数
      if (item.key === 'vote_count') {
        const number = toNumber(data[item.key])
        data[item.key] = formatCash(number)
      } else if (item.key === 'vote_percent') {
        const number = toNumber(data[item.key])
        data[item.key] = `${number}%`
      } else if (item.key === 'rate') {
        const number = toNumber(data[item.key])
        data[item.key] = `${number}%`
      } else if (item.key === 'apy') {
        const number = toNumber(data[item.key])
        data[item.key] = `${number}%`
      }
    }
    array.push(data)
  }
  return array
}
