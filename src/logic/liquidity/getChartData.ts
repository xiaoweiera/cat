

import * as R from 'ramda'
import {formatDefaultTime, min_max,formatRulesNumber, formatHourTime,unitOrder,numberUnitFormat} from '~/lib/tool'
import {getCharts} from '~/api/liquidity'
import {pairStore, symbolStore} from '~/store/liquidity/state'
import {yAxisModel,yKAxisModel} from '~/logic/liquidity/chartConfig'
interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  group:number
  unit: string
  suffix:string
}
//根据后端配置显示什么后缀
const getUnitData=(item:yModel,coinType:string)=>{
  // suffix：symbol0, symbol1, token, null
  if(!item.suffix) return item.name
  if(item.suffix==='token' && !pairStore.id) return `${item.name}(${symbolStore.name})`
  if(item.suffix==='symbol0' && pairStore.id) return `${item.name}(${pairStore.name.split('/')[0]})`
  if(item.suffix==='symbol1' && pairStore.id) return `${item.name}(${pairStore.name.split('/')[1]})`
  return item.name
}
// 将x轴转日期格式 得到x轴
export const getXData = (xData: Array<number>, interval: string) => {
  if (interval === '1d' || interval === '1D') {
    return R.map((item: number) => formatDefaultTime(item,'MM/DD'), xData)
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

  return `<div style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;line-height: 12px;" class='mt-2 md:mt-0 w-50 md:w-full flex items-center break-words whitespace-pre-wrap'><img style="margin-bottom:1.5px" src='${svg}' style="width:16px;height:auto;"/><div class="ml-1">${item}</div> </div>`
}
// 获取提示文字的每一行
export const tooltipsTitle = (title: string) => `<p style="font-size:12px;color:#272C33;line-height:1;margin:0;">${title}</p>`
// export const getLegendList = (yData: Array<yModel>, kyData: yModel,coinType:string) => {
//   const barIcon='path://M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z'
//   const lineIcon='path://M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z'
//   //@ts-ignore
//   let legend=[]
//   //拆分成3个为一组的legend，这样每一行会居中
//   const splitYdata=R.splitEvery(3,yData)
//   console.log(splitYdata,splitYdata.length,'splitspli t')
//   console.log(splitYdata[splitYdata.length-1].length)
//   splitYdata.forEach((obj:any,index:number)=>{
//     let data:Array<object>=[]
//     obj.forEach((item: yModel,i:number) => {
//       data.push({icon:item.type==='bar'?barIcon:lineIcon,name:getUnitData(item.name,coinType)})
//     })
//     legend.push({index:index,data:data})
//   })
//   //@ts-ignore
//   if (!kyData) return legend
//   //判断最后一行是不是3个，如果是3个则换行，如果不是，那么价格线添加进去
//   if(splitYdata[splitYdata.length-1].length<3){
//     legend[splitYdata.length-1].data.push({icon:lineIcon,name:kyData.name})
//   }else{
//     legend.push({index:splitYdata.length,data:[{icon:lineIcon,name:kyData.name}]})
//   }
//   return legend
// }
// 得到lengend
export const getLegendList = (yData: Array<yModel>, kyData: yModel,coinType:string) => {
  const barIcon='path://M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z'
  const lineIcon='path://M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z'
  //@ts-ignore
  let legend=[]
  //拆分成3个为一组的legend，这样每一行会居中
  yData.forEach((item: yModel,i:number) => {
    legend.push({icon:item.type==='bar'?barIcon:lineIcon,name:getUnitData(item,coinType)})
    })
  //@ts-ignore
  if (!kyData) return legend
  legend.push({icon:lineIcon,name:kyData.name})
  return legend
}
const formatYData = (item: any,i:number, isKline: boolean,xData:Array<number>,allxData:Array<number>,interval:string,pairId:string,coinType:string) => {
  let min: any = null
  let max: any = null
  const ydata=getNewyData(xData,item.data,allxData)
  const unit=pairId?'':item.unit
  const seriesData = R.map((v) => {
    [min, max] = min_max(min, max, v)
    // const unit=''
    return {
      value: v,
      orginValue: formatRulesNumber(v,true),//万 亿 约汉字
      formatValue:pairId?'1:'+unitOrder(v,unit):unitOrder(v,unit),
      interval:interval
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
  return [
    {
      name: getUnitData(item,coinType),
      type: item.type === 'bar' ? 'bar' : 'line',
      symbol: 'none',
      barGap: '0%',
      barCategoryGap: '35%',
      areaStyle: item.type === 'area' ? area : null,
      yAxisIndex: i,
      // connectNulls: true,//为空的时候是否连接起来
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
export const yLabelFormat = (v: any) => formatRulesNumber(v,false)
export const ykLabelFormat = (v: any) => numberUnitFormat(v)
//getSeries 根据group后端自定义组合y轴
export const getGroupSeries = (xData: Array<number>,kxData: Array<number>,yData: Array<yModel>, kyData: Array<number>,allxData: Array<number>,interval:string,pairId:string,coinType:string) => {
  const series = []
  const allYAxis=[]
  const groupList={}
  //根据group分组
  yData.forEach((item:yModel,i:number)=>{
    const groupNumber=item.group?item.group:0
    //@ts-ignore
    if(!R.keys(groupList).includes(groupNumber.toString())){
      //@ts-ignore
      groupList[groupNumber]=[item]
    }else{
      //@ts-ignore
      groupList[groupNumber].push(item)
    }
  })
  for(let i=0;i<R.keys(groupList).length;i++){
    let minM: any = null
    let maxM: any = null
    //@ts-ignore
    groupList[R.keys(groupList)[i]].forEach((item:yModel,n:number)=>{
      //如果给的分组大于y轴的配置数量那么默认走第一个y轴配置，即0
      const groupIndex=item.group>=R.keys(groupList).length?0:item.group
      const [obj, min, max] = formatYData(item, groupIndex,false,xData,allxData,interval,'',coinType)
      minM = R.min(min, minM)
      maxM = R.max(max, maxM)
      series.push(obj)
    })
    //group索引为0的为主轴，不用i的原因防止后端配的时候0不是第一个
    const isShow=R.keys(groupList)[i]==='0'?true:false
    allYAxis.push(yAxisModel(minM,maxM,isShow,yLabelFormat))
  }
  // // kline
  if (kyData) {
    const [obj, kmin, kmax] = formatYData(kyData,R.keys(groupList).length, true,kxData,allxData,interval,pairId,coinType)
    //pair没有价格线美元单位
    const unit=pairId?'':'$'
    const isShow=!kmax?false:(kmax<0.01?false:true)
    allYAxis.push(yKAxisModel(kmin,kmax,isShow,ykLabelFormat,unit))
    series.push(obj)
  }
  return [series,allYAxis]
}
// 提示文字
export const getModel = (params: any,xData:any) => {
  // 水印 遮盖有问题   需要改改改
  if (!params[0]) return
  let title = params[0].axisValue
  // @ts-ignore
  // params = R.sortBy((item) => -item.data.value, params)
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

