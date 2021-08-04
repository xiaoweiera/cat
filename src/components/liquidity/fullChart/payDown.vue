<script lang="ts" setup>
import {ref, computed,onMounted,watch,defineProps} from 'vue'

import {payHeader,typeName} from '~/logic/liquidity/down'
import * as R from 'ramda'
import {smallToken, formatRulesPrice,formatTime} from '~/lib/tool'
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
  interval:interval.value[0]
}
const loading=ref(true)
let hasData=ref(true)
const tableData=ref([])
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
  console.log('pay')
  await getData()
})
const fullButtonName=computed(()=> isFull.value[0]?'点击缩小表格':'点击放大表格')
const scrollFun=()=>{
  const listDom = document.querySelector('.first')
  if ((parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight) && hasData.value) {
    param.page++
    getData()
  }
}
</script>
<template>
  <Spin class="min-h-120" :loading="loading">
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
        <template v-for="item in payHeader">
          <div :style="{width:item.width}" :class="item.width?'':'flex-1'" class=" text-kd12px16px text-global-default text-opacity-65">
            {{ item.name }}
          </div>
        </template>
      </div>
      <!-- 二次展开-->
      <div  @scroll="scrollFun()" :class="isFull[0]?'flex-1':'flex-1'" class="flex first  flex-col   showY">
        <template v-for="(item,i) in tableData">
          <div  @click="selectRow(i)"  :class="row===i?'selectedRow':''" class=" hand   px-2.5  min-h-8.5  font-kdExp items-center flex  text-kd14px18px text-global-highTitle text-opacity-65">
            <a :href="getAddressHref(item.address)" target="_blank" :style="{width:payHeader[0].width}" class="text-global-primary font-medium "> {{ smallToken(item.address) }}</a>
            <div :style="{width:payHeader[1].width}" class="text-global-highTitle font-medium "> {{ pairName(item.token0_symbol,item.token1_symbol)}}</div>
            <div :style="{width:payHeader[2].width}" class="flex-1 text-global-highTitle">
<!--              <LiquidityFullChartPayTableItem :symbolItem="{}" />-->
             {{item.symbol0_flow_in_coin_number}}
              {{symbol0_flow_in_fund}}
            </div>
            <div :style="{width:payHeader[3].width}" class="flex-1 text-global-highTitle">
              {{item.symbol0_buy_coin_number}}
              {{symbol0_buy_fund}}
            </div>
            <div :style="{width:payHeader[4].width}" class="flex-1 text-global-highTitle">
              {{item.symbol0_sell_coin_number}}
              {{symbol0_sell_fund}}
            </div>
            <div :style="{width:payHeader[5].width}" class="text-center">{{ item.swap_count?item.total_join_num:0 }}</div>
            <div :style="{width:payHeader[6].width}" class="text-center">{{ item.buy_count?item.mints_join_num:0 }}</div>
            <div :style="{width:payHeader[7].width}" class="text-center">{{ item.sell_count?item.burns_join_num:0 }}</div>
          </div>
          <!--        二次下钻-->
          <div v-if="row===i" class="px-2.5 openContainer">
            <LiquidityFullChartOpenDown :token0="item.token0_symbol" :token1="item.token1_symbol"   :address="item.address"  :pair_id="item.pair_id" :pairName="pairName(item.token0_symbol,item.token1_symbol)"/>
          </div>
        </template>
        <div class="w-full mb-1 text-center text-kd12px18px text-global-time">
          <div v-if="hasData && loading">加载中...</div>
          <div v-if="hasData && !loading">上拉加载更多</div>
          <div v-if="!hasData">没有更多了</div>
        </div>
      </div>
    </div>
  </Spin>
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
