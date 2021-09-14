/**
 * @file 工具集合
 * @author svon.me@gmail.com
 */

import BigNumber from 'bignumber.js'
import I18n from '~/utils/i18n/index'
import { filter, flatten, is, isEmpty as _isEmpty, isNil, sort as _sort, toLower, toUpper, trim } from 'ramda'

//@ts-ignore
import { v1 as uuidV1, v4 as uuidV4, v5 as uuidV5 } from 'uuid'
import dayjs from 'dayjs'
import safeGet from '@fengqiaogang/safe-get'
import * as tools from '~/lib/tool'

export { isNil } from 'ramda'

const defaultNumberValue = '-'

export const sleep = function(callback: () => void, time: number = 1000) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      if (callback && isFunction(callback)) {
        resolve(callback())
      } else {
        resolve(callback)
      }
    }, time)
  })
}

/**
 * 排序
 * @param list 排序的列表数据
 * @param diff 如果数据是集合, 以集合中某一个健值做排序
 * @param reverse 是否倒序, 默认正序
 */
export const sort = function(list: any[], diff?: string, reverse?: boolean) {
  const app = function(value1: any, value2: any) {
    if (diff) {
      if (reverse) {
        return safeGet<number>(value2, diff) - safeGet<number>(value1, diff)
      }
      return safeGet<number>(value1, diff) - safeGet<number>(value2, diff)
    }
    if (reverse) {
      return value2 - value1
    }
    return value1 - value2
  }
  return _sort(app, list)
}

type Callback = (...args: any[]) => void

// 防抖节流
export const debounce = function<T>(callback: Callback, time?: number): T {
  if (!time) {
    return callback as any
  }
  // @ts-ignore
  const self = this
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  let timeout: any
  // @ts-ignore
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // @ts-ignore
      return callback.apply(self, args)
    }, time)
  }
}


export const toBoolean = function(value: any): boolean {
  return !!(value || value === 0);
}

export const toFixed = function (value: string | number = '', fixed = 2): number {
  const text = String(value)
  const [num1 = '0', num2 = ''] = text.split('.')
  let temp = parseFloat(num1)
  if (num2) {
    temp = parseFloat(`${num1}.${num2.slice(0, fixed)}`)
  }
  if (isNaN(temp)) {
    return 0
  }
  return temp
}

export const arrayConcat = function(...args: any[]): any[] {
  return [].concat(...args)
}

export const toArray = arrayConcat


export const toNumber = function (value: string | number = 0, fixed = 2): number {
  const number = parseFloat(value as any)
  if (isNaN(number)) {
    return 0
  }
  return toFixed(number, fixed)
}

export const toNumberCeil = function(value: string | number = 0): number {
  return tools.formatRulesPrice(value, false)
  // return toNumber(number.toFixed(fixed))
}

// 千分位计数
export const toNumberCash = function (value: string | number = 0): string {
  if (value === defaultNumberValue) {
    return value
  }
  const data = `${value}`
  return data.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const valueFormat = function(value: string | number, unit: string = '', prefix: string = ''): string {
  if (isEmpty(value, true) || isNil(value)) {
    return defaultNumberValue
  }
  if (['$', '＄', '¥', '￥'].includes(unit)){
    return `${prefix}${unit}${value}`
  }
  if (['%'].includes(unit)){
    return `${prefix}${value}${unit}`
  }
  return `${prefix}${value} ${unit}`
}

export const toNumberCashFormat = function(value?: any, unit: string = '', prefix: string = ''): string {
  if (isEmpty(value, true)) {
    return defaultNumberValue
  }
  const number = tools.formatRulesNumber(value, false, defaultNumberValue)
  return valueFormat(toNumberCash(number), unit, prefix)
}

export const toNumberFormat = function(value?: any, unit: string = '', prefix: string = ''): string {
  if (isEmpty(value, true) || isNil(value)) {
    return defaultNumberValue
  }
  const number = tools.formatRulesNumber(value, false, defaultNumberValue)
  return valueFormat(number, unit, prefix)
}

export const toInteger = function(value: string | number = 0): number {
  const number = toNumber(value)
  return parseInt(number as any, 10)
}



export const inputBeautify = function(value: string = ''): string {
  // 去掉前后空格
  let text = trim(value) || ''
  // 首字母如果是 @ 符合，则去掉
  text = text.replace(/^@+/i, '')
  return trim(text)
}
// 千分位计数
export const formatCash = function (value: string | number = 0): string {
  const number = toNumberFormat(value)
  if (number === defaultNumberValue) {
    return number
  }
  return toNumberCash(number)
}

// 生成唯一ID
export const uuid = function(value?: any): string {
  function create(): string {
    if (value) {
      const text = JSON.stringify({ value })
      return uuidV5(text, uuidV5.URL)
    }
    if (Math.random() > 0.5) {
      return uuidV1();
    }
    return uuidV4();
  }
  const text = create();
  return text.replace(/-/g, '');
}

export const isHttp = function(value: string): boolean {
  if (value) {
    if (/^http/.test(value)) {
      return true
    }
    if (/^\//.test(value)) {
      return true
    }
    const list = value.split('/')
    if (list.length >= 2) {
      return true
    }
  }
  return false;
}

export const isUndefined = function(value: any, checkUndefined?: boolean): boolean {
  const check = 'undefined'
  if (typeof value === check) {
    return true
  }
  return !!(checkUndefined && value === check);
}

export const isString = (value: any): boolean => is(String, value)

export const isNumber = (value: any): boolean => {
  if (is(Number, value)) {
    return true
  }
  return value === 0;
}

export const isArray = function(value: any): boolean {
  if (Array.isArray(value)) {
    return true
  }
  return is(Array, value)
}
export const isObject = function(value: any): boolean {
  const status = isArray(value)
  if (status) {
    return false
  }
  return is(Object, value)
}

export const isFunction = function(value: any): boolean {
  return is(Function, value)
}

export const isEmpty = function(value: any, checkUndefined?: boolean): boolean {
  const status = isUndefined(value, checkUndefined)
  if (status) {
    return true
  }
  if (_isEmpty(value)) { // 判断 [], '', {}
    return true
  }
  return isNil(value) // 判断 null, undefined
}

export const isElement = function(value: any) {
  if (isEmpty(value) || isString(value) || isNumber(value) || isArray(value)) {
    return false
  }

  if (typeof HTMLElement === 'object') {
    return value instanceof HTMLElement
  }
  let flag = true
  if (typeof value === 'object') {
    flag = true
  }

  if (flag) {
    if (typeof value.nodeName === 'string') {
      return true
    }
    if (value?.navigator) {
      return true
    }
  }
  return false
}

export const forEach = function(callback: any, data: any) {
  if (callback && data) {
    if (isArray(data)) {
      data.forEach(function(value: any, index: number) {
        callback(value, index, data)
      })
    } else {
      const keys = Object.keys(data)
      keys.forEach(function(key: string) {
        // @ts-ignore
        const value = data[key]
        callback(value, key, data)
      })
    }
  }
}

export const map = function(callback: any, data: any): any {
  const isArr = isArray(data)
  const array: any[] = []
  const result: any = {}
  // @ts-ignore
  forEach(function(value: any, index: number | string, origin: T[]) {
    const item = callback(value, index, origin)
    if (isArr) {
      // @ts-ignore
      array[index] = item
    } else {
      result[`${index}`] = item
    }
  }, data)
  return isArr ? array : result
}


// 过滤数组中的空数据
export const compact = function<T>(list: T[], iteration?: (value: T) => boolean): T[] {
  if (list) {
    const app = filter((value: T) => {
      if (iteration) {
        return iteration(value)
      } else {
        const status = !isEmpty(value)
        const boolean = toBoolean(value)
        return boolean && status;
      }
    })
    return app(list)
  }
  return []
}

export const max = function(...args: any[]): number {
  const list = compact(flatten(args), isNumber)
  if (list.length > 0) {
    let value: number = list[0]
    for(const item of list) {
      if (item > value) {
        value = item
      }
    }
    return value
  }
  // @ts-ignore
  return void 0
}

export const min = function(...args: any[]): number {
  const list = compact(flatten(args), isNumber)
  if (list.length > 0) {
    let value: number = list[0]
    for(const item of list) {
      if (item < value) {
        value = item
      }
    }
    return value
  }
  // @ts-ignore
  return void 0
}

// 首字母大写
export const upperFirst = function(value: string): string {
  // 将字符串转换为小写
  const str = toLower(value || '')
  const first = toUpper(str[0] || '')
  const last = str.slice(1)
  return `${first}${last}`
}

/**
 * 不区分大小写比较是否相等
 * @param str1
 * @param str2
 */
export const equalsIgnoreCase = function(str1: string = '', str2: string = ''): boolean {
  if (str1 && str2) {
    return toUpper(`${str1}`) === toUpper(`${str2}`)
  }
  return false
}


export const decimalFormat = function(value: string | number, decimal: string | number): number {
  const pow = Math.pow(10, decimal as number)
  return new BigNumber(value).dividedBy(pow).toNumber()
}

export const numberDecimal = function(value: string | number, decimal: string | number): string {
  const pow = Math.pow(10, decimal as number)
  return new BigNumber(value).multipliedBy(pow).toString(10)
}

export const timeFormat = 'YYYY-MM-DD HH:mm:ss'

export enum DateType {
  week	= 'week',	// 周
  day	= 'day',	// 天
  month	= 'month', // 月份
  year	= 'year',	// 年
  hour	= 'hour', 	// 小时
  minute	= 'minute', 	//分钟
  second	= 'second',	// 秒
  millisecond = 'millisecond',// 毫秒
}

export const toDate = function(time?: any) {
  if (time && isNumber(time)) {
    const str = `${time}`
    if (str.length === 10) {
      return dayjs(time * 1000)
    }
    return dayjs(time)
  }
  if (time) {
    return dayjs(time)
  }
  return dayjs()
}
// 获取时间戳
export const dateTime = function(time?: any): number {
  const date = toDate(time)
  return date.valueOf()
}

// 时间格式化
export const dateFormat = function(time?: any, format: string = timeFormat): string {
  const date = toDate(time)
  return date.format(format)
}
// 格式化（月/日）
export const dateMDFormat = function(time?: any): string {
  return dateFormat(time, 'MM/DD')
}
export const dateYMDFormat = function(time?: any): string {
  return dateFormat(time, 'YYYY/MM/DD')
}
export const dateYMDHFormat = function(time?: any): string {
  return dateFormat(time, 'YYYY/MM/DD HH')
}
export const dateYMDHmFormat = function(time?: any): string {
  return dateFormat(time, 'YYYY/MM/DD HH:mm')
}

// 分解时间间隔
export const convertInterval = function(interval = '1d') {
  const number = toNumber(interval.replace(/[^0-9]/g, ''))
  const type = toLower(interval.replace(/[^a-zA-Z]/g, ''))
  return { number, type }
}

// 日期与当前时间做比较
export const dateDiff = function(time: any, diff: DateType = DateType.day): string {
  const cur = dayjs().format(timeFormat)
  const count = Math.abs(toDate(time).diff(cur, diff))

  if (count > 0 && I18n.common.time.value[diff]) {
    return I18n.part(I18n.common.time.value[diff], count, { count })
  }
  return '1分钟'
}

export const dateAdd = function(time: any, interval?: string) {
  const date = toDate(time)
  const { number, type } = convertInterval(interval)
  return dateTime(date.add(number, type as any).valueOf())
}

// 格式化数字
export const numberUint = function(value: number) {
  return tools.numberUnitFormat(value)
}

