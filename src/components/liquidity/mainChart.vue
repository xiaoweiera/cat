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
//监听时间改变
watch(() => paramChart.time, (n, o) => {
  tokenParam.from_ts = paramChart.timeBegin
  tokenParam.to_ts = paramChart.timeEnd
  pairParam.from_ts = paramChart.timeBegin
  pairParam.to_ts = paramChart.timeEnd
})
//监听颗粒度
watch(() => paramChart.interval, (n, o) => {
  tokenParam.interval = n
  pairParam.interval = n
  //如果颗粒度是小时，那么如果天查看的是90天或者自定义的时候，切换时就默认30天
  if (paramChart.interval === '1H' && (paramChart.timeType >30 || paramChart.timeType === 0)) {
    paramChart.timeType = 30
    paramChart.timeBegin = getagoTimeStamp(30)
    paramChart.timeEnd = dataToTimestamp(formatDefaultTime())
    paramChart.time = getagoTimeStamp(30)
    return
  }
})
</script>
<template>
<!--  {{paramChart}}-->
<!--  {{symbolStore}}-->
<!--  {{pairStore}}-->
  <div class="flex flex-1 flex-col px-5 pt-8 chartContainer" >
    <template v-for="(item,i) in chartDataConfig">
      <div class="mb-8">
        <LiquidityAnalysisTitle :title="item.title" :desc="item.desc"/>
        <div class="flex  h-107.5  bgContainer border-1">
          <LiquidityFlowChartContainer :config="item" :chartId="item.flow.id+1" :tokenParam="tokenParam"  :pairParam="pairParam" />
          <img class="my-4 mx-4" src="https:res.ikingdata.com/nav/liquidityBetween.jpg" alt="">
          <LiquidityPayChartContainer :config="item" :chartId="item.pay.id+1" :tokenParam="tokenParam"  :pairParam="pairParam" />
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
