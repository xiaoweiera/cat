<script setup lang="ts">
import { defineProps } from 'vue'
// @ts-ignore
import { toNumber } from '~/utils'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center justify-between w-full text-xs">
    <div class="flex-1 w-1">
      <div class="whitespace-nowrap max-w-full truncate">
        <span class="text-global-highTitle">{{ data.symbol }}</span>
        <span class="ml-1 text-global-highTitle text-opacity-65">TVL:${{ toNumber(data.tvl) }}</span>
      </div>
      <div class="flex items-center">
        <IconFont :type="data.chain" size="14"/>
        <IconFont class="ml-1" :type="data.pool_type" size="14"/>
        <span class="text-global-highTitle text-opacity-65 ml-1">{{ data.strategy_tags }}</span>
      </div>
    </div>
    <div class="ml-2">
      <span class="text-global-highTitle text-opacity-85">APY:{{ toNumber(data.apy) }}%</span>
    </div>
  </div>
</template>
