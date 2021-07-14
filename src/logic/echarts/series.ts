/**
 * @file 数据转换
 * @author svon.me@gmail.com
 */

import DBList from '@fengqiaogang/dblist'
import { flatten, pick, omit } from 'ramda'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import {
  sort,
  map,
  forEach,
  dateTime,
  dateMDFormat,
  dateYMDFormat,
  dateYMDHFormat,
  dateYMDHmFormat,
  isNumber,
  max,
  min,
  dateAdd,
  convertInterval
} from '~/utils/index'

import { XAxisItem, SeriesItem, SeriesMap } from './interface'

interface Trend {
  [key: string]: number[][]
}

const makeDateKey = function(date: any, interval?: string): string {
  const { type } = convertInterval(interval)
  // 按小时
  if (type === 'h') {
    return dateYMDHFormat(date)
  }
  // 按分钟
  if (type === 'm') {
    return dateYMDHmFormat(date)
  }
  // 按天生成时间
  return dateYMDFormat(date)
}

const add = function(...args: number[] | number[][]): number {
  const data: number[] = flatten(args)
  let value: number
  for(let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    if (isNumber(item) && item >= 0) {
      // @ts-ignore
      if (isNumber(value)) {
        // @ts-ignore
        value = value + item
      } else {
        value = item
      }
    }
  }
  // @ts-ignore
  return max(value, data)
}

// 求最小值
const subtract = function(...args: number[] | number[][]): number {
  const data: number[] = flatten(args)
  return min(data)
}

// -------------
/**
 * @file 处理图例数据
 */
export const calcLegends = function<T>(legends: T[], detail: {[key: string]: object}): T[] {
  const primaryKey = 'id'
  const db = new DBList([], primaryKey)
  forEach(function(item: any) {
    db.insert(item)
  }, detail)

  return map(function(item: any) {
    if (!item.name) {
      const data = db.selectOne<any>(pick([primaryKey], item))
      if (data) {
        item.name = data.title
      }
    }
    if (!item.type) {
      const data = db.selectOne<any>(pick([primaryKey], item))
      if (data) {
        item.type = data.type
      }
    }
    return item
  }, legends)
}

export const getInterval = function(detail: {[key: string]: object}): string {
  const keys = Object.keys(detail)
  let value = ''
  for(const key of keys) {
    const item = safeGet<object>(detail, key)
    const interval = safeGet<string>(item, 'interval')
    if (interval) {
      value = interval
      break
    }
  }
  return value
}


// 转换时间格式数据
export const calcDates = function(trends: {[key: string]: Trend}, interval?: string): XAxisItem[] {
  const db = new DBList([], 'key')
  // 整合数据
  forEach(function(list: number[][], id: string) {
    forEach(function(item: number[]) {
      const time = dateTime(item[0])
      const where: any = { key: makeDateKey(time, interval) }
      const data: XAxisItem = { time, value: dateMDFormat(time) }
      if (db.selectOne(where)) {
        db.update(where, data)
      } else {
        db.insert(Object.assign({}, where, data))
      }
    }, list)
  }, trends)

  const times = db.clone<number>((item: any) => {
    return item.time
  })
  // 最大时间 (结束时间)
  const maxTime = dateAdd(max(times), interval)
  // 最小时间 (开始时间)
  let intervalTime = min(times)

  do {
    const key = makeDateKey(intervalTime, interval)
    const where: any = { key }
    // 判断数据是否存在
    const item = db.selectOne<XAxisItem>(where)
    if (!item) {
      const value: XAxisItem = {
        key,
        time: intervalTime,
        value: dateMDFormat(intervalTime),
      }
      db.insert(value)
    }
    intervalTime = dateAdd(intervalTime, interval)
  } while (intervalTime < maxTime)

  // 按时间从小到达排序
  return sort(db.clone<XAxisItem>((item: XAxisItem) => omit(['dbIndex'], item)), 'time')
}

// 计算价格线数据
export const calcSeriesKldata = function(series: SeriesMap, klId: string | number): SeriesItem[] {
  if (klId) {
    const list: SeriesItem[] = safeGet(series, `${klId}`) || []
    const array = map(function(item: SeriesItem) {
      const value = safeGet(item, 'klValue')
      const data = omit(['value', 'klValue'], item)
      return Object.assign({}, data, { value })
    }, list)
    return array
  }
  return []
}

// 计算 series 数据 （不包含右侧价格线）
export const calcSeries = function(legends: any[], xAxis: XAxisItem[], trends: {[key: string]: Trend}, interval?: string): any[] {
  const dbMaps = new Map<string, DBList>()
  const keys = Object.keys(trends)
  const primaryKey = 'key'
  forEach(function(id: string) {
    const db = new DBList([], primaryKey)
    forEach(function(array: number[]) {
      const [date, value, klValue] = [...array]
      const time = dateTime(date)
      const key = makeDateKey(time, interval)
      const item: SeriesItem = { key, time, value, klValue, id }
      db.insert(item)
    }, trends[id])
    dbMaps.set(id, db)
  }, keys)


  const series: SeriesMap = {}
  forEach(function(id: string) {
    // @ts-ignore
    const db: DBList = dbMaps.get(id)
    const array: SeriesItem[] = []
    forEach(function(xaxis: XAxisItem) {
      const where = pick([primaryKey], xaxis)
      const item = db.selectOne<SeriesItem>(where)
      if (item) {
        // @ts-ignore
        const temp: SeriesItem = omit(['dbIndex'], item)
        array.push(temp)
      } else {
        const temp: any = {
          id,
          key: null,
          time: null,
          value: null,
          klValue: null,
        }
        array.push(temp)
      }
    }, xAxis)
    series[id] = array
  }, keys)


  const data = map(function(item: any) {
    const { id, unit } = item
    // 判断是否是价格线
    let list = []
    if (item.kline) {
      list = calcSeriesKldata(series, id)
    } else {
      list = series[id]
    }
    list = map(function(line: any) {
      return Object.assign({}, line, { unit })
    }, list)
    return Object.assign({}, item, { data: list })
  }, legends)

  return data
}


// 计算Y轴数据
export const calcYAxis = function(series: any[], stack?: boolean) {
  const splitNumber = 4

  const array: number[][] = []
  forEach(function(list: any[], j: number) {
    forEach(function(item: any, index: number) {
      safeSet(array, `[${index}][${j}]`, item.value)
    }, list)
  }, series)

  // 是否开启堆积图
  if (stack) {
    const minList = map((item: number[]) => subtract(item), array)
    const maxList = map((item: number[]) => add(item), array)
    const minValue = min(minList)
    const maxValue = max(maxList)
    return {
      min: minValue,
      max: maxValue,
      splitNumber,
      interval: minValue === maxValue ? (maxValue / splitNumber) : ((maxValue - minValue) / splitNumber)
    }
  } else {
    const minValue = min(array)
    const maxValue = max(array)
    return {
      min: minValue,
      max: maxValue,
      splitNumber,
      interval: minValue === maxValue ? (maxValue / splitNumber) : ((maxValue - minValue) / splitNumber)
    }
  }
}
