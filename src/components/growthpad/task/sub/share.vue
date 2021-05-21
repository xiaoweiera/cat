<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
  },
})
</script>

<template>
  <a class="inline-block" target="_blank" href="http://kingdata.com">
    <slot></slot>
  </a>
</template>
