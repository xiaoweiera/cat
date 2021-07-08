import dayjs from 'dayjs'
import I18n from '~/utils/i18n/index'
import Store from '~/store/growthpad/store'
import Message from '~/utils/message'
import { max as getMax, min as getMin, dateTime, uuid, timeFormat } from '~/utils/index'

export const TimeStatus = {
  wait: 'wait',
  ing: 'ing',
  closure: 'closure',
}

export const getTimeStatus = function(store: Store): string {
  const today = dateTime()
  // @ts-ignore
  if (store.dashboard?.begin) {
    // @ts-ignore
    const time = dayjs(store.dashboard.begin, timeFormat).valueOf()
    if (time > today) {
      return TimeStatus.wait
    }
  }
  // @ts-ignore
  if (store.dashboard?.end) {
    // @ts-ignore
    const time = dayjs(store.dashboard.end, timeFormat).valueOf()
    if (today > time) {
      return TimeStatus.closure
    }
  }
  return TimeStatus.ing
}

export const makeDescription = function(data: any, token: string): string {
  const max = getMax(data.reward)
  const min = getMin(data.reward)
  // 奖励模版
  const minValue = I18n.template(I18n.growthpad.reward.total, {
    count: min,
    token,
  })
  const maxValue = I18n.template(I18n.growthpad.reward.maxTotal, {
    count: max,
    token,
  })
  if (max === min) {
    return I18n.template(data.description, { reward: `<i>${minValue}</i>` })
  }
  return I18n.template(data.description, {
    reward: `<i>${minValue}，${maxValue}</i>`,
  })
}

export const checkAddress = function(store: Store): boolean {
  const value = store?.info?.bsc
  if (value) {
    return true
  }
  Message.alert(I18n.growthpad.address.warning)
  return false
}

export { getMax, getMin, uuid }
