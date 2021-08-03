/**
 * @file 日期组件
 * @author svon.me@gmail.com
 */

import dayjs from 'dayjs'
import { dateNow, dateTime } from '~/utils/time'
import { dateFormat } from '~/utils'

// 去掉小时以后的时间，只保留到天
export const formatResult = function(times: any[]): Array<number | string> {
  const [start, end] = times
  const array: Array<number | string> = []
  if (start) {
    const value = dateFormat(start, 'YYYY/MM/DD')
    array.push(dateTime(value))
  } else {
    array.push('')
  }

  if (end) {
    array.push(dateTime(end))
  } else {
    array.push('')
  }
  return array
}

export const disabledDate = (function(){
  const today = dateNow()
  // 判断日期是否是当前时间之后
  return function(date: any) {
    // @ts-ignore
    return dayjs(date).isAfter(today, 'day')
  }
})()

export const shortcuts = {
  '7': {
    label: '近7天',
    value: function() {
      const today = dateNow()
      const start = dayjs(today).subtract(7, 'day')
      return [start, today]
    }
  },
  '30': {
    label: '近1月',
    value: function() {
      const today = dateNow()
      const start = dayjs(today).subtract(1, 'month')
      return [start, today]
    }
  },
  '90': {
    label: '近3月',
    value: function() {
      const today = dateNow()
      const start = dayjs(today).subtract(3, 'month')
      return [start, today]
    }
  },
  '180': {
    label: '近半年',
    value: function() {
      const today = dateNow()
      const start = dayjs(today).subtract(6, 'month')
      return [start, today]
    }
  },
  '365': {
    label: '近1年',
    value: function() {
      const today = dateNow()
      const start = dayjs(today).subtract(1, 'year')
      return [start, today]
    }
  },
  'all': {
    label: 'All',
    value: function() {
      const today = dateNow()
      return ['', today]
    }
  }
}
