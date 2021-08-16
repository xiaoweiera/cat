<script setup lang="ts">
import {chainsIcon} from '~/logic/apy2/config'
</script>
<template>
<div calss="font-kdExp w-full ">
  <div class="flex justify-between w-full ">
    <div>
      <div>
        <span class="text-kd12px20px text-global-highTitle mr-1.5">BTC</span>
        <span class="text-kd12px20px text-global-highTitle text-opacity-65"><span>TVL:$</span><span>231231</span></span>
      </div>
      <div class="flex items-center">
        <img class="w-3.5 h-3.5 mr-1" :src="chainsIcon['bsc']" alt="">
        <IconFont type="icon-V" size="14"/>
      </div>
    </div>
<div class="text-kd12px20px text-global-highTitle text-opacity-85">APY:  <span>34.33</span>%</div>
  </div>

</div>
</template>
<style scoped lang="scss">

</style>