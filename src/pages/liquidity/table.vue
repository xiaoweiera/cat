<script lang="ts" setup>
import {ref,toRaw} from 'vue'
import * as R from 'ramda'
import {smallToken,formatRulesPrice} from '~/lib/tool'
import {xiazuan} from '/mock/xiazuan'
const jj=200
const headers = [
  {name:'地址',width:'110px'},
  {name:'净添加量',width:''},
  {name:'添加总量',width:''},
  {name:'移除总量',width:''},
  {name:'参与次数',width:'60px'},
  {name:'添加次数',width:'60px'},
  {name:'移除次数',width:'60px'}]
const openHeaders=['时间','交易对','方向','净添加量','总价值']
const data=ref([
  {
    index:0,
    address:'北京',
    netAddNumber:'1000',
    allNumber:'2000',
    removeNumber:'1200',
    joinNumber:'1100',
    addNumber:'888',
    removeCount:'123'
  },
  {
    index:1,
    address:'石家庄',
    netAddNumber:'1300',
    allNumber:'4000',
    removeNumber:'3200',
    joinNumber:'2100',
    addNumber:'688',
    removeCount:'1231'
  }
])
const openData=ref([
  {
    time:'2021-03-19 11:35',
    pair:'ETH/USDT',
    position:'添加流动性',
    netAddNumber:'1ETH+1678.22USDT',
    money:'≈$1678.2'
  },
  {
    time:'2021-03-19 11:35',
    pair:'ETH/USDT',
    position:'添加流动性',
    netAddNumber:'1ETH+1678.22USDT',
    money:'≈$1678.2'
  },
])
const headerBg = () => {
  return 'background: rgba(43, 141, 254, 0.04)'
}
const tableData=xiazuan.one
const row=ref(0)
const selectRow=(index:number)=>{
  row.value=index
}
</script>
<template>
  <div class="w-full  mt-13 font-kdFang">
    <div class="table w-full h-full bg-global-white">
      <div class="header  px-2.5 h-9 flex items-center">
        <template v-for="item in headers">
          <div :style="{width:item.width}" :class="item.width?'':'flex-1'" class=" text-kd12px16px text-global-default text-opacity-65">{{item.name}}</div>
        </template>
      </div>
      <!--  -->
      <div class="flex flex-col">
        <template v-for="(item,i) in tableData">
          <div @click="selectRow(i)" :class="row===i?'selectedRow':''" class=" hand   px-2.5  h-8.5  font-kdExp items-center flex  text-kd14px18px text-global-highTitle text-opacity-65">
            <div :style="{width:headers[0].width}" class="text-global-primary font-medium "> {{ smallToken(item.addr)}}</div>
            <div :style="{width:headers[1].width}" class="flex-1 text-global-highTitle"> {{ formatRulesPrice(item.net_amount0)}}{{item.token0_symbol}}{{formatRulesPrice(item.net_amount1)}}{{item.token1_symbol}}  <span class="ml-1 text-global-default text-opacity-65 font-kdExp text-kd12px16px">${{formatRulesPrice(item.net_usd)}}</span></div>
            <div :style="{width:headers[2].width}" class="flex-1 text-global-highTitle"> {{ formatRulesPrice(item.total_amount0_in)}}{{item.token0_symbol}}{{formatRulesPrice(item.total_amount1_in)}}{{item.token1_symbol}}  <span class="ml-1 text-global-default text-opacity-65 font-kdExp text-kd12px16px">${{formatRulesPrice(item.total_amountusd_in)}}</span></div>
            <div :style="{width:headers[3].width}" class="flex-1 text-global-highTitle"> {{ formatRulesPrice(item.total_amount0_out)}}{{item.token0_symbol}}{{formatRulesPrice(item.total_amount1_out)}}{{item.token1_symbol}}  <span class="ml-1 text-global-default text-opacity-65 font-kdExp text-kd12px16px">${{formatRulesPrice(item.total_amountusd_out)}}</span></div>
            <div :style="{width:headers[4].width}" class="text-center">{{item.total_tx}}</div>
            <div :style="{width:headers[5].width}"  class="text-center">{{item.mint_tx}}</div>
            <div :style="{width:headers[6].width}"  class="text-center">{{item.burn_tx}}</div>
          </div>
        </template>

      </div>
    </div>
  </div>


</template>
<style scoped>
.selectedRow{
  @apply bg-global-primary bg-opacity-8;
}
.openContainer{
  @apply bg-global-primary bg-opacity-4;
}
.header{
  border-top:1px solid rgba(37, 62, 111, 0.12);
  border-bottom:1px solid rgba(37, 62, 111, 0.12);
}

</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
