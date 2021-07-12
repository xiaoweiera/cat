<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import { pairStore,symbolStore,paramChart} from '~/store/liquidity/state'
import {getFlowChartModel,getTokenPriceData,getPairPriceData} from '~/logic/liquidity/dataTool'
import {kData,groupData} from '/mock/liquidity'
const props = defineProps({
  config:Object,
  tokenParam:Object,
  pairParam:Object,
  chartId:Number
})
const coinType=reactive({value:'usd'})
const tokenTypeList=ref([])
const tokenType=ref('pair')  //pair 选项如： pair| symbol0| symbol1
//改变symbol
watch(() => symbolStore.id, (n, o) => {
  console.log('token地址 change',pairStore.id)
  if(!pairStore.id){
    getData()
  }
})
watch(()=>coinType.value,(n)=>{
  console.log('1111')
  getData()
})
//改变pair
watch(() => pairStore.id, (n, o) => {
  console.log('pair地址 change1111',pairStore)
  //null是关闭pair的时候，切换历史的时候为空字符串
  if(pairStore.id || pairStore.id===null){
    getData()
  }
})
watch(()=>props.tokenParam.interval,(n)=>getData(props.tokenParam))
watch(()=>paramChart.time,(n)=>getData(props.tokenParam))
watch(()=>tokenType.value,(n)=>getData())
const chartKey=ref(0)
let chartData=reactive({value:{}})
const title=ref()
const priceData=reactive({value:{}})

//得到数据
const getData=async ()=>{
  console.log('flow重会')
  title.value= pairStore.id?pairStore.name:symbolStore.name
  let chartCoin=''
  if (pairStore.id) {
     chartCoin=props.config.flow.pairCofig.usdCoin?coinType.value:'usd'
    //pair查询
    props.pairParam.pair_id = pairStore.id
    priceData.value=await getPairPriceData({pair_id: pairStore.id, from_ts: props.pairParam.from_ts, to_ts: props.pairParam.to_ts}, 'pair')
    chartData.value=await getFlowChartModel(props.pairParam,props.chartId,tokenType.value,chartCoin)
  } else {
     chartCoin=props.config.flow.tokenCofig.usdCoin?coinType.value:'usd'
    //token查询
    props.tokenParam.symbol_id = symbolStore.id
    priceData.value= await getTokenPriceData({symbol_id: symbolStore.id, from_ts: props.tokenParam.from_ts, to_ts: props.tokenParam.to_ts}, 'token')
    chartData.value=await getFlowChartModel(props.tokenParam,props.chartId,tokenType.value,chartCoin)
  }
  chartKey.value++
}
onMounted(()=>{
  console.log('init')
  getData()
})
</script>
<template>
<!--  {{coinType.value}}-->
<!--  {{props.chartId}}-->
<!--  {{tokenType}}-->
  <!--  {{pairStore.id}}-->
  <div class="flex flex-col py-4 pl-4 flex-1 h-full   mb-5 bg-white font-kdFang ">
    <!--    图表的信息-->
    <div class="flex items-center">
     <div class="text-kd14px18px flex text-global-default opacity-85 font-medium">
       <span>{{title}}</span>
       <span class="ml-2">{{chartData.value.title}}</span>
     </div>
      <LiquidityUsdCoin v-if="(!pairStore.id && props.config.flow.tokenCofig.usdCoin) || (pairStore.id && props.config.flow.pairCofig.usdCoin)"   class="ml-1.25" :coinType="coinType"/>
    </div>
    <div class="text-kd13px19px text-global-default mt-2 opacity-45">
      {{ chartData.value.desc }}
    </div>
    <LiquidityChart :key="chartKey" v-if="chartData.value.id" :chartId="props.chartId" :priceData="priceData" :chartData="chartData.value" :coinType="coinType" />
  </div>
</template>
<style scoped lang="postcss">
.betweenIcon{
  color:rgba(37, 62, 111, 0.1);
  @apply mx-3;
}
.selectTokenType{
  @apply font-kdFang text-kd14px18px text-global-primary text-opacity-65 cursor-pointer;
}
.tokenType{
  @apply font-kdFang text-kd14px18px text-global-default text-opacity-65 cursor-pointer;
}
.chartContainer {
  background: #ffffff;

}
</style>
