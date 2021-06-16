<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { platStore, pairStore, sidePair } from '~/store/liquidity/state'
const chartType = reactive({ type: 'flow' })
</script>
<template>
  <div class="flex flex-1 flex-col">
    <!--    右侧第一个header-->
    <LiquidityMainHeader :chartType="chartType" />
    <!--    右侧第二个header-->
    <LiquidityMainToken v-if="sidePair.name" :pair-store="pairStore" />
    <!--    图表集合-->
    <LiquidityMainChart :chart-type="chartType" />
  </div>
</template>
