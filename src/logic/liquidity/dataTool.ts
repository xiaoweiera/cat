import * as R from 'ramda'
import {ref,reactive} from 'vue'

import {getChartsUsdtById,getChartsCoinById,getChartsPairUsdById,getChartsPairUsdByEth,getChartsPairCoinById,getChartsPairCoinByEth,getChartsPairCoinByUSDT,getTokenPrice,getPairPrice,getPayChartsUsdtById,getPayChartsCoinById,getPayChartsPairUsdBySymbol0,getPayChartsPairUsdBySymbol1,getPayChartsPairCoinBySymbol0,getPayChartsPairCoinBySymbol1} from '~/api/liquidity'
import {paramChart,analysisType,pairStore,priceData} from '~/store/liquidity/state'
interface chartItem {
  data: Object
}
// 复制方法
export const copyToken = (tokenAddress: string) => {
  tokenAddress='tokenAddress'
  const dom = document.createElement('input')
  dom.setAttribute('value', tokenAddress)
  document.body.appendChild(dom)
  dom.select()
  document.execCommand('copy')
  document.body.removeChild(dom)
}
//初始化5个图表
export const initCharts=(chartsAllData:any)=>{
  const chartIds=[0,1,2,3,4]
  R.map(id=>{
    chartsAllData.value[id] = reactive<any>({})
  },chartIds)
}
//flow 流动性
export const getChartsPairUsdByPair=async (param:any)=>{
  if(paramChart.tokenType==='pair'){
    return await getChartsPairUsdById(param)
  }else if(paramChart.tokenType==='symbol0'){
    return await getChartsPairUsdByEth(param)
  }else {
    return await getChartsPairUsdByEth(param)
  }
}
// flow 流动性pair
export const getChartsPairCoinByPair=async (param:any)=>{
  if(paramChart.tokenType==='pair'){
    return await getChartsPairCoinById(param)
  }else if(paramChart.tokenType==='symbol0'){
    return await getChartsPairCoinByEth(param)
  }else {
    return await getChartsPairCoinByUSDT(param)
  }
}
//pay 交易数据分析
export const getPayChartsPairUsdByPair=async (param:any)=>{
  if(paramChart.tokenType==='symbol0'){
    return await getPayChartsPairUsdBySymbol0(param)
  }else {
    return await getPayChartsPairUsdBySymbol1(param)
  }
}
//pay 交易数据分析
export const getPayChartsPairCoinByPair=async (param:any)=>{
  if(paramChart.tokenType==='symbol0'){
    return await getPayChartsPairCoinBySymbol0(param)
  }else {
    return await getPayChartsPairCoinBySymbol1(param)
  }
}

//流动性分析请求图表
export const flowGetCharts=async (param:any)=>{
  let result=null
  //pair查询
  if(pairStore.id){
    if(paramChart.coinType==='usd'){
      //usd 查询
      result=  await getChartsPairUsdByPair(param)
    }else{
      //币查询
      result=  await getChartsPairCoinByPair(param)
    }
  }else{
    //token查询
    if(paramChart.coinType==='usd'){
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
export const payGetCharts=async (param:any)=>{
  let result=null
  if(pairStore.id){
    if(paramChart.coinType==='usd'){
      result=  await getPayChartsPairUsdByPair(param)
    }else{
      result=  await getPayChartsPairCoinByPair(param)
    }
  }else{
    //token查询
    if(paramChart.coinType==='usd'){
      result=  await getPayChartsUsdtById(param)
    }else{
      result=  await getPayChartsCoinById(param)
    }
  }
  return result
}
//得到5个图表数据
export const getAllChart= ()=>{
  const chartsAllData =ref<chartItem[]>([])
  const chartLoad=ref(true)
  const chartIds=[1,2,3,4,5]
  //token图表查询
  const requestTokenChart=async (param:any)=>{
    chartLoad.value=false
    initCharts(chartsAllData)
   for (let i=0;i<chartIds.length;i++){
     let result=null
     if(analysisType.value==='flow'){
       param.chart_id=i+1
       //流动性分析
       result=await flowGetCharts(param)
     }else{
       param.chart_id=i+6
       //交易数据分析
       result=await payGetCharts(param)
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