<script setup lang="ts">
import {ref, onMounted,defineProps} from 'vue'
import {flowOpenHeader,typeName} from '~/logic/liquidity/down'
import {smallToken, formatRulesPrice,formatTime} from '~/lib/tool'
import * as R from 'ramda'
import {getInject } from '~/utils/use/state'
import {liquidity_second_level} from '~/api/liquidity'
const ts=getInject('ts')
const interval=getInject('interval')

const props=defineProps({
  token0:String,
  token1:String,
  address:String,
  pair_id:String,
  pairName:String
})
const param={
  platId:'1',
  page:1,
  page_size:20,
  pair_id:props.pair_id,
  ts:ts.value[0],
  interval:interval.value[0],
  address:props.address
}
let hasData=true
const tableData=ref([])

const getData=async ()=>{
  const res=await liquidity_second_level(param)
  if(res.data.code===0) {
    hasData=res?.data?.data?.next?true:false
    R.map(item => tableData.value.push(item), res?.data?.data?.results)
  }
}
const scrollFun=()=>{
  const listDom = document.querySelector('.second')
  if ((parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight && hasData)) {
    param.page++
    getData()
  }
}
onMounted(()=>{
  getData()
})

</script>
<template>
  <div class="">
    <div class="flex py-2.5   items-center">
      <template v-for="item in flowOpenHeader">
        <div class="flex-1 text-kd12px16px text-global-default text-opacity-65">{{ item.name }}</div>
      </template>
    </div>
    <div @scroll="scrollFun" class="h-28 showY second">
      <template v-for="item in tableData">
        <div class="flex items-center min-h-4.5   ">
          <div class="openHeader">{{ formatTime(item.timestamp,'YYYY-MM-DD HH:mm') }}</div>
          <div class="openHeader">{{ props.pairName }}</div>
          <div class="openHeader">{{ typeName[item.type] }}</div>
          <div class="openHeader">
            <span>{{ formatRulesPrice(item.amount0) }}{{props.token0}}</span>+
            <span>{{ formatRulesPrice(item.amount1) }}{{props.token1}}</span>
          </div>
          <div class="openHeader">${{ formatRulesPrice(item.amountusd) }}</div>
          <div class="openHeaderId">{{ smallToken(item.base_id) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.openHeader{
  @apply mb-2.5 font-kdFang  flex-1  text-kd12px18px text-global-highTitle;
}
.openHeaderId{
  @apply mb-2.5 font-kdFang  flex-1  text-kd12px18px text-global-primary;
}
.showY::-webkit-scrollbar {
  height: 8px;
  @apply w-0.5;
}
.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
