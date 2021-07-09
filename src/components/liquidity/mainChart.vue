<script lang="ts" setup>
import {onMounted, ref, watch, reactive, defineProps} from 'vue'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import {pairStore, paramChart, symbolStore, analysisType, selectHistory} from '~/store/liquidity/state'
import {getFlowChart, getTokenPriceData} from '~/logic/liquidity/dataTool'
import {analysisConfig} from '~/logic/liquidity/dataCofig'

interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  unit: string
}

const {chartsAllData, chartLoad, requestChart: getCharts} = getFlowChart()
// 颗粒度天 时
let myChart: any = null
const props = defineProps({
  chartData: Object,
  chartId: Number
})
const tokenParam = reactive({
  platId: 1,
  symbol_id: '',
  from_ts: paramChart.timeBegin,
  to_ts: paramChart.timeEnd,
  interval: paramChart.interval,
})
const pairParam = reactive({
  platId: 1,
  pair_id: '',
  from_ts: paramChart.timeBegin,
  to_ts: paramChart.timeEnd,
  interval: paramChart.interval,
})
//监听时间改变
watch(() => paramChart.time, (n, o) => {
  tokenParam.from_ts = paramChart.timeBegin
  tokenParam.to_ts = paramChart.timeEnd
  pairParam.from_ts = paramChart.timeBegin
  pairParam.to_ts = paramChart.timeEnd
})
</script>
<template>
  <div class="flex flex-1 flex-col px-5 mt-8 chartContainer">
<!--    流动性分析-->
    <LiquidityAnalysisTitle :data="analysisConfig[0]"/>
    <div class="flex  mr-2.5 bgContainer">
      <template v-for="item in [0]">
        <LiquidityFlowChartContainer :chartId="item+1" :tokenParam="tokenParam"  :pairParam="pairParam" class="flex-1"/>
      </template>
      <template v-for="item in [5]">
        <LiquidityPayChartContainer :chartId="item+1" :tokenParam="tokenParam"  :pairParam="pairParam" class=" flex-1"/>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.loadingGif {
  right: 0;
  margin: 0 auto;
}
.bgContainer{

  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(44, 140, 248, 0.12);
  border-radius: 2px;
  @apply h-107;
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
