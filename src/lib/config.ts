/**
 * @file 配置信息
 * @author svon.me@gmail.com
 */

interface Config {
  domain: string,
  api: string,
}

export const iconFont = [
  // 行情&流动性呀
  '//at.alicdn.com/t/font_2596648_4rk4tya1d5q.js',
  // 通用
  '//at.alicdn.com/t/font_2596380_g9x84j0fpj.js'
]

export const development: Config = {
  domain: 'ikingdata.com',
  api: 'https://dev.ikingdata.com',
  // api: 'https://4b678cd825dd.ngrok.io',
}
export const production: Config = {
  domain: 'kingdata.com',
  api: 'https://kingdata.com',
  // api: 'https://4b678cd825dd.ngrok.io',
  // api: 'https://dev.ikingdata.com',
}

