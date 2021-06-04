/**
 * @file 判断活动状态
 * @author svon.me@gmail.com
 */

import dayjs from 'dayjs'
import Message from '~/utils/message'
import Store from '~/store/growthpad/store'

const format = 'YYYY-MM-DD HH:mm:ss'

const activity = function(store: Store): boolean {
  const today = dayjs().valueOf()
  let beginFlag = false
  let endFlag = false
  // @ts-ignore
  const begin: string = store?.dashboard?.begin
  if (begin) {
    const time = dayjs(begin, format).valueOf()
    // 当前时间是否是活动开始之后
    // @ts-ignore
    if (today >= time) {
      beginFlag = true
    }
  } else {
    beginFlag = true
  }
  // @ts-ignore
  const end: string = store?.dashboard?.end
  if (end) {
    const time = dayjs(end, format).valueOf()
    // 当前时间是否是活动结束时间之前
    // @ts-ignore
    if (today <= time) {
      endFlag = true
    }
  } else {
    endFlag = true
  }
  if (beginFlag && endFlag) {
    return true
  }
  if (!beginFlag) {
    Message.alert('活动未开始')
  } else if (!endFlag) {
    Message.alert('活动已结束')
  }
  return false
}

export default activity
