<script setup lang="ts">
import {ref, onMounted,defineProps} from 'vue'
import {payOpenHeader,typeName} from '~/logic/liquidity/down'
import {smallToken, formatRulesPrice,formatTime} from '~/lib/tool'
import {getTxHref} from '~/logic/liquidity/dataTool'
import {selectX} from '~/store/liquidity/state'
import * as R from 'ramda'
import {getInject } from '~/utils/use/state'
import {translate_second_level} from '~/api/liquidity'
const interval=getInject('interval')
const timeParam=getInject('timeParam')
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
  page_size:50,
  pair_id:props.pair_id,
  ts:selectX.ts?selectX.ts:timeParam.value[0].timeEnd,
  interval:interval.value[0],
  address:props.address
}
const hasData=ref(true)
const tableData=ref([])
const loadingOpen=ref(false)
const getData=async ()=>{
  console.log('aaa')
  loadingOpen.value=true
  const res=await translate_second_level(param)
  if(res.data.code===0) {
    loadingOpen.value=false
    hasData.value=res?.data?.data?.next?true:false
    R.map(item => tableData.value.push(item), res?.data?.data?.results)
  }
}
const scrollFun=()=>{
  const listDom = document.querySelector('.second')
  if ((parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight && hasData.value)) {
    param.page++
    getData()
  }
}
onMounted(()=>{
  getData()
})

</script>
<template>
  <Spin class="min-h-30" :loading="loadingOpen">
    <div >
      <div class="flex py-2.5   items-center">
        <template v-for="item in payOpenHeader">
          <div class="flex-1 text-kd12px16px text-global-default text-opacity-65">{{ item.name }}</div>
        </template>
      </div>
      <div @scroll="scrollFun" class="max-h-70 showY second">
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
            <a :href="getTxHref(item.base_id)" target="_blank" class="openHeaderId">{{ smallToken(item.base_id) }}</a>
          </div>
        </template>
        <div class="w-full mb-2 text-center text-kd12px18px text-global-time">
          <div v-if="hasData && loadingOpen">加载中...</div>
          <div v-if="hasData && !loadingOpen">上拉加载更多</div>
          <div v-if="!hasData">没有更多了</div>
        </div>
      </div>
    </div>
  </Spin>
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
