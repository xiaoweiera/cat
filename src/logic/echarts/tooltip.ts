/**
 * @file tooltip
 * @author svon.me@gmail.com
 */

import { toArray, forEach, isObject, isFunction } from '~/utils/index'
import { FormatterTemplate, FormatterParams } from './interface'
import { makeSvg } from '~/logic/echarts/legend'
import { valueFormatter } from './tool'

type Callback = (template: FormatterTemplate, param: FormatterParams) => string

export const formatter = function(query: any, callback?: Callback) {
  const list: FormatterParams[] = toArray(query)
  const [firstData] : any = list
  let label : string = ''
  if (firstData && isObject(firstData)) {
    label = firstData.name
  }
  if (label) {
    const html: string[] = []
    html.push(`<span class="block text-sm text-global-highTitle">${label}</span>`)
    forEach(function(data: FormatterParams) {
      const name = `<span class="ml-1.5 text-xs text-global-highTitle">${data.seriesName}</span>`
      const value = `<span class="ml-1.5 text-xs text-global-highTitle">${valueFormatter(data.data)}</span>`
      const icon = makeSvg(data.seriesType, data.color)
      let result: string = ''
      if (callback && isFunction(callback)) {
        result = callback({ icon, name, value }, data)
      }
      if (!result) {
        result = `${icon}${name}${value}`
      }
      html.push(`<span class="flex items-center mt-1">${result}</span>`)
    }, list)
    return `<div class="text-xs text-kdFang">${html.join('')}</div>`
  }
  return ''
}
