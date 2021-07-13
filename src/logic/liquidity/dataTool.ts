import * as R from 'ramda'
import {ref,reactive} from 'vue'
import {getChartsUsdtById,getChartsCoinById,getChartsPairUsdById,getChartsPairUsdByEth,getChartsPairCoinById,getChartsPairCoinByEth,getChartsPairCoinByUSDT,getTokenPrice,getPairPrice,getPayChartsUsdtById,getPayChartsCoinById,getPayChartsPairUsdBySymbol0,getPayChartsPairUsdBySymbol1,getPayChartsPairCoinBySymbol0,getPayChartsPairCoinBySymbol1} from '~/api/liquidity'
import {analysisType,pairStore,priceData} from '~/store/liquidity/state'
interface chartItem {
  data: Object
}
interface yaxisModel {
  color:String
  data:Number[]
  group:Number
  name:String
  type:String
  nuit:String
}
// 复制方法
export const copyToken = (tokenAddress: string) => {
  tokenAddress=tokenAddress
  const dom = document.createElement('input')
  dom.setAttribute('value', tokenAddress)
  document.body.appendChild(dom)
  dom.select()
  document.execCommand('copy')
  document.body.removeChild(dom)
}
//初始化5个图表
export const initCharts=(chartsAllData:any,chartIds:Array<number>)=>{
  // const chartIds=[0]
  R.map(id=>chartsAllData.value[id] = reactive<any>({}),chartIds)
}
//flow 流动性
export const getChartsPairUsdByPair=async (param:any,tokenType:string)=>{
  if(tokenType==='pair'){
    return await getChartsPairUsdById(param)
  }else if(tokenType==='symbol0'){
    return await getChartsPairUsdByEth(param)
  }else {
    return await getChartsPairUsdByEth(param)
  }
}
// flow 流动性pair
export const getChartsPairCoinByPair=async (param:any,tokenType:string)=>{
  if(tokenType==='pair'){
    return await getChartsPairCoinById(param)
  }else if(tokenType==='symbol0'){
    return await getChartsPairCoinByEth(param)
  }else {
    return await getChartsPairCoinByUSDT(param)
  }
}
//pay 交易数据分析
export const getPayChartsPairUsdByPair=async (param:any,tokenType:string)=>{
  if(tokenType==='symbol0'){
    return await getPayChartsPairUsdBySymbol0(param)
  }else {
    return await getPayChartsPairUsdBySymbol1(param)
  }
}
//pay 交易数据分析
export const getPayChartsPairCoinByPair=async (param:any,tokenType:string)=>{
  if(tokenType==='symbol0'){
    return await getPayChartsPairCoinBySymbol0(param)
  }else {
    return await getPayChartsPairCoinBySymbol1(param)
  }
}

//流动性分析请求图表
export const flowGetCharts=async (param:any,tokenType:string,coinType:string)=>{
  let result=null
  //pair查询
  if(pairStore.id){
    if(coinType==='usd'){
      //usd 查询
      result=  await getChartsPairUsdByPair(param,tokenType)
    }else{
      //币查询
      result=  await getChartsPairCoinByPair(param,tokenType)
    }
  }else{
    //token查询
    if(coinType==='usd'){
      //usd 查询
      result=  await getChartsUsdtById(param)
    }else{
      //币查询
      result=  await getChartsCoinById(param)
    }
  }
  return result
}
//交易数据分析
export const payGetCharts=async (param:any,tokenType:string,coinType:string)=>{
  let result=null
  if(pairStore.id){
    if(coinType==='usd'){
      result=  await getPayChartsPairUsdByPair(param,tokenType)
    }else{
      result=  await getPayChartsPairCoinByPair(param,tokenType)
    }
  }else{
    //token查询
    if(coinType==='usd'){
      result=  await getPayChartsUsdtById(param)
    }else{
      result=  await getPayChartsCoinById(param)
    }
  }
  return result
}
//得到流动性图表数据
export const getFlowChartModel=async (param:any,chartId:number,tokenType:string,coinType:string)=>{
  //token图表查询
  const newParam={...param,chart_id:chartId}
  console.log(param)
  const result=await flowGetCharts(newParam,tokenType,coinType)
  // getPairCharts
  return result?.data?.data
}
//得到交易数据图表数据
export const getPayChartModel=async (param:any,chartId:number,tokenType:string,coinType:string)=>{
  //token图表查询
  const newParam={...param,chart_id:chartId}
  const result=await payGetCharts(newParam,tokenType,coinType)
  // getPairCharts
  return result?.data?.data
}

//得到5个流动性图表数据
export const getFlowChart= ()=>{
  const chartsAllData =ref<chartItem[]>([])
  const chartLoad=ref(true)
  //token图表查询
  const requestChart=async (param:any)=>{
    chartLoad.value=false
    initCharts(chartsAllData,[0,1,2,3,4])
    for (let i=0;i<chartsAllData.value.length;i++){
      const newParam={...param,chart_id:i+1}
      let result=await flowGetCharts(newParam,'flow','')
      chartsAllData.value[i] =result.data.data
    }
    chartLoad.value=true
  }
  // getPairCharts
  return {chartsAllData,chartLoad,requestChart}
}
//得到5个数据分析图表数据
export const getPayChart= ()=>{
  const chartsAllData =ref<chartItem[]>([])
  const chartLoad=ref(true)
  //token图表查询
  const requestChart=async (param:any)=>{
    chartLoad.value=false
    initCharts(chartsAllData,[5,6,7,8,9])
    for (let i=0;i<chartsAllData.value.length;i++){
      const newParam={...param,chart_id:i+1}
      let result=await payGetCharts(newParam,'pair','')
      chartsAllData.value[i] =result.data.data
    }
    chartLoad.value=true
  }
  // getPairCharts
  return {chartsAllData,chartLoad,requestChart}
}

//得到5图表数据
export const getAllChart= ()=>{
  const chartsAllData =ref<chartItem[]>([])
  const chartLoad=ref(true)
  // const chartIds=[1,2,3,4,5]
  //token图表查询
  const requestTokenChart=async (param:any)=>{
    chartLoad.value=false
    initCharts(chartsAllData,[0,1,2,3,4])
    for (let i=0;i<chartsAllData.value.length;i++){
      let result=null
      if(analysisType.value==='flow'){
        param.chart_id=i+1
        //流动性分析
        result=await flowGetCharts(param,'pair','')
      }else{
        param.chart_id=i+6
        //交易数据分析
        result=await payGetCharts(param,'pair','')
      }
      chartsAllData.value[i] =result.data.data
    }
    chartLoad.value=true
  }
  // getPairCharts
  return {chartsAllData,chartLoad,requestTokenChart}
}
export const getPriceData=async (param:any,type:string)=>{
  let result
  if(type==='pair'){
    result=await getPairPrice(param)
  }else{
    result=await getTokenPrice(param)
  }
  if(result.data.code===0){
    priceData.value=result.data.data
  }else{
    priceData.value={}
  }
}
//token价格线
export const getTokenPriceData=async (param:any,type:string)=>{
  const result=await getTokenPrice(param)
  if(result.data.code===0){
    return result.data.data
  }else{
    return {}
  }
}
//pair价格线
export const getPairPriceData=async (param:any,type:string)=>{
  const result=await getPairPrice(param)
  if(result.data.code===0){
    return result.data.data
  }else{
    return {}
  }
}
//判断数据是否为空
export const getIsNullChartData=(data:any):boolean=>{
  if(!data || !data.xaxis || data.xaxis.length===0){
    return false
  }
  let isHas=false
  data.yaxis.forEach((item:yaxisModel)=>{
    if(item.data.length>0){
      item.data.forEach(value=>{
        if(value===0 || value){
          isHas=true
        }
      })
    }
  })
  return isHas
}