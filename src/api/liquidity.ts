// @ts-ignore
import request from '~/lib/request'
// 交易所
export function exchange_list() {
  return request({
    url: '/api/liquidity/exchange_list',
    method: 'get',
  })
}
// 图表
export function analysis_tool(param: any) {
  return request({
    url: '/api/liquidity/1/analysis_tool',
    params: param,
    method: 'get',
  })
}