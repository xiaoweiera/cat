/**
 * @file 表格显示逻辑
 * @author svon.me@gmail.com
 */

import DBList from '@fengqiaogang/dblist'
import safeGet from '@fengqiaogang/safe-get'

const getSelectKey = function(options: any): string {
  const primary = 'key'
  // @ts-ignore
  const list = safeGet<any[]>(options, 'data')
  const db = new DBList(list, primary)

  const keys = ['apy', 'single_and_mine_award', 'compound_and_mine_award']
  // 默认 apy
  let value = keys[0]
  for(let i = 0, len = keys.length; i < len; i++) {
    const name = keys[i]
    const where: any = {}
    where[primary] = name
    const item: any = db.selectOne(where)
    if (item && item.status) {
      value = name
      break
    }
  }
  return value
}

// @ts-ignore
export const isShow = function(data: any[], options: any): boolean {
  let status = false
  if (data) {
    const primary = 'key'
    // @ts-ignore
    const db = new DBList(data, primary)
    const where: any = { }
    where[primary] = getSelectKey(options)
    const item: any = db.selectOne(where)
    if (item && item.value) {
      for(let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        if (item && item.value) {
          status = true
          break
        }
      }
    }
  }
  return status
}
