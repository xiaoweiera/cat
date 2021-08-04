<script lang="ts" setup>
import {ref, computed,onMounted,watch,defineProps} from 'vue'

import {flowHeader,flowOpenHeader,typeName,orderTypeName} from '~/logic/liquidity/down'
import * as R from 'ramda'
import {smallToken, formatRulesPrice,formatRulesNumber,formatTime} from '~/lib/tool'
import * as scroll from '~/utils/event/scroll'
import {getPairName,getAddressHref} from '~/logic/liquidity/dataTool'
import {getDownFirstData} from '~/logic/liquidity/downTool'
import {pairStore, symbolStore,selectX} from '~/store/liquidity/state'
import {getInject,  setInject } from '~/utils/use/state'
const props=defineProps({chartType:String})
const timeParam=getInject('timeParam')
const isFull=getInject('isFull')
const interval=getInject('interval')
const setIsFull=setInject('isFull')
const tokenOrPairName=getInject('tokenOrPairName')
const row = ref(-1)
const selectRow = (index: number) => row.value = index===row.value?-1:index
const full=()=>setIsFull(!isFull.value[0])
const pairName=(tokenName0:string,tokenName1:string)=> getPairName(symbolStore.name,tokenName0,tokenName1)
const param={
  platId:'1',
  page:1,
  page_size:50,
  pair_id:pairStore.id,
  symbol_id:symbolStore.id,
  ts:selectX.ts?selectX.ts:timeParam.value[0].timeEnd,
  interval:interval.value[0],
  ordering:'net_inflowusd',
  sort:'desc'
}
const loading=ref(true)
const loadingData=ref(true)
const hasData=ref(true)
const tableData=ref([])
// watch(()=>loading.value,(n)=>loadingData.value=n)
//更改图表日期的时候重新得到数据
watch(()=>selectX.ts,async (n)=>{
  param.ts=n
  param.page=1
  hasData.value=true
  row.value=-1
  tableData.value=[]
  await getData()
})
const getData=async ()=> {
  loading.value=true
  const data = await getDownFirstData(param, props.chartType, pairStore.id)
  if (data?.code === 0) {
    loading.value=false
    hasData.value = data?.data?.next ? true : false
    R.map(item => tableData.value.push(item), data?.data?.results)
  }
}
onMounted(async ()=>{
  console.log('flow')
  await getData()
})
const fullButtonName=computed(()=> isFull.value[0]?'点击缩小表格':'点击放大表格')
const scrollFun=()=>{
  const listDom = document.querySelector('.first')
  if(listDom){
    if ((parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight) && hasData.value) {
      param.page++
      getData()
    }
  }
}

const orderType=ref(0)  //类型 desc asc ''
const orderIndex=ref(-1)  //排序的第几个header
const order=(key:string,i:number)=>{
  console.log(orderIndex.value,i,orderType.value)
  if(orderIndex.value!==i && orderIndex.value!==-1){ orderType.value=1 ; orderIndex.value=i}
  else {
    orderIndex.value=i
    if(orderType.value===2 ){ orderType.value=0}
    else  {orderType.value++}
  }
  param.sort=orderTypeName[orderType.value].key
  param.ordering=key
  param.page=1
  hasData.value=true
  row.value=-1
  tableData.value=[]
  getData()
}
</script>
<template>
  <div class="mb-3 flex items-center relative text-kd18px28px overflow-hidden font-kdFang text-global-default text-opacity-85">
    <div class="font-semibold">
      <span>{{tokenOrPairName[0]}}</span>
      <span class="ml-2">数据详解</span>
      <span class="ml-4">({{formatTime(selectX.ts?selectX.ts:timeParam[0].timeEnd,'M月DD日')}})</span>
    </div>
    <span class="text-global-default text-opacity-65 text-kd12px16px ml-4">点击列表地址可对图表数据过滤 </span>
    <div @click="full()" class="flex items-center donwBig p-1 absolute right-0 hand  ">
      <img class="w-4 h-4 mr-0.5" src="https://res.ikingdata.com/liquidity/downBig.jpg" alt="">
      <span class="text-kd12px16px font-medium text-global-primary">{{fullButtonName}}</span>
    </div>
  </div>
  <div :class="isFull[0]?'flex-1':'flex-1'" class="flex flex-col  font-kdFang  w-full   overflow-hidden bg-global-white">
    <div class="header  px-2.5 min-h-9 mb-1  flex items-center">
      <template v-for="(item,i) in flowHeader">
        <div :style="{width:item.width}" :class="item.width?'':'flex-1'" class=" text-kd12px16px text-global-default text-opacity-65">
          <div class="flex items-center">
            <span>{{item.name}}</span>
            <img v-if="i>1" @click="order(item.key,i)" class="w-2 h-2.5 ml-1 hand" :src="orderIndex===i?orderTypeName[orderType].img:orderTypeName[0].img" alt="">
          </div>
        </div>
      </template>
    </div>
    <!-- 展开-->
    <div  @scroll="scrollFun()" :class="isFull[0]?'flex-1':'flex-1'" class="flex first  flex-col   showY">
      <template v-for="(item,i) in tableData">
        <div  @click="selectRow(i)"  :class="row===i?'selectedRow':''" class=" hand   px-2.5  min-h-8.5  font-kdExp items-center flex  text-kd14px18px text-global-highTitle text-opacity-65">
          <a :href="getAddressHref(item.address)" target="_blank" :style="{width:flowHeader[0].width}" class="text-global-primary font-medium "> {{ smallToken(item.address) }}</a>
          <div :style="{width:flowHeader[1].width}" class="text-global-highTitle font-medium "> {{ pairName(item.token0_symbol,item.token1_symbol)}}</div>
          <div :style="{width:flowHeader[2].width}" class="flex-1 text-global-highTitle">
           <LiquidityFullChartTableItem :tip="true"  :token0="item.token0_symbol" :token1="item.token1_symbol"  :token0Money="item.net_inflow0" :token1Money="item.net_inflow1" :usdMoney="item.net_inflowusd" />
          </div>
          <div :style="{width:flowHeader[3].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartTableItem :tip="false"  :token0="item.token0_symbol" :token1="item.token1_symbol"   :token0Money="item.mints_amounts0" :token1Money="item.mints_amounts1" :usdMoney="item.mints_amountusd" />
          </div>
          <div :style="{width:flowHeader[4].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartTableItem :tip="false"  :token0="item.token0_symbol" :token1="item.token1_symbol"  :token0Money="item.burns_amounts0" :token1Money="item.burns_amounts1" :usdMoney="item.burns_amountusd" />
          </div>
          <div :style="{width:flowHeader[5].width}" class="text-center">{{ item.total_join_num?item.total_join_num:0 }}</div>
          <div :style="{width:flowHeader[6].width}" class="text-center">{{ item.mints_join_num?item.mints_join_num:0 }}</div>
          <div :style="{width:flowHeader[7].width}" class="text-center">{{ item.burns_join_num?item.burns_join_num:0 }}</div>
        </div>
          <!--        二次下钻-->
          <div v-if="row===i" class="px-2.5 openContainer">
            <LiquidityFullChartOpenDown :token0="item.token0_symbol" :token1="item.token1_symbol"   :address="item.address"  :pair_id="item.pair_id" :pairName="pairName(item.token0_symbol,item.token1_symbol)"/>
          </div>
      </template>
      <div class="w-full mb-1 text-center text-kd12px18px text-global-time">
        <div v-if="hasData && loading">加载中...</div>
        <div v-else-if="hasData && !loading">上拉加载更多</div>
        <div v-else>没有更多了</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.donwBig{
  border:1px solid rgba(43, 141, 255, 0.24);
  border-radius: 4px;
}
.showY{
  @apply overFlow-hidden overFlow-y-scroll;
}
.selectedRow {
  @apply bg-global-primary bg-opacity-8 flex items-center;
}

.openContainer {
  @apply  bg-global-primary bg-opacity-4;
}


.header {
  border-top: 1px solid rgba(37, 62, 111, 0.12);
  border-bottom: 1px solid rgba(37, 62, 111, 0.12);
}

.txtSmall {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


.showY::-webkit-scrollbar {
  height: 8px;
  @apply w-0.5;
}
.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
