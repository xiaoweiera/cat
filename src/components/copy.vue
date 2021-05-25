<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  message: {
    type: Boolean,
    default() {
      return true
    },
  },
  link: {
    type: [Function, String],
    default() {
      return ''
    },
  },
})
</script>

<template>
  <span v-copy.message="link" class="inline-block" @click.stop.prevent>
    <slot></slot>
  </span>
</template>
