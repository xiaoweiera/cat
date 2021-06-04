<script setup lang="ts">
import { ref } from 'vue'
const filterDay = ref([
  { name: '1H', value: 'h', selected: true },
  { name: '1D', value: 'D', selected: false },
])
const filterCoin = ref([
  { name: 'USD', value: 'usd', selected: true },
  { name: '币', value: 'coin', selected: false },
])
</script>
<template>
  <div class="flex items-center">
    <LiquidityTime />
    <LiquidityFilterType tag-type="interval" :filter-data="filterDay" />
    <LiquidityFilterType tag-type="coinType" :filter-data="filterCoin" />
  </div>
</template>
