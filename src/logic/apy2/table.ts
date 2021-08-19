/**
 * @file 表格数据
 */

import { omit } from "ramda"
import { forEach, uuid } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import DBList from '@fengqiaogang/dblist'
import * as API from '~/api/index'

const transform = function(db: DBList, type: string, list: any[]) {
  let maxLength = 0
  forEach(function(row: any) {
    if (maxLength < row.max_length) {
      maxLength = row.max_length
    }
    const data = omit(['table_data', 'max_length'], row)
    const id = uuid()
    safeSet(data, 'uuid', id)
    safeSet(data, 'type', type)
    safeSet(data, 'expand', false)
    db.insert(data)
    forEach(function(item: any) {
      safeSet(item, 'type', 'apy')
      safeSet(item, 'pid', id)
      safeSet(item, 'uuid', uuid())
      db.insert(item)
    }, row.table_data)
  }, list)
  return { db, maxLength }
}

export const getTableList = async function(db: DBList, page: number) {
  const result: any = await API.apy.table.getList({ page })
  return transform(db, 'symbol', result)
}


export const getTableExpandList = async function (db: DBList, pid: string) {
  return db
}
