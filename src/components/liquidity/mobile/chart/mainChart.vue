<script lang="ts" setup>
import {onMounted, ref, watch, reactive, defineProps} from 'vue'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import {pairStore, paramChart, symbolStore, analysisType, selectHistory} from '~/store/liquidity/state'
import {getFlowChart, getTokenPriceData} from '~/logic/liquidity/dataTool'
import {chartDataConfig} from '~/logic/liquidity/dataCofig'
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


</script>
<template>
  <div class="flex flex-1  flex-col  chartContainer" >
    <template v-for="(item,i) in chartDataConfig">
      <div class="mt-1.5 ">
        <div class="flex  h-107.5  bgContainer border-1">
          <LiquidityFlowChartContainer v-if="analysisType==='flow'" :config="item" :chartId="item.flow.id+1" :tokenParam="tokenParam"  :pairParam="pairParam" />
          <LiquidityPayChartContainer v-else :config="item" :chartId="item.pay.id+1" :tokenParam="tokenParam"  :pairParam="pairParam" />
        </div>
      </div>
    </template>
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
