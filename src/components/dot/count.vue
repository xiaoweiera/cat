<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
  size: {
    validator(value: string): boolean {
      return ['sm', 'lg'].includes(value)
    },
    default: (): string => {
      return 'sm'
    },
  },
})
// className
const className = computed(() => {
  const data = {}
  data[props.size] = true
  data['skin-blue'] = true
  return data
})
</script>

<template>
  <span class="inline-block font-kdFang" :class="className"></span>
</template>

<style scoped lang="postcss">
.inline-block {
  text-align: center;
  line-height: 24px;
  border-radius: 50%;
}
.inline-block:before {
  display: inline;
  counter-increment: number;
  content: counter(number);
}
.sm {
  width: 24px;
  height: 24px;
  font-size: 16px;
}
.lg {
  width: 42px;
  height: 42px;
  font-size: 28px;
}
.skin-blue {
  color: #fff;
  background: #2b8dfe;
}
</style>
