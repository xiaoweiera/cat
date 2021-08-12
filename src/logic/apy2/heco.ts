import dayjs from 'dayjs'
import { dateYMDFormat } from '~/utils'

export const echartData = function() {
  const legends = [
    {
      id: 'd-1',
      name: '投票总数', // 名称
      unit: '', // 单位
      type: 'line',  // line / bar
    },
    { id: 'd-2', name: '总人数', unit: '人', type: 'bar', kline: true, },
  ]
  const xAxis: string[] = []
  const today = dayjs()
  for(let i = 90; i > 0; i--) {
    const date = today.subtract(i, 'd')
    const value = dateYMDFormat(date)
    xAxis.push(value)
  }
  const randomSeriesValue = function() {
    const array: Array<any> = []
    for(let i = 1; i <= 90; i++) {
      const value = parseInt(Math.random() * 100 as any)
      array.push({ value: value + i })
    }
    return array
  }

  const series = {
    'd-1': randomSeriesValue(),
    'd-2': randomSeriesValue(),
  }
  return {
    legends,
    xAxis,
    series
  }
}
