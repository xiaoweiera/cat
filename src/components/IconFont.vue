<script setup lang="ts">
import { defineProps, computed } from 'vue'
const picture = 'https://res.ikingdata.com/icon'
// 定义 icon 名称
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    default() {
      return 'svg'
    },
  },
})
// @ts-ignore
const src = computed(() => {
  return `${picture}/${props.type}.${props.suffix}`
})
</script>

<template>
  <span class="inline-block none-select">
    <img class="inline-block none-select" :class="`icon-${type}`" :src="src" />
  </span>
</template>

<style scoped lang="scss">
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
.icon-loading {
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  min-width: 20px;
  min-height: 20px;
  transform-origin: 50% 50%;
  animation: rotating 0.7s linear infinite;
}
.icon-telegram {
  width: 12px;
  height: 11px;
  max-width: 12px;
  max-height: 11px;
  min-width: 12px;
  min-height: 11px;
}
.icon-twitter {
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  min-width: 12px;
  min-height: 12px;
}
</style>
