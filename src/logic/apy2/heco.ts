import dayjs from 'dayjs'
import { dateYMDFormat, map } from '~/utils'
import { colors } from '~/logic/echarts/interface'
import { getHecoDetail } from '~/api/apy'

export const echartData = function() {
  const legends = [
    { id: 'd-2', name: '总人数', unit: '人', type: 'bar', color: colors[0] },
    {
      id: 'd-1',
      name: 'APY', // 名称
      unit: '', // 单位
      type: 'line',  // line / bar
      kline: true
    },
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


export const getHecoNodeList = async function() {
  const result = await getHecoDetail()
  const { list = [] } = result
  return map(function(item: any){
    return Object.assign({}, item, {
      expand: false
    })
  }, list)
}
