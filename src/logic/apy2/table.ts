/**
 * @file 表格数据
 */

import { omit } from "ramda"
import { forEach, uuid } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import DBList from '@fengqiaogang/dblist'
import * as API from '~/api/index'
import { SymbolType } from '~/logic/apy2/interface'

const transform = function(db: DBList, list: any[], pid: string = '0') {
  let maxLength = 0
  forEach(function(row: any) {
    if (maxLength < row.max_length) {
      maxLength = row.max_length
    }
    const data = omit(['table_data', 'max_length'], row)
    const id = uuid()
    safeSet(data, 'uuid', id)
    safeSet(data, 'pid', pid)
    safeSet(data, 'expand', false)
    db.insert(data)
    forEach(function(item: any) {
      safeSet(item, 'pid', id)
      safeSet(item, 'uuid', uuid(`${id} - ${Math.random()}`))
      // 特别处理，设置 apy 数据类型
      safeSet(item, SymbolType.name, SymbolType.Apy)
      db.insert(item)
    }, row.table_data)
  }, list)
  return { db, maxLength }
}

export const getTableList = async function(db: DBList, page: number) {
  const result = await API.apy.table.getList<any>({ page })
  return transform(db, result)
}


export const getTableExpandList = async function (db: DBList, uuid: string) {
  const data = db.selectOne<any>({ uuid })
  if (data) {
    const { symbol_alias } = data
    const list = await API.apy.table.getExpandList<any>({ symbol_alias })
    const result = transform(db, list, uuid)
    forEach(function(item: any) {
      if (item[SymbolType.name] !== SymbolType.Apy) {
        db.update(item, {
          [SymbolType.name]: SymbolType.Child
        })
      }
    }, db.select({ pid: uuid }))
    return result
  }
  return { db }
}
