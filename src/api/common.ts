/**
 * @file 公告接口
 * @author svon.me@gmail.com
 */

import { common } from './pathname'
import request from '~/lib/request'
import safeGet from '@fengqiaogang/safe-get'
import { toBoolean } from '~/utils/index'

export const getAreaRestrictStatus = async function() {
  try {
    const result = await request.get(common.ipValidate)
    return result
  } catch (e) {
    return {}
  }
}

// 判断是否是中国区域
export const getChineseAreaSttus = async function() {
  const data = await getAreaRestrictStatus()
  const value = safeGet<boolean>(data, 'chinese')
  return toBoolean(value) ? true : false
}
