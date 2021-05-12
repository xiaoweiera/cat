<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  const picture = 'https://res.ikingdata.com/icon'
  // 定义 icon 名称
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
  })
  // @ts-ignore
  const src = computed(() => {
    return `${picture}/${props.type}.svg`
  })
</script>

<template>
  <span class="inline-block">
    <img class="inline-block" :src="src" />
  </span>
</template>
