<script setup lang="ts">
import { defineProps } from 'vue'
import {formatRulesPrice} from '~/lib/tool'

const props=defineProps({
  token0:String,
  token1:String,
  token0Money:Number,
  token1Money:Number,
  usdMoney:Number
})
const getNumber=(v:number)=>{
  if(v==='-') return '+0'
  return v>=0?'+'+v:v
}
</script>
<template>
  <div class="flex items-center flex-wrap">
    <div class="whitespace-nowrap flex items-center"><span class="text-global-highTitle text-kd15px18px ">{{getNumber(formatRulesPrice(token0Money))}}</span><span class="text-global-default text-opacity-65 text-kd12px18px ml-0.5">({{token0}})</span></div>
    <div class="whitespace-nowrap flex items-center"><span class="text-global-highTitle text-kd15px18px whitespace-nowrap">{{getNumber(formatRulesPrice(token1Money))}}</span><span class="text-global-default text-opacity-65 text-kd12px18px ml-0.5">({{token1}})</span></div>
    <div class="text-global-highTitle whitespace-nowrap  text-kd12px16px font-kdFang">≈${{formatRulesPrice(usdMoney)}}</div>
<!--    <div>-->
<!--      <div class=""><span class="text-global-highTitle">{{formatRulesPrice(token0Money)}}</span><span class="text-global-default text-opacity-65 ml-0.5">{{formatRulesPrice(token0)}}</span></div>-->
<!--      <div class=""><span class="text-global-highTitle">{{formatRulesPrice(token1Money)}}</span><span class="text-global-default text-opacity-65 ml-0.5">{{formatRulesPrice(token1)}}</span></div>-->
<!--    </div>-->
<!--    <div class="text-global-default text-opacity-65 ml-1.5">≈${{formatRulesPrice(usdMoney)}}</div>-->
  </div>
</template>
<style scoped lang="postcss">

</style>
