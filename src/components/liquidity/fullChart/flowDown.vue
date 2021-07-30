<script lang="ts" setup>
import {ref, toRaw} from 'vue'
import {flowHeader,flowOpenHeader} from '~/logic/liquidity/down'
import * as R from 'ramda'
import {smallToken, formatRulesPrice} from '~/lib/tool'
import {getInject,  setInject } from '~/utils/use/state'
import {xiazuan} from '/mock/xiazuan'
const isFull=getInject('isFull')
const setIsFull=setInject('isFull')
const data = ref([
  {
    index: 0,
    address: '北京',
    netAddNumber: '1000',
    allNumber: '2000',
    removeNumber: '1200',
    joinNumber: '1100',
    addNumber: '888',
    removeCount: '123'
  },
  {
    index: 1,
    address: '石家庄',
    netAddNumber: '1300',
    allNumber: '4000',
    removeNumber: '3200',
    joinNumber: '2100',
    addNumber: '688',
    removeCount: '1231'
  }
])
const openData = ref([
  {
    time: '2021-03-19 11:35',
    pair: 'ETH/USDT',
    position: '添加流动性',
    netAddNumber: '1ETH+1678.22USDT',
    money: '≈$1678.2'
  },
  {
    time: '2021-03-19 11:35',
    pair: 'ETH/USDT',
    position: '添加流动性',
    netAddNumber: '1ETH+1678.22USDT',
    money: '≈$1678.2'
  },
])
const headerBg = () => {
  return 'background: rgba(43, 141, 254, 0.04)'
}
const tableData = ref(xiazuan['one'])
const row = ref(0)
const selectRow = (index: number) => {

  row.value = index===row.value?-1:index
}
const full=()=>setIsFull(!isFull.value[0])
const change = (name: string) => {
  tableData.value = xiazuan[name]
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
    <div :class="isFull[0]?'flex-1':'h-50'" class="flex   flex-col   showY">
      <template v-for="(item,i) in tableData">
        <div @click="selectRow(i)" :class="row===i?'selectedRow':''" class=" hand   px-2.5  min-h-8.5  font-kdExp items-center flex  text-kd14px18px text-global-highTitle text-opacity-65">
          <div :style="{width:flowHeader[0].width}" class="text-global-primary font-medium "> {{ smallToken(item.addr) }}
          </div>
          <div :style="{width:flowHeader[1].width}" class="flex-1 text-global-highTitle">
            +{{ formatRulesPrice(item.net_amount0) }}{{ item.token0_symbol }}+{{ formatRulesPrice(item.net_amount1) }}{{ item.token1_symbol }}
            <span class="ml-1 text-global-default text-opacity-65 font-kdExp text-kd12px16px">${{ formatRulesPrice(item.net_usd) }}</span>
          </div>
          <div :style="{width:flowHeader[2].width}" class="flex-1 text-global-highTitle">
            +{{ formatRulesPrice(item.total_amount0_in) }}{{ item.token0_symbol }}+{{ formatRulesPrice(item.total_amount1_in) }}{{ item.token1_symbol }}
            <span class="ml-1 text-global-default text-opacity-65 font-kdExp text-kd12px16px">${{ formatRulesPrice(item.total_amountusd_in) }}</span>
          </div>
          <div :style="{width:flowHeader[3].width}" class="flex-1 text-global-highTitle">
            +{{ formatRulesPrice(item.total_amount0_out) }}{{ item.token0_symbol }}+{{ formatRulesPrice(item.total_amount1_out) }}{{ item.token1_symbol }}
            <span class="ml-1 text-global-default text-opacity-65 font-kdExp text-kd12px16px">${{ formatRulesPrice(item.total_amountusd_out) }}</span>
          </div>
          <div :style="{width:flowHeader[4].width}" class="text-center">{{ item.total_tx }}</div>
          <div :style="{width:flowHeader[5].width}" class="text-center">{{ item.mint_tx }}</div>
          <div :style="{width:flowHeader[6].width}" class="text-center">{{ item.burn_tx }}</div>
        </div>
          <!--        二次下钻-->
          <div v-if="row===i" class="px-2.5 openContainer">
            <div class="flex py-2.5   items-center">
              <template v-for="item in flowOpenHeader">
                <div class="flex-1 text-kd12px16px text-global-default text-opacity-65">{{ item.name }}</div>
              </template>
            </div>
            <template v-for="item in openData">
              <div class="flex items-center min-h-4.5   ">
                <div class="openHeader">{{ item.time }}</div>
                <div class="openHeader">{{ item.pair }}</div>
                <div class="openHeader">{{ item.position }}</div>
                <div class="openHeader">{{ item.netAddNumber }}</div>
                <div class="openHeader">{{ item.money }}</div>
              </div>
            </template>
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

.openHeader{
  @apply mb-2.5 font-kdFang  flex-1  text-kd14px18px text-global-highTitle;
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
