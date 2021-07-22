<script setup lang="ts">
import {defineProps, onMounted,computed, ref, reactive, watch} from 'vue'
import {pairStore, symbolStore, paramChart} from '~/store/liquidity/state'
import {getPayChartModel, getTokenPriceData, getPairPriceData, getIsNullChartData} from '~/logic/liquidity/dataTool'
import {titleCofig,isSymbol0Symbol1} from '~/logic/liquidity/dataCofig'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  config: Object,
  tokenParam: Object,
  pairParam: Object,
  chartId: Number
})
const coinType = reactive({value: 'usd'})
const tokenTypeList = ref([])
const tokenType = ref('symbol0')  //pair 选项如： pair| symbol0| symbol1
//改变symbol
watch(() => symbolStore.id, (n, o) => {
  if (!pairStore.id) {
    getData()
  }
})
watch(() => coinType.value, (n) => {
  getData()
})
//改变pair
watch(() => pairStore.id, (n, o) => {
  if (pairStore.id || pairStore.id === null) {
    getData()
  }
})
watch(() => props.tokenParam.interval, (n) => getData(props.tokenParam))
watch(() => paramChart.time, (n) => getData(props.tokenParam))
// watch(() => tokenType.value, (n) => getData())
const chartKey = ref(0)
let chartData = reactive({value: {}})
const priceData = reactive({value: {}})
const isNull = ref(false) //是否有数据
const chartLoad = ref(true)
const title= computed<string>((): string => {
 return pairStore.id ? pairStore.name : symbolStore.name
})
//得到数据
const getData = async () => {
  chartLoad.value = true
  let chartCoin = ''
  priceData.value = await getTokenPriceData({
    platId:1,
    symbol_id: symbolStore.id,
    from_ts: props.tokenParam.from_ts,
    to_ts: props.tokenParam.to_ts,
    interval: props.tokenParam.interval
  }, 'token')
  if (pairStore.id) {
    chartCoin = props.config.pay.pairCofig.usdCoin ? coinType.value : 'usd'
    //pair查询
    props.pairParam.pair_id = pairStore.id
    // priceData.value = await getPairPriceData({
    //   platId:1,
    //   pair_id: pairStore.id,
    //   from_ts: props.pairParam.from_ts,
    //   to_ts: props.pairParam.to_ts,
    //   interval: props.pairParam.interval
    // }, 'pair')
    if(isSymbol0Symbol1.includes(props.chartId)){
      tokenType.value=pairStore.name?(pairStore.name.split('/')[0]===symbolStore.name?'symbol0':'symbol1'):'symbol0'
    }else{
      tokenType.value='symbol0'
    }
    chartData.value = await getPayChartModel(props.pairParam, props.chartId, tokenType.value, chartCoin)
  } else {
    chartCoin = props.config.pay.tokenCofig.usdCoin ? coinType.value : 'usd'
    //token查询
    props.tokenParam.symbol_id = symbolStore.id

    tokenType.value='symbol0'
    chartData.value = await getPayChartModel(props.tokenParam, props.chartId, tokenType.value, chartCoin)
  }
  chartKey.value++
  isNull.value = getIsNullChartData(chartData.value)
  chartLoad.value = false
}
//监听价格线
const initLoad = () => {
  window.addEventListener('scroll', scrollHandle, true);
  const dom = document.querySelector('.chartScroll' + props.chartId)
  if(!dom) return
  const offset = dom.getBoundingClientRect()
  const offsetTop = offset.top;
  const offsetBottom = offset.bottom;
  if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
    window.removeEventListener('scroll', scrollHandle, true);
    getData()
  }
}
const scrollHandle = () => {
  initLoad()
}
onMounted(() => {
  initLoad()
})
const getTitleDesc=(title:string)=>{
  if(!title) return ''
  if(!pairStore.id) return title
  if(titleCofig[props.chartId] && titleCofig[props.chartId].change){
    // const symbol0=pairStore.name?pairStore.name.split('/')[0]+' ':''
    // const coin=isSymbol0Symbol1.includes(props.chartId)?symbolStore.name:symbol0
    console.log('aaa', I18n.template(titleCofig[props.chartId].replaceStr, {value:symbolStore.name}))
    if(titleCofig[props.chartId].replaceStr){
      return title.replace(titleCofig[props.chartId].replaceStr, I18n.template(titleCofig[props.chartId].replace, {value:symbolStore.name}))
    }else{
      return title+' '+symbolStore.name
    }
  }else{
    return title
  }
}
</script>
<template>
  <div :class="'chartScroll'+props.chartId"  class="flex flex-col py-4 px-4 flex-1 h-full mb-5 relative bg-white font-kdFang ">
    <!--    图表的信息-->
    <div class="flex flex-col md:flex-row  md:items-center flex-wrap">
      <div class="text-kd14px18px flex text-global-default opacity-85 font-medium">
        <span>{{title }}</span>
        <span class="ml-2">{{getTitleDesc(chartData.value?.title)}}</span>
        <el-tooltip class="mdhidden" popper-class="desTip" :hide-after="10" :content="chartData.value?.desc" placement="top" effect="light">
          <div>
            <IconFont class="mt-0.5 ml-1" type="icon-info" />
          </div>
        </el-tooltip>
      </div>
      <LiquidityUsdCoin v-if="(!pairStore.id && props.config.pay.tokenCofig.usdCoin) || (pairStore.id && props.config.pay.pairCofig.usdCoin)" class="md:ml-1.25 md:mt-0 mt-3.25 " :coinType="coinType"/>
      <LiquidityFullChartFull :desc="chartData.value?.desc" :config="config" :timeParam="paramChart" :queryInterval="props.tokenParam.interval" chartType="pay" :chartId="props.chartId" :queryCoinType="coinType.value"/>
    </div>
    <div class="text-kd13px19px text-global-default mt-2 opacity-45 txtSmall h-11 xshidden">
      {{ chartData.value?.desc }}
    </div>
    <div v-if="!chartLoad" class="w-full h-full">
      <div v-if="!isNull" class="w-full">
        <LiquidityChart class="h-60 md:h-77.5 w-full "  :key="chartKey" v-if="chartData.value.id" :chartId="props.chartId" :priceData="priceData" :chartData="chartData.value" :coinType="coinType"/>
      </div>
      <div v-else class="flex items-center justify-center  w-full h-full">
        <img class="w-62.5  md:mt-0 " src="https://res.ikingdata.com/nav/liquidityNullData.jpg" alt="">
      </div>
    </div>
    <div v-else class="flex items-center justify-center   w-full   h-full justify-center">
      <img class="w-50   z-2 mt-4 md:mt-0 mr-4 mb-10" src="https://res.ikingdata.com/nav/loadingState.gif" alt="">
    </div>
  </div>
</template>
<style scoped lang="postcss">
.desTip{
  width:50px !important;
  margin-right:10px;
}
.txtSmall{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.betweenIcon {
  color: rgba(37, 62, 111, 0.1);
  @apply mx-3;
}

.selectTokenType {
  @apply font-kdFang text-kd14px18px text-global-primary text-opacity-65 cursor-pointer;
}

.tokenType {
  @apply font-kdFang text-kd14px18px text-global-default text-opacity-65 cursor-pointer;
}

.chartContainer {
  background: #ffffff;

}
</style>
