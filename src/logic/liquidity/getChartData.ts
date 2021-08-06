

import * as R from 'ramda'
import {formatDefaultTime, min_max,formatRulesNumber, formatHourTime,unitOrder,numberUnitFormat} from '~/lib/tool'
import {getCharts} from '~/api/liquidity'
import {pairStore, symbolStore} from '~/store/liquidity/state'
import {yAxisModel,yKAxisModel} from '~/logic/liquidity/chartConfig'
// import {opacityLine} from '~/logic/liquidity/dataCofig'
interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  group:number
  unit: string
  suffix:string
  show:boolean | string
  gray_button:boolean
}
//是否隐藏线,返回透明度
const isOpacityLine=(item:yModel)=>{
  return ((item.show || item.show==='' || item.show===undefined) && item.show!=='false')
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
//价格线根据后端配置显示什么后缀
const getUnitPriceData=(item:yModel)=>{
  // suffix：symbol0, symbol1, token, null
  if(!item.suffix) return item.name
  if(item.suffix==='token') return `${item.name}(${symbolStore.name})`
  if(item.suffix==='symbol0') return `${item.name}(${pairStore.name.split('/')[0]})`
  if(item.suffix==='symbol1') return `${item.name}(${pairStore.name.split('/')[1]})`
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
interface tipModel{
  value:Number
  orginValue:Number
  formatValue:String
  type:String
  interval:String
}
// 获取图标
const tooptipsModelByLiquidity = (item: any, index: number, color: string,data:tipModel) => {
  let svgType=''
  if(data.type==='bar') {
    svgType = `<svg t="1626927627838"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="16" height="16"><path d="M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z" fill="${color}" p-id="1457"></path></svg>`
  }else{
    svgType = `<svg t="1626927627838"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="16" height="16"><path d="M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z" fill="${color}" p-id="1457"></path></svg>`
  }
  const svg = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(svgType)),
  )}`

  return `<div style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;line-height: 12px;" class='mt-2 md:mt-0 w-50 md:w-full flex items-center break-words whitespace-pre-wrap'><img style="margin-bottom:1.5px" src='${svg}' style="width:16px;height:auto;"/><div class="ml-1">${item}</div> </div>`
}
// 获取提示文字的每一行
export const tooltipsTitle = (title: string) => `<p style="font-size:12px;color:#272C33;line-height:1;margin:0;">${title}</p>`
// 得到lengend
export const getLegendList = (yData: Array<yModel>, kyData: yModel,coinType:string) => {
  const barIcon='path://M853.312 85.312c-47.104 0-85.312 38.208-85.312 85.376v682.624a85.312 85.312 0 1 0 170.688 0V170.688c0-47.168-38.208-85.376-85.376-85.376zM426.688 426.688a85.312 85.312 0 1 1 170.624 0v426.624a85.312 85.312 0 1 1-170.624 0V426.688zM85.312 597.312a85.312 85.312 0 0 1 170.688 0v256a85.312 85.312 0 1 1-170.688 0v-256z'
  const lineIcon='path://M406.528 354.048L322.048 522.88A96 96 0 0 1 236.288 576H85.312a64 64 0 1 1 0-128h131.136L353.92 172.992c31.936-63.744 125.952-53.44 143.232 15.744l120.32 481.28 84.48-168.96A96 96 0 0 1 787.712 448h150.912a64 64 0 1 1 0 128h-131.136l-137.472 275.008c-31.936 63.744-125.952 53.44-143.232-15.744l-120.32-481.28z'
  //@ts-ignore
  let legend=[]
  let selected={}
  yData = R.sortBy((item) => item.group, yData)
  yData.forEach((item: yModel,i:number) => {
    if(isOpacityLine(item)){
      legend.push({icon:item.type==='bar'?barIcon:lineIcon,name:getUnitData(item,coinType)})
      if(item.gray_button) {
        //@ts-ignore
        selected[getUnitData(item, coinType)] = false
      }
    }
    })
  //@ts-ignore
  if (!kyData) return legend
  if(isOpacityLine(kyData)){
    legend.push({icon:lineIcon,name:getUnitPriceData(kyData)})
    if(kyData.gray_button) {
      //@ts-ignore
      selected[getUnitPriceData(kyData)] = false
    }
  }

  return [legend,selected]
}
const formatYData = (item: any,i:number, isKline: boolean,xData:Array<number>,allxData:Array<number>,interval:string,pairId:string,coinType:string) => {
  let min: any = null
  let max: any = null
  const ydata=getNewyData(xData,item.data,allxData)
  const unit=pairId?item.unit:item.unit
  const seriesData = ydata.map((v,i) => {
    [min, max] = min_max(min, max, v)
    // const unit=''
    return {
      value: v,
      time:allxData[i],
      orginValue: formatRulesNumber(v,true),//万 亿 约汉字
      formatValue:pairId?unitOrder(v,unit):unitOrder(v,unit),
      type:item.type,
      interval:interval
      // color: item.color
    }
  })
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
      name:isKline?getUnitPriceData(item): getUnitData(item,coinType),
      type: item.type === 'bar' ? 'bar' : 'line',
      symbol: 'none',
      barGap: '0%',
      barCategoryGap: '35%',
      areaStyle: item.type === 'area' ? area : null,
      yAxisIndex: i,
      // connectNulls: true,//为空的时候是否连接起来
      // smooth: true,
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
        opacity:isOpacityLine(item)?1:0,
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
export const getGroupSeries = (xData: Array<number>,kxData: Array<number>,yData: Array<yModel>, kyData: Array<number>,allxData: Array<number>,interval:string,pairId:string,coinType:string,selectIndex:number) => {
  const series = []
  const allYAxis=[]
  const groupList={}
  yData = R.sortBy((item) => item.group, yData)
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
    const unit=pairId?'$':'$'
    const isShow=!kmax?false:(kmax<0.01?false:true)
    allYAxis.push(yKAxisModel(kmin,kmax,isShow,ykLabelFormat,unit))
    series.push(obj)
  }
  return [series,allYAxis]
}
export const getXAreaColorList=(xData:Array<string>,selectIndex:number,full:boolean)=>{
  if(!selectIndex) return null
  const colorList=xData.map((item,i)=>{
    if(((i===selectIndex) || (selectIndex===-1 && i===xData.length-1) ) && full){
      return 'rgba(76, 159, 254, 0.1)'
    }else{
      return ''
    }
  })
  return colorList
}
// 提示文字
export const getModel = (params: any,xData:any) => {
  // 水印 遮盖有问题   需要改改改
  if (!params[0]) return
  let title = params[0].axisValue
  // params = R.sortBy((item) => -item.data.value, params)
  // @ts-ignore
  const result = R.map(({ seriesName, data, seriesIndex: idx, color }) => {
    const { formatValue } = data
    return tooptipsModelByLiquidity(`${seriesName} ${formatValue}`, idx, color,data)
  }, params)
  return `${tooltipsTitle(title)} ${R.join('', result)}`
}
//得到所有的charts
export const getChartsFun=async (param:any)=>{
  const result=await getCharts(param)
  return result
}
