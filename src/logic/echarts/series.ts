/**
 * @file 数据转换
 * @author svon.me@gmail.com
 */

import { sort } from 'ramda'
import { forEach, dateTime, dateMDFormat, toNumber, isNumber } from '~/utils/index'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import DBList from '@fengqiaogang/dblist'

interface XAxis {
  value: string | number,
  date: number,
  [key: string]: any
}

interface Trend {
  [key: string]: number[][]
}

interface Series {
  [key: string]: number[]
}

const equal = function(value1: any, value2: any): boolean {
  if (value1 === value2) {
    return true
  }
  return false
}

const toData = function(value: number): any {
  if (isNumber(value)) {
    return {
      value: toNumber(value),
      origin: value
    }
  }
  return {
    value: void 0,
    origin: value
  }
}

// 转换时间格式数据
export const convertDate = function(trends: Trend[], rightYAxis?: number) {

  const series: Series = {}
  const right: number[] = []

  const db = new DBList([], 'date')

  forEach(function(list: number[][], key: string) {
    forEach(function(item: number[], index: number) {
      const date = dateTime(item[0])
      const temp = db.selectOne({ date })
      if (!temp) {
        db.insert({
          date,
          value: dateMDFormat(date)
        })

      }
      const value = safeGet<number>(item, '1')
      safeSet(series, `${key}[${index}]`, toData(value))
      // 添加右侧刻度数据
      if (rightYAxis && equal(`${key}`, `${rightYAxis}`)) {
        right.push(toData(safeGet<number>(item, '2')))
      }
    }, list)
  }, trends)

  const xAxis = db.clone<XAxis>()

  return {
    right: right.length > 0 ? right : null,
    series,
    xAxis: sort(function(item1: XAxis, item2: XAxis) {
      return item2.date - item1.date
    }, xAxis)
  }
}
