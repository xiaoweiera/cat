/**
 * @file tooltip
 * @author svon.me@gmail.com
 */


import { toArray, forEach } from '~/utils/index'
import { SeriesItem, seriesType } from './interface'
import safeGet from '@fengqiaogang/safe-get'
import { makeSvg } from '~/logic/echarts/legend'
import { valueFormatter } from './tool'

interface Params {
  // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
  value: number
  // 数据图形的颜色
  color: string
  // 传入的原始数据项
  data: SeriesItem
  // 数据展示类型
  seriesType: seriesType
  // x 轴几点名称
  axisValue: string
  // 数据名称（图例名称）
  seriesName: string
}

export const formatter = function(query: any) {
  const list: Params[] = toArray(query)
  const title = safeGet(list, '[0].axisValue')
  if (title) {
    const html: string[] = []
    html.push(`<span class="block text-gray-500">${title}</span>`)
    forEach(function(data: Params) {
      const name = `<span class="ml-1.5 text-xs text-gray-500">${data.seriesName}</span>`
      const value = `<span class="ml-1.5 text-xs text-gray-500">${valueFormatter(data.data)}</span>`
      const icon = makeSvg(data.seriesType, data.color)
      const code = `<span class="flex items-center mt-1">${icon}${name}${value}</span>`
      html.push(code)
    }, list)
    return `<div class="text-xs text-kdFang">${html.join('')}</div>`
  }
  console.log(title, query)
  return ''
}
