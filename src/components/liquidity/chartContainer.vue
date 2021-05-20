<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  chartData: Object,
})
</script>
<template>
  <div
    class="
      flex flex-col
      p-4
      w-full
      h-106
      min-h-106
      mb-5
      bg-white
      font-kdFang
      chartContainer
    "
  >
    <!--    图表的信息-->
    <div class="text-kd18px28px text-global-default opacity-85">
      {{ chartData.title }}
    </div>
    <div class="text-kd13px19px text-global-default opacity-45">
      {{ chartData.des }}
    </div>
    <LiquidityChart :chart-data="chartData" />
  </div>
</template>
<style scoped lang="postcss">
.chartContainer {
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(44, 140, 248, 0.12);
  border-radius: 2px;
}
</style>
