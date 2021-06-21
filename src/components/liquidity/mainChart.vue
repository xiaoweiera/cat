<script setup lang="ts">
import { onMounted,ref,watch,reactive,defineProps} from 'vue'
import { echartData } from '/mock/liquidity'
import {useRoute, useRouter} from 'vue-router'
import { pairStore,paramChart,symbolStore } from '~/store/liquidity/state'
import {getChartsFun} from '~/logic/liquidity/getChartData'
import {initCharts,getAllChart} from '~/logic/liquidity/dataTool'
const props=defineProps({
  chartId:Number
})
const route = useRoute()
const router = useRouter()
const chartsData=ref()
const chartKey=ref(0)
const symbol=pairStore.id?pairStore.id:route.query.pair
const {chartsAllData, requestChart:getCharts}=getAllChart()
const param={
  platId:1,
  symbol_id: symbol,
  from_ts:1581765635,
  to_ts:1617235200,
  interval:paramChart.interval,
}
watch(()=>pairStore.id,(n,o)=>{
 if(n){
   getChartsData(param)
 }
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
//监听颗粒度
watch(()=>paramChart.interval,(n,o)=>{
  param.interval=n
  getChartsData(param)
})
const getChartsData=async (param)=>{
  let result=null
  //pair_id 有pair的话走pair接口数据
  if(pairStore.id){
    result=[]
  }else{
    param.symbol_id=symbolStore.id
   await getCharts(param)
  }
}
onMounted(async ()=>{
  await getChartsData(param)
})
</script>
<template>
  <div v-if="chartsAllData && chartsAllData?.length>0" class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer">
    <template v-for="item in chartsAllData">
      <div v-if="item && item.id" class="w-full h-full">
      <LiquidityChartContainer :key="chartKey"  :chart-data="item" />
      </div>
    </template>
  </div>
  <div v-else>无数据</div>
</template>
<style scoped lang="postcss">
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
