<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  const props = defineProps({
    value: [String, Number],
    size: {
      validator(value: string): boolean {
        return ['sm', 'lg'].includes(value)
      },
      default: (): string => {
        return 'sm'
      },
    },
  })

  const char = computed((): string => {
    const [text = ''] = `${props.value}`
    return text
  })

</script>

<template>
  <span class="dot inline-flex justify-center items-center" :class="size">{{ char }}</span>
</template>

<style scoped>
  .dot {
    background: #2749FC;
    border-radius: 50%;
    color: #fff;
  }
  .dot.sm {
    width: 24px;
    height: 24px;
  }
  .dot.lg {
    width: 42px;
    height: 42px;
    font-size: 28px;
  }
</style>
