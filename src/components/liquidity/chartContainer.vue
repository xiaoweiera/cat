<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'
import { pairStore,symbolStore,paramChart} from '~/store/liquidity/state'
import {getFlowChartModel,getPayChartModel,getTokenPriceData,getPairPriceData} from '~/logic/liquidity/dataTool'
import {kData,groupData} from '/mock/liquidity'
const props = defineProps({
  analysisType:String,
  tokenParam:Object,
  pairParam:Object,
  chartId:Number
})
watch(props.tokenParam,(n)=>getData(n))
//改变pair
watch(() => pairStore.id, (n, o) => {
  console.log('改变pair',o)
  getTokenTypeList()
  getData()

})
//监听颗粒度
watch(() => paramChart.interval, (n, o) => {
  props.tokenParam.interval = n
  props.pairParam.interval = n
  //如果颗粒度是小时，那么如果天查看的是90天或者自定义的时候，切换时就默认30天
  if (paramChart.interval === '1H' && (paramChart.timeType >30 || paramChart.timeType === 0)) {
    paramChart.timeType = 30
    paramChart.timeBegin = getagoTimeStamp(30)
    paramChart.timeEnd = dataToTimestamp(formatDefaultTime())
    paramChart.time = getagoTimeStamp(30)
    return
  }
  getData()
})
const tokenTypeList=ref([])
const tokenType=ref('pair')  //pair 选项如： pair| symbol0| symbol1
const initType=()=>{
  if(pairStore.id && props.analysisType==='pay'){
    tokenType.value= tokenType.value==='pair'?'symbol0':tokenType.value
  }else{
    tokenType.value= 'pair'
  }
}

// tokenType.value=initType()
watch(()=>tokenType.value,(n,o)=>{
  console.log('改变tokenType',o)
  getData()
})
const getTokenTypeList=()=>{
  initType()
  if(pairStore.id){
    if(props.analysisType==='flow'){
      tokenTypeList.value=[
      { name: 'Pair', value: 'pair', selected: paramChart.tokenType==='pair'},
      { name:pairStore.name.split('/')[0] , value: 'symbol0', selected: paramChart.tokenType==='symbol0'  },
      { name: pairStore.name.split('/')[1], value: 'symbol1', selected:paramChart.tokenType==='symbol1' }]
    } else{
      tokenTypeList.value=[
        { name:pairStore.name.split('/')[0] , value: 'symbol0', selected: paramChart.tokenType!=='symbol1'  },
        { name: pairStore.name.split('/')[1], value: 'symbol1', selected:paramChart.tokenType==='symbol1' },
      ]
    }
  }
}

const chartKey=ref(0)
let chartData=reactive({value:{}})
const title=ref()
const priceData=reactive({value:{}})

//得到数据
const getData=async ()=>{
  console.log('刷新')
  title.value= pairStore.id?pairStore.name:symbolStore.name
  if (pairStore.id) {
    //pair查询
    props.pairParam.pair_id = pairStore.id
    priceData.value=await getPairPriceData({pair_id: pairStore.id, from_ts: props.pairParam.from_ts, to_ts: props.pairParam.to_ts}, 'pair')
    if(props.analysisType==='flow'){
      console.log(tokenType.value)
      chartData.value=await getFlowChartModel(props.pairParam,props.chartId,tokenType.value)
    }else{
      paramChart.tokenType='symbol0'
      chartData.value=await getPayChartModel(props.pairParam,props.chartId,tokenType.value)
    }
  } else {
    //token查询
    props.tokenParam.symbol_id = symbolStore.id
    priceData.value= await getTokenPriceData({symbol_id: symbolStore.id, from_ts: props.tokenParam.from_ts, to_ts: props.tokenParam.to_ts}, 'token')
    if(props.analysisType==='flow'){
      chartData.value=await getFlowChartModel(props.tokenParam,props.chartId)
    }else{
      paramChart.tokenType='symbol0'
      chartData.value=await getPayChartModel(props.tokenParam,props.chartId)
    }
  }
chartKey.value++
}
const selectTokenType=(item:any)=>{
  tokenType.value=item.value
}
onMounted(()=>{
  getTokenTypeList()
  getData()
})
</script>
<template>
<!--  {{tokenType}}-->
<!--  {{pairStore.id}}-->

  <div class="flex flex-col p-4 w-full h-106 min-h-106 mb-5 bg-white font-kdFang chartContainer border-1">
    <!--    图表的信息-->
    <div class="text-kd18px28px text-global-default opacity-85">
      <span>{{title}}</span>
      <span class="ml-2">{{chartData.value.title}}</span>
    </div>
    <div class="text-kd13px19px text-global-default opacity-45">
     {{ chartData.value.desc }}
    </div>
    <div  v-if="pairStore.id" class="flex items-center mt-2">
      <template v-for="(item,i) in tokenTypeList">
        <div @click="selectTokenType(item)"  :class="item.value===tokenType?'selectTokenType':'tokenType'">{{item.name}}</div>
        <span v-if="i<tokenTypeList.length-1" class="betweenIcon">|</span>
      </template>
    </div>
    <LiquidityChart :key="chartKey" v-if="chartData.value.id" :chartId="props.chartId" :priceData="priceData" :chartData="chartData.value" />
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
  box-shadow: 0px 0px 12px rgba(44, 140, 248, 0.12);
  border-radius: 2px;
}
</style>
