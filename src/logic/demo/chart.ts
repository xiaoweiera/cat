import { reactive } from 'vue'
import { LegendItem, XAxisItem, SeriesItem, seriesType } from '~/logic/echarts/interface'
import { toArray, uuid } from '~/utils'

export const makeSeriesItem = function(value: number | string): SeriesItem {
  return { value }
}

const randomSeriesValue = function() {
  const array: Array<string | number> = []
  for (let i = 0; i < 12; i++) {
    const value = parseInt(Math.random() * 100 as any)
    array.push(value)
  }
  return JSON.stringify(array)
}

interface EchartData {
  // 图例
  legends: LegendItem[],
  // 横轴数据
  xAxis: XAxisItem[],
  // 数据
  series: string[]
}

export const onRemoveLegend = function(echartData: EchartData, index: number) {
  const legends = toArray(echartData.legends)
  const series = toArray(echartData.series)

  legends.splice(index, 1)
  series.splice(index, 1)

  echartData.legends = toArray(legends)
  echartData.series = toArray(series)
}

export const onAddLegend = function(echartData: EchartData) {
  const legends = toArray(echartData.legends)
  const series = toArray(echartData.series)

  legends.push({
    name: '名称',
    unit: '',
    show: true,
    type: seriesType.line,
    id: uuid()
  })

  series.push([])

  echartData.legends = toArray(legends)
  echartData.series = toArray(series)
}

export const createEchartData = function() {
  return reactive<EchartData>({
    legends: [
      {
        name: '蒸发量',
        unit: 'ml',
        show: true,
        type: seriesType.line,
        id: uuid()
      },
      {
        name: '降水量',
        unit: 'ml',
        show: true,
        type: seriesType.line,
        id: uuid()
      },
      {
        name: '平均温度',
        unit: '°C',
        show: true,
        type: seriesType.line,
        id: uuid()
      }
    ],
    xAxis: [
      { value: '1月' },
      { value: '2月' },
      { value: '3月' },
      { value: '4月' },
      { value: '5月' },
      { value: '6月' },
      { value: '7月' },
      { value: '8月' },
      { value: '9月' },
      { value: '10月' },
      { value: '11月' },
      { value: '12月' }
    ],
    series: [
      randomSeriesValue(),
      randomSeriesValue(),
      randomSeriesValue(),
    ]
  })
}
