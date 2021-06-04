/**
 * @file 构造请求对象
 */
import Dao from '~/lib/dao'

// const api = 'https://kingdata.com'

const api = import.meta.env.BACKEND_API || 'https://dev.ikingdata.com'
// @ts-ignore
const service = Dao({ baseURL: api })

export default service
