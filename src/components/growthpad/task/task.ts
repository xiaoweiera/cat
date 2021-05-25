import dayjs from 'dayjs'
import I18n from '~/utils/i18n/index'
import Store from '~/store/growthpad/store'
import Message from '~/utils/message'

export const TimeStatus = {
  wait: 'wait',
  ing: 'ing',
  closure: 'closure',
}

export const getTimeStatus = function(store: Store): string {
  const format = 'YYYY-MM-DD HH:mm:ss'
  const today = dayjs().valueOf()
  // @ts-ignore
  if (store.dashboard?.begin) {
    // @ts-ignore
    const time = dayjs(store.dashboard.begin, format).valueOf()
    if (time > today) {
      return TimeStatus.wait
    }
  }
  // @ts-ignore
  if (store.dashboard?.end) {
    // @ts-ignore
    const time = dayjs(store.dashboard.end, format).valueOf()
    if (time > today) {
      return TimeStatus.ing
    }
  }
  return TimeStatus.closure
}

export const uuid = function(): string {
  return String(Math.random())
}

export const getMax = function(array: number[]): number {
  const value = [].concat(array as any)
  if (value.length > 0) {
    return Math.max.apply(null, value)
  }
  return 0
}
export const getMin = function(array: number[]): number {
  const value = [].concat(array as any)
  if (value.length > 0) {
    return Math.min.apply(null, value)
  }
  return 0
}

export const makeDescription = function(data: any): string {
  const max = getMax(data.reward)
  const min = getMin(data.reward)
  // 奖励模版
  const minValue = I18n.template('奖励 {count} MDX', { count: min })
  const maxValue = I18n.template('最多可得 {count} MDX', { count: max })
  if (max === min) {
    return I18n.template(data.description, { reward: `<i>${minValue}</i>` })
  }
  return I18n.template(data.description, {
    reward: `<i>${minValue}，${maxValue}</i>`,
  })
}

export const checkAddress = function(store: Store): boolean {
  const value = store?.user?.bsc_token
  if (value) {
    return true
  }
  Message.alert('请先完成信息登记')
  return false
}
