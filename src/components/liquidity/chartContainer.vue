<script setup lang="ts">
import { defineProps,onMounted,ref,reactive } from 'vue'
import { pairStore,symbolStore} from '~/store/liquidity/state'
import {getFlowChartModel} from '~/logic/liquidity/dataTool'
import {kData,groupData} from '/mock/liquidity'
const props = defineProps({
  tokenParam:Object,
  chartId:Number
})
let chartData=reactive({})
const title=ref()
const getData=async ()=>{
  title.value= pairStore.id?pairStore.name:symbolStore.name
  chartData=await getFlowChartModel(props.tokenParam,props.chartId)
  console.log(chartData)
}
const getTitle=()=>{
  title.value= pairStore.id?pairStore.name:symbolStore.name
}
onMounted(()=>getData())
</script>
<template>
  {{chartData}}
  <div class="flex flex-col p-4 w-full h-106 min-h-106 mb-5 bg-white font-kdFang chartContainer border-1">
    <!--    图表的信息-->
    <div class="text-kd18px28px text-global-default opacity-85">
      <span>{{title}}</span>
      <span class="ml-2">{{chartData.title}}</span>
    </div>
    <div class="text-kd13px19px text-global-default opacity-45">
     {{ chartData.desc }}
    </div>
    <LiquidityChart v-if="chartData.id" :chartId="props.chartId" :chartData="chartData" />
  </div>
</template>
<style scoped lang="postcss">
.chartContainer {
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(44, 140, 248, 0.12);
  border-radius: 2px;
}
</style>
