/**
 * @file 存储在 Ali OSS 上的图标
 * @author svon.me@gmail.com
 */

import { oss } from '~/lib/process'
import { isHttp } from '~/utils'

const statusRight = 'status-right' // 右侧箭头

// 保存在 Ali OSS 中的图标
const ossList: string[] = [
  statusRight,
  '24', // 24.svg
  'apy', // apy.svg
  'arrow', // arrow.svg, arrow.png
  'arrow_ok', // arrow_ok.svg
  'calendar', // calendar.svg
  'channels', // channels.svg
  'close', // close.svg
  'coinwind', // coinwind.jpg
  'copy', // copy.svg
  'defi', // defi.svg
  'defi_flow', // defi_flow.svg
  'down', // down.svg
  'github', // github.svg
  'growthPad', // growthPad.svg
  'help', // help.svg
  'inter', // inter.svg
  'kingdata', // kingdata.png
  'lang', // lang.png
  'loading', // loading.jpg
  'mdx', // mdx.png
  'mobile', // mobile.svg
  'more', // more.svg
  'nav-more', // nav-more.svg
  'navigation', // navigation.svg
  'new', // new.svg
  'plus', // plus.svg
  'remove', // remove.svg
  'report', // report.svg
  'sina', // sina.svg
  'success', // success.svg
  'table', // table.svg
  'telegram', // telegram.svg
  'top1', // top1.svg
  'trend', // trend.svg
  'twitter-white', // twitter-white.svg
  'twitter', // twitter.svg
  'union', // union.svg
  'up', // up.svg
  'user', // user.svg
  'vector', // vector.svg
]

const getLink = function(value: string, suffix: string = 'svg'): string | undefined {
  if (isHttp(value) || value.includes('.')) {
    return value
  }
  // 特殊 icon
  if (value === 'down' && suffix === 'png') {
    return 'https://res.ikingdata.com/nav/down.png'
  }
  if (value === statusRight) {
    return `${oss}/nav/statusRight.png`
  }
  if (ossList.includes(value)) {
    return `${oss}/icon/${value}.${suffix}`
  }
  return void 0
}

export { ossList, getLink }
