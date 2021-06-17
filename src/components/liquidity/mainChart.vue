<script setup lang="ts">
import { onMounted,ref,watch } from 'vue'
import { echartData } from '/mock/liquidity'
import { pairStore, sidePair } from '~/store/liquidity/state'
import {getChartsFun} from '~/logic/liquidity/getChartData'
const chartsData=ref()
watch(()=>sidePair.pair_id,(n,o)=>{
  getChartsData(n)
})
const getChartsData=async (pair_id:string)=>{
  const param={
    platId:1,
    symbol_id: pair_id?pair_id:'0xe36ffd17b2661eb57144ceaef942d95295e637f0',
    from_ts:1581765635,
    to_ts:1617235200,
    interval:'1H'
  }
  const result= await getChartsFun(param)
  chartsData.value=result.data
}
onMounted(()=>{
  getChartsData()
})
</script>
<template>
  <div v-if="chartsData && chartsData?.length>0" class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer">
    <template v-for="item in chartsData">
      <LiquidityChartContainer :chart-data="item" />
    </template>
  </div>
  <div>无数据</div>
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
