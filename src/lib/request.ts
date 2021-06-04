/**
 * @file 构造请求对象
 */
import Dao from '~/lib/dao'
import { env } from '~/lib/process'

const service = Dao({ baseURL: env.api })

export default service
