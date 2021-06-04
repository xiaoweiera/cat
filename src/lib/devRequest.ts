/**
 * @file 构造请求对象
 */

import Dao from '~/lib/dao'

const api = 'https://dev.ikingdata.com'

const service = Dao({ baseURL: api })

export default service
