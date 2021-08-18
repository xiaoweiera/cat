/**
 * @file APY heco 接口
 * @author svon.me@gmail.com
 */

import request from '~/lib/service'

enum API {
  trends = '/api/apy/heco/ninja/heco_trends'
}

// 图表接口
export const trends = function() {
  return request.get(API.trends)
}
