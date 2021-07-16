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
    url: `/api/liquidity/{platId}/token_sidebar/`,
    params: param,
    method: 'get',
  })
}
// 获取side列表
export function getPair_side(param: any) {
  return request({
    url: `/api/liquidity/{platId}/pair_sidebar/`,
    params: param,
    method: 'get',
  })
}
//图表接口
export function getCharts(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_token_usd_chart/`,
    params: param,
    method: 'get',
  })
}
//图表接口token USDT
export function getChartsUsdtById(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_token_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 token 币
export function getChartsCoinById(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_token_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair usd pair
export function getChartsPairUsdById(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_pair_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair usd ETH/USDT
export function getChartsPairUsdByEth(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_pair_symbol10_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin pair
export function getChartsPairCoinById(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_pair_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin ETH
export function getChartsPairCoinByEth(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_pair_symbol0_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin USDT
export function getChartsPairCoinByUSDT(param: any) {
  return request({
    url: `/api/liquidity/{platId}/liquidity_pair_symbol1_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//搜索 token
export function getInfoByToken(param: any) {
  return request({
    url: `/api/liquidity/{platId}/token_search/`,
    params: param,
    method: 'get',
  })
}
//搜索 pair
export function getInfoByPair(param: any) {
  return request({
    url: `/api/liquidity/{platId}/pair_search/`,
    params: param,
    method: 'get',
  })
}
// 交易数据分析-------------------------------
//图表接口token USDT
export function getPayChartsUsdtById(param: any) {
  return request({
    url: `/api/liquidity/{platId}/translate_token_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 token 币
export function getPayChartsCoinById(param: any) {
  return request({
    url: `/api/liquidity/{platId}/translate_token_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair usd Symbol0
export function getPayChartsPairUsdBySymbol0(param: any) {
  return request({
    url: `/api/liquidity/{platId}/translate_pair_symbol0_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair usd Symbol1
export function getPayChartsPairUsdBySymbol1(param: any) {
  return request({
    url: `/api/liquidity/{platId}/translate_pair_symbol1_usd_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin Symbol0
export function getPayChartsPairCoinBySymbol0(param: any) {
  return request({
    url: `/api/liquidity/{platId}/translate_pair_symbol0_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//图表接口 pair coin Symbol1
export function getPayChartsPairCoinBySymbol1(param: any) {
  return request({
    url: `/api/liquidity/{platId}/translate_pair_symbol1_currency_chart_single/`,
    params: param,
    method: 'get',
  })
}
//-------------------------------
//token 价格线
export function getTokenPrice(param:any){
  return request({
    url:`/api/liquidity/{platId}/liquidity_token_price_chart/`,
    params:param,
    method:'get'
  })
}
//pair 价格线
export function getPairPrice(param:any){
  return request({
    url:`/api/liquidity/{platId}/liquidity_pair_price_chart/`,
    params:param,
    method:'get'
  })
}
export function  testCnEn(){
  return request({
    url:`https://820f1515f85f.ngrok.io/api/liquidity/1/liquidity_token_usd_chart_single/?chart_id=1&symbol_id=0xb24f1d5d9c63380e221a36a11171214a9dfd7a99`,
    params:{},
    method:'get'
  })
}
