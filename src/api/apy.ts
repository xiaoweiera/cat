// @ts-ignore
import request from '~/lib/request'

// table header
export function getColumns(query: any) {
  return request({
    url: '/api/apy/columns/',
    method: 'get',
    params: query,
  })
}

export function getDataset(query: any) {
  return request({
    url: '/api/apy/dataset/',
    method: 'get',
    params: query,
  })
}
export function getChart(query: any) {
  return request({
    url: '/api/apy/apy_charts/',
    method: 'get',
    params: query,
  })
}
export function getChartByMoney(query:any){
  return request({
    url: '/api/apy/summary_chart/',
    method: 'get',
    params: query,
  })
}

