/**
 * @file 广告位
 * @author svon.me@gmail.com
 */

import request from '~/lib/request'
import safeGet from '@fengqiaogang/safe-get'

/**
 * 精选广告位
 * @param type [4:数据图表-精选推荐, 5: APY ]
 */

const getAdsList = async function<T>(type: string | number): Promise<T[]> {
  const url = '/api/v2/commercial'
  const params = {
    position: type
  }
  try {
    const result = await request.get(url, { params })
    const data = safeGet<T[]>(result, 'data.data')
    return data || []
  } catch (e) {
    // todo
  }
  return []
}
export default getAdsList

