<script setup lang="ts">
import { onMounted,ref,watch,reactive,defineProps} from 'vue'
import * as R from 'ramda'
import {ElLoading} from 'element-plus'
import { echartData } from '/mock/liquidity'
import {useRoute, useRouter} from 'vue-router'
import { pairStore,paramChart,symbolStore,analysisType } from '~/store/liquidity/state'
import {getAllChart} from '~/logic/liquidity/dataTool'
const props=defineProps({
  chartId:Number
})
const route = useRoute()
const router = useRouter()
const chartsData=ref()
const chartKey=ref(0)
const isHasData=ref(true)
const symbol=pairStore.id?pairStore.id:route.query.pair
const {chartsAllData,chartLoad, requestChart:getCharts}=getAllChart()
const param={
  platId:1,
  symbol_id: symbol,
  interval:paramChart.interval,
}
//改变分析类型
watch(()=>analysisType.value,(n,o)=>{
  getChartsData(param)
})
//改变pair
watch(()=>pairStore.id,(n,o)=>{
   getChartsData(param)
})
//监听时间改变
watch(()=>paramChart.time,(n,o)=>{
  param.from_ts=paramChart.timeBegin
  param.to_ts=paramChart.timeEnd
  getChartsData(param)
})
//监听USD和币
watch(()=>paramChart.coinType,(n,o)=>{
  getChartsData(param)
})
watch(()=>chartLoad.value,(n,o)=>{
  if(chartsAllData.value.length===0) {
    isHasData.value=false
    return
  }
  let number=0
  R.map(item=>{
    if(item.code===1){
      number++
    }
    isHasData.value=number===5?false:true
  },chartsAllData.value)
})
//监听颗粒度
watch(()=>paramChart.interval,(n,o)=>{
  param.interval=n
  getChartsData(param)
})
const getChartsData=async (param)=>{
  let result=null
  //pair_id 有pair的话走pair接口数据
  if(pairStore.id){
    isHasData.value=false
    chartsAllData.value=[]
  }else{
    param.symbol_id=symbolStore.id
   await getCharts(param)
  }
}
onMounted(async ()=>{
  await getChartsData(param)
})
const loading=false


</script>
<template>
  token {{symbolStore}}
  pair  {{pairStore}}
  <div v-if="!chartLoad" class="w-50 absolute top-100  left-65  loadingGif">
    <img src="https://res.ikingdata.com/nav/loadingState.gif" alt="">
  </div>
  <div   v-if="chartsAllData && isHasData" class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer">
    <template v-for="item in chartsAllData">
      <div v-if="item && item.id" class="w-full h-full">
      <LiquidityChartContainer v-loading="loading" class="border-1" :key="chartKey"  :chart-data="item" />
      </div>
    </template>
  </div>
  <div v-if="chartLoad && !isHasData" >
    <img class="w-60 mx-auto mt-20" src="https://res.ikingdata.com/nav/noData.png" alt="">
    <div class="text-kd14px18px text-global-primary text-center mt-5">暂无数据</div>
  </div>
</template>
<style  scoped lang="postcss">

.loadingGif{
  right: 0;
  margin: 0 auto;
}
.chartContainer {
  overflow: hidden;
  overflow-y: auto;
}
.chartContainer::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.chartContainer::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
