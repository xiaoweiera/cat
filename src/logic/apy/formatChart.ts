// @ts-ignore
import { numberFormat, tooptipsModel,toopTipsContainer,getMaxWidth } from '~/lib/tool'
// @ts-ignore
import { tableConfig } from '~/logic/apy/config'
import I18n from '~/utils/i18n/index'

export interface chartModel {
  code: number
  data: object
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
  // @ts-ignore
  const data = tableConfig[tableIndex].charts[chartIndex].chartData(
    requestChartData.data as any,
    selected,
  )
  // @ts-ignore
  return tableConfig[tableIndex].charts[chartIndex].xyData(data)
}
export const getUnit = (
  tableIndex: number,
  chartIndex: number,
  selected: string,
) => {
  if (selected === I18n.apy.apyName.avgApy || selected === 'APY') {
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
export const getModel = (params: any, unit: string,) => {
  if (!params[0]) {
    return
  }
  params = orderByDesc(params)
  const title = params[0].axisValue
  const time = `<div>${title}</div>`
  // @ts-ignore
  // eslint-disable-next-line array-callback-return
  const result = params.map(({ seriesName, data, seriesIndex: idx, color }) => {
    const { value, formatValue } = data
    if (value) {
      return tooptipsModel(seriesName, color, formatValue, unit,false,0)
    }
  })
  return time + result.join('')
}
export const getBigModel = (params: any, unit: string,) => {
  if (!params[0]) {
    return
  }
  params = orderByDesc(params)
  const title = params[0].axisValue
  const maxWidth=getMaxWidth(params)

  const time = `<div>${title}</div>`
  // @ts-ignore
  // eslint-disable-next-line array-callback-return
  const result = params.map(({ seriesName, data, seriesIndex: idx, color }) => {
    const { value, formatValue } = data
    if (value) {
      return tooptipsModel(seriesName, color, formatValue, unit,true,2*maxWidth+50)
    }
  })
  return time + toopTipsContainer(result,true)
}
// @ts-ignore
export const yLabelFormat = (num: any) => numberFormat(num, true)
// @ts-ignore
export const getPlat = (
  chartData: any,
  tableIndex: number,
  chartIndex: number,
) => tableConfig[tableIndex].charts[chartIndex].platData(chartData)
