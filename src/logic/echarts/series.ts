/**
 * @file 数据转换
 * @author svon.me@gmail.com
 */

import { flatten, pick } from 'ramda'
import DBList from '@fengqiaogang/dblist'
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
  toNumber,
  isNumber,
  max,
  min,
  dateAdd,
  convertInterval
} from '~/utils/index'
import { toRaw } from 'vue'

interface XAxis {
  value: string | number,
  date: number,
  [key: string]: any
}

interface Detail {
  interval: string
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

// 转换时间格式数据
export const convertDate = function(trends: {[key: string]: Trend}, details?: { [key: string]: Detail }, rightYAxis?: number) {
  // @ts-ignore
  const interval = safeGet<string>(details, '[0].interval')
  const db = new DBList([], 'key')
  // 整合数据
  forEach(function(list: number[][], id: string) {
    forEach(function(item: number[]) {
      const time = dateTime(item[0])
      const value = safeGet<number>(item, '1')
      const where: any = { key: makeDateKey(time, interval) }
      const data: any = { time, [id]: value }
      if (rightYAxis && equal(`${id}`, `${rightYAxis}`)) {
        data['right'] = safeGet<number>(item, '2')
      }
      if (db.selectOne(where)) {
        db.update(where, data)
      } else {
        db.insert(Object.assign({}, where, data))
      }
    }, list)
  }, trends)

  const times = db.clone((item: any) => item.time)
  const maxTime = dateAdd(max(times), interval)
  let intervalTime = min(times)

  const xAxis: XAxis[] = []
  const right: number[] = []
  const series: Series = {}
  const trendsKeys = Object.keys(trends)
  let index: number = 0
  do {
    const key = makeDateKey(intervalTime, interval)
    const where: any = { key }
    // 判断数据是否存在
    const item = db.selectOne<any>(where)
    // series 数据集合
    forEach(function(id: string) {
      safeSet(series, `${id}[${index}]`, toData(safeGet<number>(item, `${id}`)))
    }, trendsKeys)
    // 右侧数据集合
    safeSet(right, `[${index}]`, toData(safeGet<number>(item, 'right')))

    xAxis.push({
      date: intervalTime,
      value: dateMDFormat(intervalTime)
    })

    intervalTime = dateAdd(intervalTime, interval)
    index++
  } while (intervalTime < maxTime)

  return { right, series, xAxis }

}

interface EchartOption {
  yAxis: any[],
  series: any[],
  legend: any,
  [key: string]: any
}

const getYAxisIncludes = function(yaxis: any[]) {
  return function(name: string) {
    let status = false
    for(let i = 0, len = yaxis.length; i < len; i++) {
      const item = yaxis[i]
      if (item.position === 'right' && item.legend && item.legend.includes(name)) {
        status = true
        break
      }
    }
    return status
  }
}

const add = function(...args: number[]): number {
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
  return value
}

const subtract = function(...args: number[]): number {
  const data: number[] = flatten(args)
  let value: number
  for(let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    if (isNumber(item) && item < 0) {
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
  return value
}

// 计算 series 数据的最大值与最小值用作Y轴的刻度
const getSeriesNumber = function(list: any[]): number[] {
  let array: any = []
  forEach(function(series: any, idx: number) {
    forEach(function(item: any, index: number) {
      let num: number
      if (isNumber(item)) {
        num = item
      } else {
        num = item.value
      }
      safeSet(array, `[${idx}][${index}]`, num)
    }, series.data)
  }, list)

  let length = 0
  forEach(function(data: number[]) {
    if (data.length > length) {
      length = data.length
    }
  }, array)

  const minArr: number[] = []
  const maxArr: number[] = []

  const stack = safeGet<boolean>(list, '[0].stack')

  for(let i = 0, len = length; i < len; i++) {
    const arr = map((data: number[]) => data[i], array)
    if (stack) {
      minArr[i] = subtract(arr)
      maxArr[i] = add(arr)
    } else {
      minArr.push(...arr)
      maxArr.push(...arr)
    }
  }

  return [min(minArr), max(maxArr)]
}


// 计算 Y 轴刻度
export const calcYAxisMark = function(option: EchartOption): EchartOption {
  const legend = safeGet<string[]>(option, 'legend.data')
  const yaxis = safeGet<any[]>(option, 'yAxis')
  const series = safeGet<any[]>(option, 'series')
  const left: any[] = []
  const right: any[] = []
  const app = getYAxisIncludes(yaxis)
  forEach(function(name: string, index: number) {
    if (app(name)) {
      right.push(series[index])
    } else {
      left.push(series[index])
    }
  }, legend)

  const db = new DBList(yaxis, 'position')
  const updateYAxis = function(position: string, list: any[]) {
    const splitNumber = 4
    const [num1, num2] = getSeriesNumber(list)
    db.update({ position }, {
      min: num2 === num1 ? 0 : num1,
      max: num2,
      splitNumber,
      interval: num2 === num1 ? (num2 / splitNumber) : ((num2 - num1) / splitNumber)
    })
  }

  if (left.length > 0) {
    updateYAxis('left', left)
  }
  if (right.length > 0) {
    updateYAxis('right', right)
  }
  option.yAxis = db.clone()
  return option
}


// -------------
/**
 * @file 处理图例数据
 */
export const calcLegends = function<T>(legends: T[], detail: {[key: string]: object}): T[] {
  const primaryKey = 'id'
  const nameKey = 'name'
  const db = new DBList([], primaryKey)
  // @ts-ignore
  forEach((item: T) => db.insert(toRaw(item)), legends)

  forEach(function(item: T){
    const where = pick([primaryKey], item)
    const temp = db.selectOne<T>(where)
    if (!safeGet<string>(temp, nameKey)) {
      db.update(where, {
        name: safeGet<string>(item, nameKey)
      })
    }
  }, detail)
  return db.clone<T>()
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
export const calcDates = function(trends: {[key: string]: Trend}, interval?: string) {
  const db = new DBList([], 'key')
  // 整合数据
  forEach(function(list: number[][], id: string) {
    forEach(function(item: number[]) {
      const time = dateTime(item[0])
      const where: any = { key: makeDateKey(time, interval) }
      const data: any = { time, value: dateMDFormat(time) }
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
    const item = db.selectOne<any>(where)
    if (!item) {
      db.insert({
        key,
        time: intervalTime,
        value: dateMDFormat(intervalTime),
      })
    }
    intervalTime = dateAdd(intervalTime, interval)
  } while (intervalTime < maxTime)

  return sort(db.clone(), 'time')
}
