<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'
import * as R from 'ramda'
import {  setInject, getInject } from '~/utils/use/state'
import I18n from '~/utils/i18n/index'
import {isSymbol0Symbol1} from '~/logic/liquidity/dataCofig'
import {getFlowChartModel,getPayChartModel, getTokenPriceData, getPairPriceData, getIsNullChartData} from '~/logic/liquidity/dataTool'
import get = Reflect.get;
const props=defineProps({
  config:Object,
  chartType:String,
  chartId:String
})
const full=true
const chartKey=ref(0)
let chartData = reactive({value: {}})
const priceData = reactive({value: {}})
const isNull = ref(false) //是否有数据
const chartLoad = ref(true)
const setTitle=setInject('title')
const coinType=getInject('coinType')
const interval=getInject('interval')
const timeParam=getInject('timeParam')
const pairData=getInject('pairData')
const tokenData=getInject('tokenData')
const requestParam = reactive({
  platId: 1,
  symbol_id: tokenData.value[0].id,
  pair_id: pairData.value[0].id,
  from_ts: timeParam.value[0].timeBegin,
  to_ts: timeParam.value[0].timeEnd,
  interval: interval.value[0],
})
onMounted(function () {
  // requestParam.symbol_id=tokenData.id
  // requestParam.pair_id=pairData.id
  getData()
  // margeInject('pairData', { name: 121 })
})

//得到数据
const getData = async () => {
  let tokenType=props.chartType==='flow'?'pair':'symbol0'
  chartLoad.value = true
  let chartCoin = ''
  const param=R.pick(['platId','symbol_id','from_ts','to_ts','interval'],requestParam)
  priceData.value = await getTokenPriceData(param, 'token')
  if (pairData.value[0].id) {
    //pair查询
    const param=R.pick(['platId','pair_id','from_ts','to_ts','interval'],requestParam)
    chartCoin = props.config[props.chartType].pairCofig.usdCoin ? coinType.value[0] : 'usd'
    // priceData.value = await getPairPriceData(param, 'pair')
    if(props.chartType==='flow'){
      chartData.value = await getFlowChartModel(param, props.chartId, tokenType, chartCoin)
    }else{
      if(isSymbol0Symbol1.includes(props.chartId)){
        tokenType=pairData.value[0].name?(pairData.value[0].name.split('/')[0]===tokenData.value[0].name?'symbol0':'symbol1'):'symbol0'
      }
      chartData.value = await getPayChartModel(param, props.chartId,tokenType, chartCoin)
    }
  } else {
    requestParam.symbol_id = tokenData.value[0].id
    //token查询
    const param=R.pick(['platId','symbol_id','from_ts','to_ts','interval'],requestParam)
    // priceData.value = await getTokenPriceData(param, 'token')
    chartCoin = props.config[props.chartType].tokenCofig.usdCoin ? coinType.value[0] : 'usd'
    if(props.chartType==='flow'){
      chartData.value = await getFlowChartModel(param, props.chartId, tokenType, chartCoin)
    }else{
      chartData.value = await getPayChartModel(param, props.chartId, tokenType, chartCoin)
    }
  }
  setTitle(chartData.value.title)
  chartKey.value++
  isNull.value = getIsNullChartData(chartData.value)
  chartLoad.value = false
}
watch(()=>coinType.value[0],(n,o)=>{
  getData()
})
watch(()=>interval.value[0],(n,o)=>{
  requestParam.interval=n
  getData()
})
watch(()=>timeParam.value[0].timeBegin,(n,o)=>{
  requestParam.from_ts=n
  getData()
})
</script>
<template>
  <div v-if="!chartLoad" class="h-full w-full">
    <div v-if="!isNull" class="w-full h-full">
      <LiquidityChart :full=full   :key="chartKey" v-if=" chartData.value.id" :chartId="props.chartId+'full'" :priceData="priceData" :chartData="chartData.value" :coinType="coinType"/>
    </div>
    <div v-else class="flex flex-col items-center justify-center  w-full h-full">
      <img class="w-62.5 mb-4" src="https://res.ikingdata.com/liquidity/liquidityNullData.jpg" alt="">
      <span class="text-kd14px18px text-global-default text-opacity-32 font-kdFang ">{{I18n.liquidity.noData}}</span>
    </div>
  </div>
</template>
<style scoped lang="postcss">

</style>
