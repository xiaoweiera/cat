<script lang="ts" setup>
import {ref, computed,onMounted,watch,defineProps} from 'vue'

import {flowHeader,flowOpenHeader,typeName} from '~/logic/liquidity/down'
import * as R from 'ramda'
import {smallToken, formatRulesPrice,formatTime} from '~/lib/tool'
import * as scroll from '~/utils/event/scroll'
import {getPairName} from '~/logic/liquidity/dataTool'
import {getDownFirstData} from '~/logic/liquidity/downTool'
import {pairStore, symbolStore} from '~/store/liquidity/state'
import {getInject,  setInject } from '~/utils/use/state'
import {xiazuan} from '/mock/xiazuan'
const props=defineProps({chartType:String})
const timeParam=getInject('timeParam')
const ts=getInject('ts')
const isFull=getInject('isFull')
const interval=getInject('interval')
const setIsFull=setInject('isFull')
const row = ref(-1)
const selectRow = (index: number) => row.value = index===row.value?-1:index
const full=()=>setIsFull(!isFull.value[0])
const change = (name: string) => tableData.value = xiazuan[name]
const pairName=(tokenName0:string,tokenName1:string)=> getPairName(symbolStore.name,tokenName0,tokenName1)
const param={
  platId:'1',
  page:1,
  page_size:20,
  pair_id:pairStore.id,
  symbol_id:symbolStore.id,
  ts:timeParam.value[0].timeEnd,
  interval:interval.value[0]
}
let hasData=true
const tableData=ref([])
watch(()=>ts.value[0],async (n)=>{
  param.ts=n
  param.page=1
  hasData=true
  row.value=-1
  tableData.value=[]
  await getData()
})
const getData=async ()=> {
  const data = await getDownFirstData(param, props.chartType, pairStore.id)
  if (data?.code === 0) {
    hasData = data?.data?.next ? true : false
    R.map(item => tableData.value.push(item), data?.data?.results)
  }
}
onMounted(async ()=>{
 await getData()
})

const scrollFun=()=>{
  const listDom = document.querySelector('.first')
  if ((parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight) && hasData) {
    param.page++
    getData()
  }
}
</script>
<template>
  <div class="mb-3 flex items-center relative text-kd18px28px overflow-hidden font-kdFang text-global-default text-opacity-85">
    <span>数据详解</span>
    <span class="text-global-default text-opacity-65 text-kd12px16px ml-1.5">点击列表地址可对图表数据过滤 </span>
    <img @click="full()" class="w-4 h-4 absolute right-0 hand" :src="isFull[0]?'https://res.ikingdata.com/liquidity/fullSmall.jpg':'https://res.ikingdata.com/liquidity/fullBig.jpg'" alt="">
  </div>
  <div :class="isFull[0]?'flex-1':'h-50'" class="flex flex-col  font-kdFang  w-full   overflow-hidden bg-global-white">
    <div class="header  px-2.5 min-h-9 mb-1  flex items-center">
      <template v-for="item in flowHeader">
        <div :style="{width:item.width}" :class="item.width?'':'flex-1'" class=" text-kd12px16px text-global-default text-opacity-65">
          {{ item.name }}
        </div>
      </template>
    </div>
    <!-- 二次展开-->
    <div  @scroll="scrollFun()" :class="isFull[0]?'flex-1':'flex-1'" class="flex first  flex-col   showY">
      <template v-for="(item,i) in tableData">
        <div @click="selectRow(i)"  :class="row===i?'selectedRow':''" class=" hand   px-2.5  min-h-8.5  font-kdExp items-center flex  text-kd14px18px text-global-highTitle text-opacity-65">
          <div :style="{width:flowHeader[0].width}" class="text-global-primary font-medium "> {{ smallToken(item.address) }}</div>
          <div :style="{width:flowHeader[1].width}" class="text-global-highTitle font-medium "> {{ pairName(item.token0_symbol,item.token1_symbol)}}</div>
          <div :style="{width:flowHeader[2].width}" class="flex-1 text-global-highTitle">
           <LiquidityFullChartTableItem  :token0="item.token0_symbol" :token1="item.token1_symbol"  :token0Money="item.net_inflow0" :token1Money="item.net_inflow1" :usdMoney="item.net_inflowusd" />
          </div>
          <div :style="{width:flowHeader[3].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartTableItem  :token0="item.token0_symbol" :token1="item.token1_symbol"   :token0Money="item.mints_amounts0" :token1Money="item.mints_amounts1" :usdMoney="item.mints_amountusd" />
          </div>
          <div :style="{width:flowHeader[4].width}" class="flex-1 text-global-highTitle">
            <LiquidityFullChartTableItem  :token0="item.token0_symbol" :token1="item.token1_symbol"  :token0Money="item.burns_amounts0" :token1Money="item.burns_amounts1" :usdMoney="item.burns_amountusd" />
          </div>
          <div :style="{width:flowHeader[5].width}" class="text-center">{{ item.total_join_num?item.total_join_num:0 }}</div>
          <div :style="{width:flowHeader[6].width}" class="text-center">{{ item.mints_join_num?item.mints_join_num:0 }}</div>
          <div :style="{width:flowHeader[7].width}" class="text-center">{{ item.burns_join_num?item.burns_join_num:0 }}</div>
        </div>
          <!--        二次下钻-->
          <div v-if="row===i" class="px-2.5 openContainer">
            <LiquidityFullChartOpenDown :token0="item.token0_symbol" :token1="item.token1_symbol"   :address="item.address" :pair_id="item.pair_id" :pairName="pairName(item.token0_symbol,item.token1_symbol)"/>
          </div>
      </template>

    </div>
  </div>
</template>
<style scoped>
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
