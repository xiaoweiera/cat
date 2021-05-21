<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
  },
})
</script>

<template>
  <a target="_blank" href="https://kingdata.com/">
    <slot></slot>
  </a>
</template>

<style scoped></style>
