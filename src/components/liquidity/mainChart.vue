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
  <div class="flex flex-1 px-5 pt-5 chartContainer">
<!--    流动性分析-->
    <div class="flex-1 mr-2.5">
      <LiquidityAnalysisTitle :data="analysisConfig[0]"/>
      <template v-for="item in [0,1,2,3,4]">
        <LiquidityFlowChartContainer :chartId="item+1" :tokenParam="tokenParam"  :pairParam="pairParam" class="border-1"/>
      </template>
    </div>
    <div class="flex-1 ml-2.5">
      <LiquidityAnalysisTitle :data="analysisConfig[1]"/>
      <template v-for="item in [5,6,7,8,9]">
        <LiquidityPayChartContainer :chartId="item+1" :tokenParam="tokenParam"  :pairParam="pairParam" class="border-1"/>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.loadingGif {
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
