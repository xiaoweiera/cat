<script setup lang="ts">
import { ref } from 'vue'
const filterDay = ref([
  { name: '1H', value: '1H', selected: false },
  { name: '1D', value: '1D', selected: true },
])
</script>
<template>
  <div class="flex items-center">
    <LiquidityTime />
    <LiquidityFilterType tag-type="interval" :filter-data="filterDay" />
  </div>
</template>
