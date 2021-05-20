<script setup lang="ts">
import { echartData } from '/mock/liquidity'
</script>
<template>
  <div
    class="flex flex-1 h-full flex-col bg-global-body px-5 pt-3 chartContainer"
  >
    <template v-for="(item, i) in echartData" :key="i">
      <LiquidityChartContainer :chart-data="item" />
    </template>
  </div>
</template>
<style scoped lang="postcss">
.chartContainer {
  overflow: hidden;
  overflow-y: auto;
}
.chartContainer::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.chartContainer::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
