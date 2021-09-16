/**
 * @file 环境变量
 * @author svon.me@gmail.com
 */

import * as config from './config'

interface Env extends config.Config {
}

export const development: Env = config.development

export const production: Env = config.production

export const oss = 'https://res.ikingdata.com'

export const ApiVersion = 'v1'

// 默认线上环境
// let mode: string

// try {
//   // mode = import.meta.env.MODE
//   // @ts-ignore
//   mode = process.env.NODE_ENV
// } catch (e) {
//   mode = 'production'
// }
// export const env: Env = mode === 'production' ? production : development

export const env: Env = production
