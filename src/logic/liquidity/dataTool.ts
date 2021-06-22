import * as R from 'ramda'
import {ref,reactive} from 'vue'
import {getChartsUsdtById,getChartsCoinById} from '~/api/liquidity'
import {paramChart } from '~/store/liquidity/state'
interface chartItem {
  data: Object

}
// 复制方法
export const copyToken = (tokenAddress: string) => {
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
//得到5个图表数据
export const getAllChart= ()=>{
  const chartsAllData =ref<chartItem[]>([])
  const chartLoad=ref(true)
  const chartIds=[1,2,3,4,5]
  const requestChart=async (param:any)=>{
    chartLoad.value=false
    initCharts(chartsAllData)
   for (let i=0;i<chartIds.length;i++){
     param.chart_id=i+1
     let result=null
     if(paramChart.coinType==='usd'){
        result=  await getChartsUsdtById(param)
     }else{
        result=  await getChartsCoinById(param)
     }
     chartsAllData.value[i] =result.data
   }
    chartLoad.value=true
  }
  return {chartsAllData,chartLoad,requestChart}
}
