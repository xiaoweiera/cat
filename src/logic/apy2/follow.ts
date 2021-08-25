/**
 * @file 关注
 * @author svon.me@gmail.com
 */

import * as API from '~/api/index'

export const setFollow = function(query: object) {
  return API.apy.common.setFollow(query as any)
}

export const symbolList = function(query: object) {
  return API.apy.common.symbolList(query)
}
