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
const getNewyData=(xdata:Array<number>,ydata:Array<number>,allData:Array<number>)=>{
  const newyData= R.map(t=>{
    if(xdata.includes(t)){
      return ydata[xdata.indexOf(t)]
    }else{
      return null
    }
  },allData)
  return newyData
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
export const getLegendList = (yData: Array<yModel>, kyData: yModel,xData:Array<number>,allData:Array<number>) => {
  // const barIcon='path://M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z'
  // const lineIcon='path://M9.97493 7.79925C9.53216 7.89649 9.00189 8.16452 8.43335 8.83043C7.59177 9.81613 6.69923 10.4073 5.77629 10.639C4.84856 10.8719 4.01415 10.7102 3.34734 10.4174C2.69372 10.1303 2.18594 9.71228 1.85225 9.3866C0.787056 8.34696 0.764768 7.59236 1.53851 6.99563C2.06911 6.58643 2.81695 6.70032 3.21297 7.24907L3.21978 7.25809C3.22865 7.26968 3.2454 7.29111 3.26954 7.32012C3.3182 7.37862 3.39454 7.46512 3.49455 7.56273C3.70115 7.76437 3.97378 7.97915 4.28067 8.11393C4.57437 8.24292 4.88057 8.2922 5.2135 8.20863C5.55123 8.12386 6.03943 7.87132 6.63861 7.16952C7.51083 6.14793 8.48136 5.57223 9.47935 5.35307C10.4626 5.13716 11.3764 5.28796 12.1222 5.55004C12.8648 5.81101 13.4789 6.19498 13.8996 6.50292C14.1126 6.65887 14.2831 6.80056 14.4035 6.90629C14.7816 7.23843 15.3958 8.0556 14.6435 8.86775C14.1845 9.3634 13.4272 9.37899 12.9496 8.90361M12.9475 8.90151L12.9484 8.90242L12.9496 8.90361L12.9346 8.88921C12.919 8.87453 12.8922 8.84968 12.8549 8.81699C12.7802 8.75133 12.6656 8.6557 12.5184 8.54797C12.2187 8.32855 11.8122 8.07969 11.3543 7.91876C10.8994 7.75893 10.4325 7.69878 9.97493 7.79925'
  // if(type==='bar'){
  //   icon='path://M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z'
  // }else{
  //   icon='path://M9.97493 7.79925C9.53216 7.89649 9.00189 8.16452 8.43335 8.83043C7.59177 9.81613 6.69923 10.4073 5.77629 10.639C4.84856 10.8719 4.01415 10.7102 3.34734 10.4174C2.69372 10.1303 2.18594 9.71228 1.85225 9.3866C0.787056 8.34696 0.764768 7.59236 1.53851 6.99563C2.06911 6.58643 2.81695 6.70032 3.21297 7.24907L3.21978 7.25809C3.22865 7.26968 3.2454 7.29111 3.26954 7.32012C3.3182 7.37862 3.39454 7.46512 3.49455 7.56273C3.70115 7.76437 3.97378 7.97915 4.28067 8.11393C4.57437 8.24292 4.88057 8.2922 5.2135 8.20863C5.55123 8.12386 6.03943 7.87132 6.63861 7.16952C7.51083 6.14793 8.48136 5.57223 9.47935 5.35307C10.4626 5.13716 11.3764 5.28796 12.1222 5.55004C12.8648 5.81101 13.4789 6.19498 13.8996 6.50292C14.1126 6.65887 14.2831 6.80056 14.4035 6.90629C14.7816 7.23843 15.3958 8.0556 14.6435 8.86775C14.1845 9.3634 13.4272 9.37899 12.9496 8.90361M12.9475 8.90151L12.9484 8.90242L12.9496 8.90361L12.9346 8.88921C12.919 8.87453 12.8922 8.84968 12.8549 8.81699C12.7802 8.75133 12.6656 8.6557 12.5184 8.54797C12.2187 8.32855 11.8122 8.07969 11.3543 7.91876C10.8994 7.75893 10.4325 7.69878 9.97493 7.79925'
  // }
  const legend = R.map((item: yModel) => {
    // if(type==='bar'){
    //   icon='path://M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z'
    // }else{
    //   icon='path://M9.97493 7.79925C9.53216 7.89649 9.00189 8.16452 8.43335 8.83043C7.59177 9.81613 6.69923 10.4073 5.77629 10.639C4.84856 10.8719 4.01415 10.7102 3.34734 10.4174C2.69372 10.1303 2.18594 9.71228 1.85225 9.3866C0.787056 8.34696 0.764768 7.59236 1.53851 6.99563C2.06911 6.58643 2.81695 6.70032 3.21297 7.24907L3.21978 7.25809C3.22865 7.26968 3.2454 7.29111 3.26954 7.32012C3.3182 7.37862 3.39454 7.46512 3.49455 7.56273C3.70115 7.76437 3.97378 7.97915 4.28067 8.11393C4.57437 8.24292 4.88057 8.2922 5.2135 8.20863C5.55123 8.12386 6.03943 7.87132 6.63861 7.16952C7.51083 6.14793 8.48136 5.57223 9.47935 5.35307C10.4626 5.13716 11.3764 5.28796 12.1222 5.55004C12.8648 5.81101 13.4789 6.19498 13.8996 6.50292C14.1126 6.65887 14.2831 6.80056 14.4035 6.90629C14.7816 7.23843 15.3958 8.0556 14.6435 8.86775C14.1845 9.3634 13.4272 9.37899 12.9496 8.90361M12.9475 8.90151L12.9484 8.90242L12.9496 8.90361L12.9346 8.88921C12.919 8.87453 12.8922 8.84968 12.8549 8.81699C12.7802 8.75133 12.6656 8.6557 12.5184 8.54797C12.2187 8.32855 11.8122 8.07969 11.3543 7.91876C10.8994 7.75893 10.4325 7.69878 9.97493 7.79925'
    // }
   return item.name

  }, yData)
  if (!kyData) return legend
  legend.push(kyData.name)
  return legend
}
const formatYData = (item: any, isKline: boolean,xData:Array<number>,allxData:Array<number>) => {
  let min: any = null
  let max: any = null
  const ydata=getNewyData(xData,item.data,allxData)
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
export const getSeries = (xData: Array<number>,kxData: Array<number>,yData: Array<yModel>, kyData: Array<number>,allxData: Array<number>) => {
  const series = []
  let minM: any = null
  let maxM: any = null
  let kminM: any = null
  let kmaxM: any = null
  R.forEach((item: yModel) => {
    const [obj, min, max] = formatYData(item, false,xData,allxData)
    series.push(obj)
    minM = R.min(min, minM)
    maxM = R.max(max, maxM)
    // alert(this.min)
  }, yData)
  // kline
  if (kyData) {
    const [obj, kmin, kmax] = formatYData(kyData, true,kxData,allxData)
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
