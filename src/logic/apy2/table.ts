/**
 * @file 表格数据
 */

import { omit } from "ramda"
import { forEach, map } from "~/utils"
import safeSet from '@fengqiaogang/safe-set'
import safeGet from '@fengqiaogang/safe-get'

const transform = function(list: any[]) {
  let maxSize = 0
  forEach(function(item: any) {
    const size = (item.data?.length || 0) + 1
    if (size > maxSize) {
      maxSize = size
    }
  }, list)
  const array: any[] = map(function(item: any) {
    const result = {}
    safeSet(result, '0', omit(['data'], item))
    for(let i = 0; i < maxSize - 1; i++) {
      const key = `${i + 1}`
      const value = safeGet<any>(item, `data[${i}]`)
      safeSet(result, key, value)
    }
    return result
  }, list)
  return {
    list: array,
    rank: maxSize
  }
}

export const getTableList = async function(type: string, ) {
  return transform([
    {
      "symbol_alias": "string",
      "symbol_price": "string",
      "symbol_change": "string",
      "symbol_contract_addr": "string",
      "symbol_logo": "string",
      "data": [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]
    },
    {
      "symbol_alias": "string",
      "symbol_price": "string",
      "symbol_change": "string",
      "symbol_contract_addr": "string",
      "symbol_logo": "string",
      "data": [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]
    },
    {
      "symbol_alias": "string",
      "symbol_price": "string",
      "symbol_change": "string",
      "symbol_contract_addr": "string",
      "symbol_logo": "string",
      "data": [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]
    }
  ])
}
