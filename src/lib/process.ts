/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import * as config from './config'

interface Env {
  api: string
}

export const development: Env = {
  api: config.development.api,
}

export const production: Env = {
  api: config.production.api,
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

export const oss = 'https://res.ikingdata.com'

export const env: Env = mode === 'production' ? production : development
