/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

export interface Config {
  domain: string,
  api: string,
  dashboard: string
}

export const domain = 'https://kingdata.com'

export const iconFont = [
  // apy
  '//at.alicdn.com/t/font_2735019_3b8ymdhnwn4.js',
  // 行情&流动性呀
  '//at.alicdn.com/t/font_2596648_yr82ex0wlja.js',
  // 通用
  '//at.alicdn.com/t/font_2596380_azt16c8xius.js'
]

export const development: Config = {
  domain: 'ikingdata.com',
  // api: 'https://kingdata.com',
  api: 'https://dev.ikingdata.com',
  // api: 'https://4b678cd825dd.ngrok.io',
  dashboard: 'https://preview.ikingdata.com/'
}
export const production: Config = {
  domain: 'kingdata.com',
  api: 'https://kingdata.com',
  dashboard: 'https://kingdata.com'
  // api: 'https://4b678cd825dd.ngrok.io',
  // api: 'https://dev.ikingdata.com',
}

