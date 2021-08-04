<script setup lang="ts">
import { defineProps,computed } from 'vue'
import {formatRulesPrice} from '~/lib/tool'

const props=defineProps({
  tip:Boolean,
  token0:String,
  token1:String,
  token0Money:Number,
  token1Money:Number,
  usdMoney:Number
})
const getNumber=(v:number)=>{
  if(v==='-') return props.tip?'+0':'0'
  return props.tip? (v>=0?'+'+v:v):v
}
const isNull=computed(()=>{
  if(!props.token0Money && !props.token1Money && !props.usdMoney){
    return false
  }
  return true
})
</script>
<template>
  <div v-if="isNull" class="flex items-center flex-wrap">
    <div class="mr-0.5 whitespace-nowrap flex items-center"><span class="text-global-highTitle text-kd15px18px ">{{formatRulesPrice(props.token0Money)}}</span><span class="text-global-default text-opacity-65 text-kd12px18px ml-0.5">({{token0}})</span></div>/
    <div class="ml-0.5 whitespace-nowrap flex items-center"><span class="text-global-highTitle text-kd15px18px whitespace-nowrap">{{getNumber(formatRulesPrice(token1Money))}}</span><span class="text-global-default text-opacity-65 text-kd12px18px ml-0.5">({{token1}})</span></div>
    <div class="text-global-highTitle whitespace-nowrap  text-kd12px16px font-kdFang">≈${{getNumber(formatRulesPrice(usdMoney))}}</div>
  </div>
  <div v-else>
    --
  </div>
</template>
<style scoped lang="postcss">

</style>
