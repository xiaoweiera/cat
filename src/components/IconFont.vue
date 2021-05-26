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

@mixin size($number) {
  width: $number;
  height: $number;
  max-width: $number;
  max-height: $number;
  min-width: $number;
  min-height: $number;
}

.size-2xl {
  @include size(24px);
}

.size-xl {
  @include size(20px);
}
.size-base {
  @include size(16px);
}
.size-xs {
  @include size(12px);
}

.icon-loading {
  transform-origin: 50% 50%;
  animation: rotating 0.7s linear infinite;
}

.icon-plus {
  @include size(42px);
}
</style>
