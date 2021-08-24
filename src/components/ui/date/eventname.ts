/**
 * @file 事件名称
 */

import { Ref } from 'vue'

enum DateEventName {
  value= 'uiDate'
}

export const getDateValue = function(date: Ref<number[][]>) {
  if (date && date.value) {
    const [ times = [] ] = date.value
    const [ from_ts = 0, to_ts = 0 ] = times
    return { from_ts: Math.floor(from_ts / 1000), to_ts: Math.floor(to_ts / 1000) }
  }
  return { from_ts: null, to_ts: null }
}

export default DateEventName
