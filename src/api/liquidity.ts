// @ts-ignore
import request from '~/lib/service'
// 交易所
export function exchange_list() {
  return request({
    url: '/api/liquidity/exchange_list/',
    method: 'get',
  })
}
// 图表
export function analysis_tool(param: any) {
  return request({
    url: '/api/liquidity/1/analysis_tool/',
    params: param,
    method: 'get',
  })
}
// 获取币信息位
export function getToken_side(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/token_sidebar/`,
    params: param,
    method: 'get',
  })
}
// 获取side列表
export function getPair_side(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/pair_sidebar/`,
    params: param,
    method: 'get',
  })
}
