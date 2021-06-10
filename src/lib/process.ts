/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

interface Env {
  api: string
}

export const development: Env = {
  // api: 'https://dev.ikingdata.com',
  api: 'https://ikingdata.com',
}

export const production: Env = {
  api: 'https://kingdata.com',
}

// 默认线上环境
let mode = 'production'

try {
  // mode = import.meta.env.MODE
  // @ts-ignore
  mode = process.env.NODE_ENV
} catch (e) {
  mode = 'production'
}

console.log('mode = %s', mode)

export const env: Env = mode === 'production' ? production : development
