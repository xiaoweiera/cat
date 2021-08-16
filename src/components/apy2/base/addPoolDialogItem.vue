<script setup lang="ts">
import {chainsIcon} from '~/logic/apy2/config'
</script>
<template>
<div class="font-kdExp w-full ">
  <div class="flex justify-between items-center w-full ">
    <div>
      <div>
        <span class="text-kd12px20px text-global-highTitle mr-1.5">BTC</span>
        <span class="text-global-highTitle text-opacity-65"><span><span class="text-kd12px20px ">TVL</span>: </span><span class="text-kd12px20px ">$231231</span></span>
      </div>
      <div class="flex items-center">
        <img class="w-3.5 h-3.5 mr-1" :src="chainsIcon['bsc']" alt="">
        <IconFont type="icon-V" size="14"/>
        <div class="ml-1 text-kd12px14px text-global-highTitle text-opacity-65">COW 策略</div>
      </div>

    </div>
      <div class="text-kd12px20px text-global-highTitle text-opacity-85">APY:  <span>34.33</span>%</div>
  </div>

</div>
</template>
<style scoped lang="scss">

</style>