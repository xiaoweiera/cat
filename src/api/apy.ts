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
export function getChartByMoney(query: any) {
  return request({
    url: '/api/apy/summary_chart/',
    method: 'get',
    params: query,
  })
}
// 获取媒体列表
export const getMediaList = async function<T>(): Promise<T[]> {
  const url = '/api/v2/commercial'
  const params = {
    position: 5,
  }
  try {
    const result = await request({ url, params, method: 'get' })
    const data = result?.data?.data
    if (data) {
      return data as T[]
    }
  }
  catch (e) {
    // todo
  }
  return []
}
