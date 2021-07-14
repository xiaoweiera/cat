<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="chart-desc pt-3">
    <div class="flex justify-between items-center">
      <div>
        <label class="text-base">指标说明</label>
      </div>
      <div class="inline-block">
        <slot name="timeEnd"></slot>
      </div>
    </div>
    <p class="pt-1 chart-content text-sm">{{ data.desc }}</p>
  </div>
</template>

<style scoped lang="scss">
  $color: #445A84;
  .chart-desc {
    border-top: 1px solid #f0f0f0;
  }
  label {
    color: $color;
  }
  .chart-content {
    color: rgba($color, 0.65);
  }
</style>

