// @ts-ignore
// import request from '~/lib/service'
import request from '~/lib/request'
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
//图表接口，demo
export function getCharts(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_token_usd_chart/`,
    params: param,
    method: 'get',
  })
}
//图表接口token USDT
export function getChartsUsdtById(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_token_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 token 币
export function getChartsCoinById(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_token_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair usd pair
export function getChartsPairUsdById(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_pair_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair usd ETH/USDT
export function getChartsPairUsdByEth(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_pair_symbol10_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin pair
export function getChartsPairCoinById(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_pair_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin ETH
export function getChartsPairCoinByEth(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_pair_symbol0_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin ETH
export function getChartsPairCoinByUSDT(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/liquidity_pair_symbol1_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//搜索 token
export function getInfoByToken(param: any) {
  return request({
    url: `/api/liquidity/${param.platId}/token_search/`,
    params: param,
    method: 'get',
  })
}
