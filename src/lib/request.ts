/**
 * @file 构造请求对象
 */
import Dao from '~/lib/dao'
import { production as env } from '~/lib/process'

// apy 专用
const service = Dao({ baseURL: env.api })

export default service
