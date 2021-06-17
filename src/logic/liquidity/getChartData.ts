import * as R from 'ramda'
import {formatDefaultTime, min_max, numberFormat, formatHourTime} from '~/lib/tool'
import {getCharts} from '~/api/liquidity'
interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  unit: string
}
// 将x轴转日期格式 得到x轴
export const getXData = (xData: Array<number>, interval: string) => {
  if (interval === '1d' || interval === '1D') {
    return R.map((item: number) => formatDefaultTime(item), xData)
  } else {
    return R.map((item: number) => formatHourTime(item), xData)
  }
}
// 获取图标
const tooptipsModelByLiquidity = (item: any, index: number, color: string) => {
  const origin = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.35216 5.53165L5.03262 8.17072C4.77853 8.6789 4.25914 8.9999 3.69098 8.9999H1.33333C0.781043 8.9999 0.333328 8.55219 0.333328 7.9999C0.333328 7.44762 0.781043 6.9999 1.33333 6.9999H3.38196L5.53045 2.70293C6.02868 1.70646 7.49773 1.86772 7.76793 2.94854L9.64783 10.4682L10.9674 7.82908C11.2215 7.32091 11.7409 6.9999 12.309 6.9999H14.6667C15.2189 6.9999 15.6667 7.44762 15.6667 7.9999C15.6667 8.55219 15.2189 8.9999 14.6667 8.9999H12.618L10.4695 13.2969C9.9713 14.2934 8.50226 14.1321 8.23206 13.0513L6.35216 5.53165Z" fill="${color}"/>
      </svg>`
  const svg = `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(origin)),
  )}`

  return `<p style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;" class='flex items-center'><img style="margin-bottom:1.5px" src='${svg}' style="width:16px;height:auto;"/><span class="ml-1">${item}</span> </p>`
}
// 获取提示文字的每一行
export const tooltipsTitle = (title: string) =>
  `<p style="font-size:12px;color:#272C33;line-height:1;margin:0;">${title}</p>`
// 得到lengend
export const getLegendList = (yData: Array<yModel>, kyData: yModel) => {
  const legend = R.map((item: yModel) => item.name, yData)
  if (!kyData) return legend
  legend.push(kyData.name)
  return legend
}
const formatYData = (item: any, isKline: boolean) => {
  let min: any = null
  let max: any = null
  const ydata = item.data // [0:1,1:2,2:4]
  // const idxMap = R.addIndex(R.map);
  const seriesData = R.map((v) => {
    [min, max] = min_max(min, max, v)
    return {
      value: v,
      orginValue: numberFormat(v),
      formatValue: numberFormat(v) + (item.unit?item.unit:'无'),
      // color: item.color
    }
  }, ydata)
  const area = {
    normal: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#'+item.color },
          { offset: 1, color: '#'+item.color },
        ],
        globalCoord: false,
      },
      opacity: 0.1,
    },
  }
  // let that = this;
  return [
    {
      name: item.name,
      type: item.type === 'bar' ? 'bar' : 'line',
      symbol: 'none',
      barGap: '0%',
      barCategoryGap: '35%',
      areaStyle: item.type === 'area' ? area : null,
      yAxisIndex: isKline ? 1 : 0,
      connectNulls: true,
      smooth: true,
      itemStyle: {
        color(p: any) {
          return p.value < 0 && item.type === 'bar'
            ? 'rgba(255, 140, 128, 1)'
            : '#'+item.color
        },
        // emphasis: {
        //   shadowBlur: 10,
        //   shadowOffsetX: 0,
        //   shadowColor: "rgba(0, 0, 0, 0.5)"
        // }
      },
      lineStyle: {
        width: 1.5,
      },
      color: '#'+item.color,
      data: seriesData,
    },
    min,
    max,
  ]
}
// 得到series
export const getSeries = (yData: Array<yModel>, kyData: Array<number>) => {
  const series = []
  let minM: any = null
  let maxM: any = null
  let kminM: any = null
  let kmaxM: any = null
  R.forEach((item: yModel) => {
    const [obj, min, max] = formatYData(item, false)
    series.push(obj)
    minM = R.min(min, minM)
    maxM = R.max(max, maxM)
    // alert(this.min)
  }, yData)
  // kline
  if (kyData) {
    const [obj, kmin, kmax] = formatYData(kyData, true)
    series.push(obj)
    kminM = kmin
    kmaxM = kmax
  }
  return [minM, maxM, kminM, kmaxM, series]
}

export const yLabelFormat = (v: any) => numberFormat(v)
// 提示文字
export const getModel = (params: any) => {
  // 水印 遮盖有问题   需要改改改
  if (!params[0]) return
  const title = params[0].axisValue
  // @ts-ignore
  params = R.sortBy((item) => -item.data.value, params)
  const result = R.map(({ seriesName, data, seriesIndex: idx, color }) => {
    const { formatValue } = data
    return tooptipsModelByLiquidity(`${seriesName} ${formatValue}`, idx, color)
  }, params)
  return `${tooltipsTitle(title)} ${R.join('', result)}`
}
//得到所有的charts
export const getChartsFun=async (param:any)=>{
  const result=await getCharts(param)
  return result
}
