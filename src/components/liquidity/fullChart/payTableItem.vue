<script setup lang="ts">
import { defineProps,computed } from 'vue'
import {formatRulesPrice} from '~/lib/tool'
import {tokenIsPlace,getAddressHref} from '~/logic/liquidity/dataTool'
import {symbolStore} from '~/store/liquidity/state'
const props=defineProps({
  tip:Boolean,
  symbol0:String,
  symbol1:String,
  symbol0Number:Number,
  symbol0Fund:Number,
  symbol1Number:Number,
  symbol1Fund:Number,
})
const getNumber=(v:number)=>{
  if(v==='-') return props.tip?'+0':'0'
  return props.tip? (v>=0?'+'+v:v):v
}
const isChangePlace=computed(()=> tokenIsPlace(symbolStore.name,props.symbol0,props.symbol1))
const number=computed(()=>isChangePlace.value?props.symbol1Number:props.symbol0Number)
const fund=computed(()=>isChangePlace?props.symbol1Fund:props.symbol0Fund)
const tokenName=computed(()=>isChangePlace?props.symbol1:props.symbol0)
const isNull=computed(()=>{
  if(!number.value && fund.value && tokenName.value){
    return false
  }
  return true
})
</script>
<template>
  <div v-if="isNull" class="flex  items-center flex-wrap">
    <span class="text-global-default text-opacity-65">≈</span>
    <div v-if="!isChangePlace" class="flex items-center ml-1.2">
      <span class="font-medium text-kd14px18px  ">{{formatRulesPrice(fund)}}</span>
      <span class="font-normal text-global-kd12px16px text-global-default text-opacity-65 ml-0.5">{{formatRulesPrice(number)}}</span>
      <span class="font-normal text-global-kd12px16px text-global-default text-opacity-65 ml-0.5">{{tokenName}}</span>
    </div>
  </div>
  <div v-else>
    --
  </div>
</template>
<style scoped lang="postcss">

</style>
