<script setup lang="ts">
import { defineProps,onMounted,computed } from 'vue'
import {  setInject, getInject } from '~/utils/use/state'
const props=defineProps({
  desc:String,
  config:Object,
  chartType:String,
  chartId:String,
  coinType:Object,
})
const title=getInject('title')
const pairData=getInject('pairData')
const tokenData=getInject('tokenData')
const isShowUsdCoin=()=>{
  if((!pairData.value[0].id && props.config[props.chartType].tokenCofig.usdCoin) || (pairData.value[0].id && props.config[props.chartType].pairCofig.usdCoin)){
    return true
  }
  return false
}
const titleDesc= computed((): string => {
  console.log('ttt')
  if(!pairData.value[0].id){
    return ['',`${tokenData.value[0].name} ${title.value[0]}`]
  }else{
    return[`${tokenData.value[0].name}`,`${pairData.value[0].name} ${title.value[0]}`]
  }
})
onMounted(()=>{
  isShowUsdCoin()})
</script>
<template>
    <div class="font-kdFang">
      <div class="flex items-center justify-between">
        <div class="text-global-default text-opacity-85 text-kd18px28px font-semibold">
          <div class="flex items-center" v-if="title[0]">
            <span>{{titleDesc[0]}}</span>
            <img v-if="titleDesc[0]"  class="w-3 h-3 mx-1.5" src="https://res.ikingdata.com/nav/liquidityRightTip.jpg" alt="">
            <span>{{titleDesc[1]}}</span>
          </div>
        </div>

        <div class="flex">
          <LiquidityFullChartTime class="mr-3.5"/>
          <LiquidityFullChartInterval class="mr-3.5"/>
          <LiquidityFullChartUsdCoin v-if="isShowUsdCoin()"/>
        </div>
      </div>
      <div class="text-kd13px19px text-global-default mt-1.5  opacity-65">{{props.desc}}</div>
    </div>
  <div class="absolute right-25  z-10 text-kd13px19px text-global-default mt-1.5  opacity-35">* 点击柱图可进行数据过滤</div>
</template>
<style scoped lang="postcss">

</style>
