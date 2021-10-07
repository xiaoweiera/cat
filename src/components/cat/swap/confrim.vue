<script lang='ts' setup>
import {defineProps,ref,watch} from 'vue'
import { imgSrc } from '~/logic/cat/config'
const swapState=ref('noWallet') //noWallet noToken noAmount noBalance approve swap
//按钮事件
const swap=()=>{
  //方法体
  setTimeout(()=>{
      swapState.value='noToken'
  },1000)
}
</script>
<template>
<!--  noWallet-->
  <div v-if='swapState==="noWallet"' @click='swap()' class='h-11 rounded-kd12px mt-4  hand bg-global-primary flex justify-center items-center'>
    <img :src='`${imgSrc}/wallet.png`' class='w-6 h-6' alt=''>
    <div class='text-global-white ml-1.5 text-kd16px24px font-semibold'>Connect Wallet</div>
  </div>
  <!--  noToken-->
  <div v-if='swapState==="noToken"'  class='h-11 rounded-kd12px mt-4  hand bg-global-buttonHui flex justify-center items-center'>
    <div class='text-global-hui ml-1.5 text-kd16px24px font-semibold'>Select a token</div>
  </div>
</template>