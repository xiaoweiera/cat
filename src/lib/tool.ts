// @ts-ignore
import dayjs from 'dayjs'
import * as R from 'ramda'
import { ElMessage } from 'element-plus'
import message from '~/utils/message'
import I18n from '~/utils/i18n/index'

export const numberFormat = (value: any) => {
  if (!value && value !== 0 && value !== '0') {
    return null
  }
  const k = 10000
  const sizes = ['', '万', '亿', '万亿']
  if (value < k) {
    return Math.round(value * 100) / 100
  }
  const i: number = Math.floor(Math.log(value) / Math.log(k))
  const values = parseFloat((value / Math.pow(k, i)).toFixed(2))
  const unit = sizes[i]
  return values + unit
}
export const toFixedNumber = (value: any, rounded = 2) => {
  if (!value && value != 0) {
    return ''
  }
  const vil = Math.pow(10, rounded)
  return Math.round(value * vil) / vil
}
export const percent2Precision = (value: any): String => {
  if (!value && value !== 0) {
    return ''
  }
  return `${toFixedNumber(value)}%`
}
// 数字正负判断
export const numColor = (value: any) => {
  if (!value) {
    return '-'
  } else if (value >= 0) {
    return `+${toFixedNumber(value, 2)}`
  } else {
    return toFixedNumber(value, 2)
  }
}

export const formatTimeMD = (date: string) =>
  dayjs(parseInt(`${date}000`)).format('MM/DD')
export const formatTimeHour = (date: string) =>
  dayjs(parseInt(`${date}000`)).format('M/DD HH:mm')

export const tooptipsModel = (
  item: any,
  color: any,
  value: any,
  unit: string,
) => {
  const origin = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.35216 5.53165L5.03262 8.17072C4.77853 8.6789 4.25914 8.9999 3.69098 8.9999H1.33333C0.781043 8.9999 0.333328 8.55219 0.333328 7.9999C0.333328 7.44762 0.781043 6.9999 1.33333 6.9999H3.38196L5.53045 2.70293C6.02868 1.70646 7.49773 1.86772 7.76793 2.94854L9.64783 10.4682L10.9674 7.82908C11.2215 7.32091 11.7409 6.9999 12.309 6.9999H14.6667C15.2189 6.9999 15.6667 7.44762 15.6667 7.9999C15.6667 8.55219 15.2189 8.9999 14.6667 8.9999H12.618L10.4695 13.2969C9.9713 14.2934 8.50226 14.1321 8.23206 13.0513L6.35216 5.53165Z" fill="${color}"/>
      </svg>`
  const svg = `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(origin)),
  )}`
  const info =
    unit === '$' ? `${item} ${unit}${value}` : `${item}  ${value}${unit}`

  return `<span style="display:flex;
    align-items: center;"><p style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;display:flex;
    align-items: center;"><img style="margin-bottom:1.5px;width:16px;height:auto;margin-right:5px;" src='${svg}'/> ${info}</p></span>`
}

// 时间转化为时间戳
export function dataToTimestamp(time: string) {
  return dayjs(time).valueOf() / 1000
}
// 得到天颗粒度的时间
export const formatDefaultTime = (date: number) => {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    return dayjs().format('YYYY-MM-DD')
  }
}
// 得到小时颗粒度的时间
export const formatHourTime = (date: number) => {
  if (date) {
    return dayjs(date).format('MM/DD HH:mm')
  } else {
    return dayjs().format('MM/DD HH:mm')
  }
}
// 得到对应时间的时间戳  如 前7天 前30天
export const getagoTimeStamp = (day: number) => {
  return dataToTimestamp(dayjs().subtract(day, 'days').format('YYYY-MM-DD'))
}
export const min_max = (min: any, max: any, v: any) => {
  if (v === null) {
    return [min, max]
  }
  if (min === null || min > v) {
    min = v
  }
  if (max === null || max < v) {
    max = v
  }
  return [min, max]
}

export const messageError = function (message: any): void {
  if (typeof message === 'string') {
    ElMessage.warning(message)
  } else {
    const values = R.values(message)
    const [text]: Array<string> = R.flatten(values)
    if (text) {
      ElMessage.warning(text)
    } else {
      ElMessage.warning(message)
    }
  }
}

export const messageSuccess = function (text: string): void {
  ElMessage({
    message: text,
    type: 'success',
    showClose: false,
    customClass: 'message-tips',
  })
}

// copy
export const copyTxt = (text: string, alert?: boolean) => {
  const dom = document.createElement('input')
  dom.setAttribute('value', text)
  document.body.appendChild(dom)
  dom.select()
  document.execCommand('copy')
  document.body.removeChild(dom)
  if (alert) {
    // messageSuccess(I18n.common.message.copy)
    message.copy({
      value: I18n.common.message.copyAlert,
      desc: text,
    })
  }
}
// 更改路由参数
export const changeRoute = (
  route: any,
  router: any,
  paramName: string,
  paramValue: string,
) => {
  const query = { ...route.query }
  query[paramName] = paramValue
  router.replace({
    ...route,
    query: { ...query },
  })
}
// 省略token
export const smallToken = (tokenId: string) => {
  if (!tokenId) return
  return `${tokenId.slice(0, 6)}...${tokenId.slice(
    tokenId.length - 4,
    tokenId.length,
  )}`
}
