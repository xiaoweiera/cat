<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { echartData } from '/mock/liquidity'
import {getChartsFun} from '~/logic/liquidity/getChartData'
const chartsData=ref()
onMounted(async()=>{
  const param={
    platId:1,
    symbol_id: '0xe36ffd17b2661eb57144ceaef942d95295e637f0',
    from_ts:1581765635,
    to_ts:1617235200,
    interval:'1H'
  }
  const result= await getChartsFun(param)
  console.log(result)
    chartsData.value=result.data

})
</script>
<template>
  <div class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer">
    <template v-for="item in chartsData">
      <LiquidityChartContainer :chart-data="item" />
    </template>
  </div>
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
