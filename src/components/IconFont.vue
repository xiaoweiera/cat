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
  size: {
    type: String,
    default() {
      return 'xl'
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
    <img
      class="inline-block none-select"
      :class="`icon-${type} size-${size}`"
      :src="src"
    />
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

.size-xl {
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  min-width: 20px;
  min-height: 20px;
}
.size-xs {
  width: 12px;
  height: 11px;
  max-width: 12px;
  max-height: 11px;
  min-width: 12px;
  min-height: 11px;
}

.icon-loading {
  transform-origin: 50% 50%;
  animation: rotating 0.7s linear infinite;
}
</style>
