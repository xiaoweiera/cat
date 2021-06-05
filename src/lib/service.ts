/**
 * @file 构造请求对象
 */

import Dao from '~/lib/dao'
// 根据环境变量设置接口地址
import { env } from '~/lib/process'

const service = Dao({ baseURL: env.api })

export default service
