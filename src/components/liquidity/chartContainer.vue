<script setup lang="ts">
import { defineProps,onMounted,ref } from 'vue'
import { pairStore,symbolStore} from '~/store/liquidity/state'
import {kData,groupData} from '/mock/liquidity'
const props = defineProps({
  chartData: Object,
  chartId:Number
})
const title=ref()
const getTitle=()=>{
  title.value= pairStore.id?pairStore.name:symbolStore.name
}
onMounted(()=>getTitle())
</script>
<template>
  <div class="flex flex-col p-4 w-full h-106 min-h-106 mb-5 bg-white font-kdFang chartContainer">
    <!--    图表的信息-->
    <div class="text-kd18px28px text-global-default opacity-85">
      <span>{{title}}</span>
      <span class="ml-2">{{chartData.title}}</span>
    </div>
    <div class="text-kd13px19px text-global-default opacity-45">
     {{ chartData.desc }}
    </div>
    <LiquidityChart :chartId="props.chartId" :chart-data="chartData" />
  </div>
</template>
<style scoped lang="postcss">
.chartContainer {
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(44, 140, 248, 0.12);
  border-radius: 2px;
}
</style>
