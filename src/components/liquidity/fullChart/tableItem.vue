<script setup lang="ts">
import { defineProps,computed } from 'vue'
import {formatRulesPrice,formatRulesNumber} from '~/lib/tool'

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
  return props.tip? (v>=0?'+$'+formatRulesNumber(v):'-$'+formatRulesNumber(Math.abs(v))):formatRulesNumber(v)
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
    <div class="text-global-highTitle whitespace-nowrap  text-kd14px18px font-kdFang"><span class="text-global-time mr-0.5">≈</span>{{getNumber(usdMoney)}}</div>
    <div class="ml-0.5 mr-0.5 whitespace-nowrap flex items-center text-global-default text-opacity-65 "><span class=" text-kd12px16px ">{{formatRulesNumber(props.token0Money)}}</span><span class="  text-kd12px18px ml-0.5">({{token0}})</span></div><span class="text-global-time">/</span>
    <div class="ml-0.5 whitespace-nowrap flex items-center text-global-default text-opacity-65 "><span class="text-kd12px16px whitespace-nowrap">{{formatRulesNumber(token1Money)}}</span><span class="text-kd12px18px ml-0.5">({{token1}})</span></div>
  </div>
  <div v-else>
    --
  </div>
</template>
<style scoped lang="postcss">

</style>
