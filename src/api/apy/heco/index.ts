/**
 * @file APY heco 接口
 * @author svon.me@gmail.com
 */

import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

enum API {
  trends = '/api/apy/heco/ninja/heco_trends',
  nodeList = '/api/apy/heco/ninja/node_list',
  nodeTrends = '/api/apy/heco/ninja/node_trends'
}

// 图表接口
export const trends = function() {
  const result = request.get(API.trends)
  return asyncCheck<any>(result)
}
interface ListQuery {
  column?: string;
  sort_type?: string
}
// 节点列表
export const nodeList = function(query: ListQuery) {
  const result = request.get(API.nodeList, { params: query })
  return asyncCheck<any>(result)
}

interface NodeQuery {
  column: string;
  node_name: string
}
// 节点图表数据
export const nodeTrends = function(query: NodeQuery) {
  const result = request.get(API.nodeTrends, { params: query })
  return asyncCheck<any>(result)
}
