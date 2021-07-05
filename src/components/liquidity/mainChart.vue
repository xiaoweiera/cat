<script setup lang="ts">
import {onMounted, ref, watch, reactive, defineProps} from 'vue'
import * as R from 'ramda'
import {ElLoading} from 'element-plus'
import {echartData} from '/mock/liquidity'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import {useRoute, useRouter} from 'vue-router'
import {pairStore, paramChart, symbolStore, analysisType,selectHistory} from '~/store/liquidity/state'
import {getAllChart, getPriceData} from '~/logic/liquidity/dataTool'

const props = defineProps({
  chartId: Number
})
const route = useRoute()
const router = useRouter()
const chartsData = ref()
const chartKey = ref(0)
const isHasData = ref(true)
const {chartsAllData, chartLoad, requestTokenChart: getTokenCharts} = getAllChart()
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
watch(() => chartLoad.value, (n, o) => {
  if (chartsAllData.value.length === 0) {
    isHasData.value = false
    return
  }
  let number = 0
  R.map(item => {
      if (item && item.id &&  (item.code === 1 || item.xaxis.length===0)) {
        number++
      }
    isHasData.value = number === 5 ? false : true
  }, chartsAllData.value)
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
const getChartsData = async () => {
  if (pairStore.id) {
    pairParam.pair_id = pairStore.id
    // await getPriceData({pair_id:pairStore.id,from_ts:pairParam.from_ts,to_ts:pairParam.to_ts},'pair')
    await getPriceData({pair_id: pairStore.id, from_ts: pairParam.from_ts, to_ts: pairParam.to_ts}, 'pair')
    await getTokenCharts(pairParam)
  } else {
    tokenParam.symbol_id = symbolStore.id
    await getPriceData({symbol_id: symbolStore.id, from_ts: pairParam.from_ts, to_ts: pairParam.to_ts}, 'token')
    await getTokenCharts(tokenParam)
  }
}
onMounted(async () => {
  await getChartsData()
})
const loading = false
</script>
<template>
  <div v-if="!chartLoad" class="w-50 absolute top-100  left-65  loadingGif">
    <img src="https://res.ikingdata.com/nav/loadingState.gif" alt="">
  </div>
  <div v-if="chartsAllData && isHasData" class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer">
    <template v-for="item in chartsAllData">
      <div v-if="item && item.id && item.xaxis.length>0" class="w-full">
        <LiquidityChartContainer v-loading="loading" class="border-1" :key="chartKey" :chart-data="item"/>
      </div>
    </template>
  </div>
  <div v-if="chartLoad && !isHasData">
    <img class="w-60 mx-auto mt-20" src="https://res.ikingdata.com/nav/noData.png" alt="">
    <div class="text-kd14px18px text-global-primary text-center mt-5">暂无数据</div>
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
