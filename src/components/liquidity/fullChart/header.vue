<script setup lang="ts">
import { defineProps,onMounted,ref,reactive } from 'vue'
import {  setInject, getInject } from '~/utils/use/state'
const props=defineProps({
  chartType:String,
  chartId:String,
  coinType:Object,
})



</script>
<template>
<div class="flex items-center justify-between">
  <div>
    标题
  </div>
  <div class="flex">
<!--    <LiquidityFullChartTime class="mr-3.5"/>-->
<!--    <LiquidityFullChartInterval class="mr-3.5"/>-->
    <LiquidityFullChartUsdCoin/>
  </div>

</div>
</template>
<style scoped lang="postcss">

</style>
