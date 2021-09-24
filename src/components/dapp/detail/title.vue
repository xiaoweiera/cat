<script setup lang="ts">
import { compact } from '~/utils'
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
<div class="flex items-center">
  <span class="text-18 text-global-highTitle">{{ data.name }}</span>
  <template v-if="data.categories && compact(data.categories).length > 0">
    <template v-for="(value, index) in compact(data.categories)" :key="index">
      <span class="tag text-12-14">{{ value }}</span>
    </template>
  </template>
  <template v-if="data.high_risk">
    <span class="split"></span>
    <span class="tag warn">
      <IconFont type="icon-gaofengxian" size="14"/>
      <span class="text-12-14 ml-0.5">高风险</span>
    </span>
  </template>
</div>
</template>

<style scoped lang="scss">
.tag {
  @apply ml-1.5 px-2 py-1;
  @apply inline-block;
  @apply text-global-darkblue;
  @apply bg-global-darkblue bg-opacity-8;
  border-radius: 20px;
  &.warn {
    @apply flex items-center;
    @apply text-global-numRed;
    @apply bg-global-numRed bg-opacity-12;
  }
}
.split {
  width: 1px;
  @apply h-3 mx-3;
  @apply inline-block;
  @apply bg-global-highTitle bg-opacity-10;
  & + .tag {
    @apply ml-0;
  }
}
</style>
