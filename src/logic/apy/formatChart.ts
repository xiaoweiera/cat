import { tableConfig } from '~/logic/apy/config'
import { numberFormat, tooptipsModel } from '~/lib/tool'
import { projectItem } from '~/logic/apy/chartFormatTool'

export interface chartModel {
  code: number
  data: projectItem[]
}
export interface timeModel {
  chain: string
  keyword1: string
  keyword2: string
  category: string
  from_ts: string
  to_ts: string
}
// 时间选择后得到新的数据
export const getTimeData = async(
  requestData: Function,
  param: timeModel,
  tableIndex: number,
  chartIndex: number,
  selected: string,
) => {
  const requstData = await requestData(param)
  const data = tableConfig[tableIndex].charts[chartIndex].chartData(
    requstData.data,
    selected,
  )
  // @ts-ignore
  return tableConfig[tableIndex].charts[chartIndex].xyData(data)
}
export const getXY_data = (
  requestChartData: chartModel,
  tableIndex: number,
  chartIndex: number,
  selected: string,
) => {
  const { data = [] } = requestChartData
  const result = tableConfig[tableIndex].charts[chartIndex].chartData(
    data as any,
    selected,
  )
  // @ts-ignore
  return tableConfig[tableIndex].charts[chartIndex].xyData(result)
}
export const getUnit = (
  tableIndex: number,
  chartIndex: number,
  selected: string,
) => {
  if (selected === '平均APY') {
    return '%'
  }
  return tableConfig[tableIndex].charts[chartIndex].unit
}
interface chartTipModel {
  formatValue: string
  value: number
}
interface chartTipData {
  data: chartTipModel
}
const orderByDesc = (data: any) => {
  return data.sort((oldObj: chartTipData, newObj: chartTipData) => {
    return newObj.data.value - oldObj.data.value
  })
}
export const getSerise = (yData: any) => {
  if (!yData) {
    return
  }
  return yData.map((item: any) => {
    return {
      name: item.name,
      type: 'line',
      symbol: 'none',
      barCategoryGap: '35%',
      connectNulls: true,
      smooth: true,
      // @ts-ignore
      lineStyle: { width: 1 },
      data: item.yData,
    }
  })
}
export const getLengent = (yData: any) => {
  if (!yData) {
    return
  }
  return yData.map((item: any) => item.name)
}
export const getModel = (params: any, unit: string) => {
  if (!params[0]) {
    return
  }
  params = orderByDesc(params)
  const title = params[0].axisValue
  const time = `<div>${title}</div>`
  // todo
  // result 无返回值，怎么能使用 join
  const result = params.forEach((result: any) => {
    const { seriesName, data, color } = result
    const { value, formatValue } = data
    if (value) {
      return tooptipsModel(seriesName, color, formatValue, unit)
    }
  })
  return time + result.join('')
}
// @ts-ignore
export const yLabelFormat = (num: any) => numberFormat(num, true)

export const getPlat = (
  chartData: any,
  tableIndex: number,
  chartIndex: number,
) => tableConfig[tableIndex].charts[chartIndex].platData(chartData)
