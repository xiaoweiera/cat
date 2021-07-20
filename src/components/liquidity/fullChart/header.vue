<script setup lang="ts">
import { defineProps,onMounted,computed } from 'vue'
import {  setInject, getInject } from '~/utils/use/state'
import {titleCofig,isSymbol0Symbol1} from '~/logic/liquidity/dataCofig'
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
  // if(!title.value[0]) return ['','']
  // if(!pairData.value[0].id) return [,title.value[0]]
  // if(titleCofig[props.chartId] && titleCofig[props.chartId].change){
  //   const symbol0=pairData.value[0].name?pairData.value[0].name.split('/')[0]+' ':''
  //   const coin=isSymbol0Symbol1.includes(props.chartId)?tokenData.value[0].name:symbol0
  //   if(titleCofig[props.chartId].replaceStr){
  //     return [tokenData.value[0].name,title.value[0].replace(titleCofig[props.chartId].replaceStr,' '+coin+' '+titleCofig[props.chartId].replaceStr)]
  //   }else{
  //     return [tokenData.value[0].name,title.value[0]+' '+coin]
  //   }
  // }else{
  //   return [tokenData.value[0].name,title.value[0]]
  // }
  if(!pairData.value[0].id){
    return ['',`${tokenData.value[0].name} ${title.value[0]}`]
  }else{
    return[`${tokenData.value[0].name}`,`${pairData.value[0].name} ${title.value[0]}`]
  }
})
const getTitleDesc=(title:string)=>{
  if(!title.value[0]) return ''
  if(!pairData.value[0].id) return title.value[0]
  if(titleCofig[props.chartId] && titleCofig[props.chartId].change){
    const symbol0=pairData.value[0].name?pairData.value[0].name.split('/')[0]+' ':''
    const coin=isSymbol0Symbol1.includes(props.chartId)?tokenData.value[0].name:symbol0
    if(titleCofig[props.chartId].replaceStr){
      return title.value[0].replace(titleCofig[props.chartId].replaceStr,' '+coin+' '+titleCofig[props.chartId].replaceStr)
    }else{
      return title.value[0]+' '+coin
    }
  }else{
    return title.value[0]
  }
}
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
