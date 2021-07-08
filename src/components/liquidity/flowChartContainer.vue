<script lang="ts" setup>
import {onMounted, ref, watch, reactive, defineProps} from 'vue'
import * as R from 'ramda'
import {ElLoading} from 'element-plus'
import {echartData} from '/mock/liquidity'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import {useRoute, useRouter} from 'vue-router'
import {pairStore, paramChart, symbolStore, analysisType,selectHistory} from '~/store/liquidity/state'
import {getFlowChart, getPriceData} from '~/logic/liquidity/dataTool'
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
  chartId:Number
})
const tokenParam = {
  platId: 1,
  symbol_id: '',
  from_ts: paramChart.timeBegin,
  to_ts: paramChart.timeEnd,
  interval: paramChart.interval,
}
const pairParam = {
  platId: 1,
  pair_id: '',
  from_ts: paramChart.timeBegin,
  to_ts: paramChart.timeEnd,
  interval: paramChart.interval,
}
const getChartsData = async () => {
  console.log()
  console.log('11')
  tokenParam.symbol_id = symbolStore.id
  await getPriceData({symbol_id: symbolStore.id, from_ts: tokenParam.from_ts, to_ts: tokenParam.to_ts}, 'token')
  await getCharts(tokenParam)
}

//改变分析类型
watch(() => analysisType.value, (n, o) => {
  getChartsData()
})
//改变symbol
watch(() => symbolStore.id, (n, o) => {
  getChartsData()
})
//改变pair
watch(() => pairStore.id, (n, o) => {
  console.log('aaa')
  getChartsData()
})
//监听时间改变
watch(() => paramChart.time, (n, o) => {
  tokenParam.from_ts = paramChart.timeBegin
  tokenParam.to_ts = paramChart.timeEnd
  pairParam.from_ts = paramChart.timeBegin
  pairParam.to_ts = paramChart.timeEnd
  getChartsData()
})
//监听USD和币
watch(() => paramChart.coinType, (n, o) => {
  getChartsData()
})
//监听token图表 的类型 pair eth usdt
watch(() => paramChart.tokenType, (n, o) => {
  getChartsData()
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
  getChartsData()
})
onMounted(() => {
  getChartsData()
})
</script>
<template>
  <div class="mt-4 w-full h-full">
        <template v-for="(item,i) in []">
          <div v-if="item && item.id && item.xaxis.length>0 " class="flex-1">
            <LiquidityChartContainer :tokenParam="tokenParam"  class="border-1" :chart-data="item"/>
          </div>
        </template>
  </div>
</template>
