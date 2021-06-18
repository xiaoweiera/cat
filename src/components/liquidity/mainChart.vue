<script setup lang="ts">
import { onMounted,ref,watch,reactive} from 'vue'
import { echartData } from '/mock/liquidity'
import {useRoute, useRouter} from 'vue-router'
import { pairStore, sidePair,paramChart } from '~/store/liquidity/state'

import {getChartsFun} from '~/logic/liquidity/getChartData'
const route = useRoute()
const router = useRouter()
const chartsData=ref()
const symbol=sidePair.pair_id?sidePair.pair_id:route.query.pair
const param={
  platId:1,
  symbol_id: symbol,
  from_ts:1581765635,
  to_ts:1617235200,
  interval:'1H'
}
watch(()=>sidePair.pair_id,(n,o)=>{
  param.symbol_id=n
  getChartsData(param)
})
watch(()=>paramChart.timeBegin,(n,o)=>{
  param.from_ts=n
  getChartsData(param)
})
watch(()=>paramChart.timeEnd,(n,o)=>{
  param.to_ts=n
  getChartsData(param)
})
const getChartsData=async (param)=>{
  const result= await getChartsFun(param)
  chartsData.value=result.data
}
onMounted(()=>{
  getChartsData(param)
})
</script>
<template>
<!--  {{paramChart.timeBegin}}-->
  <div v-if="chartsData && chartsData?.length>0" class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer">
    <template v-for="item in chartsData">
      <LiquidityChartContainer :chart-data="item" />
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
