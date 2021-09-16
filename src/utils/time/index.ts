/**
 * @file 时间处理
 * @author svon.me@gmail.com
 */

import dayjs, { Dayjs } from 'dayjs'
import { is } from 'ramda'

const isNumber = (value: any): boolean => {
  if (is(Number, value)) {
    return true
  }
  return value === 0;
}

export const timeFormat = 'YYYY-MM-DD HH:mm:ss'

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

export const dateTime = function(value?: string | number | Date | Dayjs): number {
  const date = toDate(value)
  return date.valueOf()
}

export const dateNow = function(): number {
  return dateTime()
}


// 计算倒计时 - 天
export const dateDiffDay = function(time: number, now: number = dateTime()): number {
  const duration = now - time
  const number = parseInt((duration / 1000 / 60 / 60 / 24) as any, 10)
  return number
}
// 计算倒计时 - 时
export const dateDiffHour = function(time: number, now: number = dateTime()): number {
  const duration = now - time
  const number = parseInt(((duration / 1000 / 60 / 60) % 24) as any, 10)
  return number
}
// 计算倒计时 - 分
export const dateDiffMinute = function(time: number, now: number = dateTime()): number {
  const duration = now - time
  const number = parseInt(((duration / 1000 / 60) % 60) as any, 10)
  return number
}
// 计算倒计时 - 秒
export const dateDiffSecond = function(time: number, now: number = dateTime()): number {
  const duration = now - time
  const number = parseInt(((duration / 1000) % 60) as any, 10)
  return number
}

export const isBefore = function(oldTime: any): boolean {
  if (oldTime) {
    const old = toDate(oldTime)
    return dayjs(old).isBefore(toDate())
  }
  return true
}

export const isAfter = function(oldTime: any): boolean {
  const before = isBefore(oldTime)
  return !before;
}
