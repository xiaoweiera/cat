/**
 * @file 时间处理
 * @author svon.me@gmail.com
 */

import dayjs from 'dayjs'

export const dataNow = function(): number {
  return dayjs().valueOf()
}

// 计算倒计时 - 天
export const dateDiffDay = function(time: number, now: number = dataNow()): string {
  const duration = time - now
  const number = parseInt((duration / 1000 / 60 / 60 / 24) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 计算倒计时 - 时
export const dateDiffHour = function(time: number, now: number = dataNow()): string {
  const duration = time - now
  const number = parseInt(((duration / 1000 / 60 / 60) % 24) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 计算倒计时 - 分
export const dateDiffMinute = function(time: number, now: number = dataNow()): string {
  const duration = time - now
  const number = parseInt(((duration / 1000 / 60) % 60) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 计算倒计时 - 秒
export const dateDiffSecond = function(time: number, now: number = dataNow()): string {
  const duration = time - now
  const number = parseInt(((duration / 1000) % 60) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
