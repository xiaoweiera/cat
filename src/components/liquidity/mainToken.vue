<script setup lang="ts">
import { ref } from 'vue'
const filterType = ref([
  { name: 'Pair', value: 'pair', selected: true },
  { name: 'ETH', value: 'eth', selected: false },
  { name: 'USDT', value: 'usdt', selected: false },
])
</script>
<template>
  <div class="flex h-13.5 items-center justify-between px-5 bg-white">
    <!--    选择的token标签-->
    <div class="flex items-center">
      <div class="bg-global-primary bg-opacity-8 rounded px-1.5 py-0.4">
        <span
          class="text-kd16px160 text-global-primary font-kdExp"
        >ETH/USDT</span>
        <span
          class="text-kd14px160 text-global-primary font-kdFang ml-2.5"
        >(0xc02a...6cc2)</span>
      </div>
      <img
        class="w-4 h-4 ml-1.5"
        src="https://res.ikingdata.com/nav/cardClose.png"
        alt=""
      />
    </div>
    <!--    筛选-->
    <div>
      <LiquidityFilterType :filter-data="filterType" />
    </div>
  </div>
</template>
<style scoped lang="postcss"></style>
