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

const copy = function() {
  console.log('copy')
}
</script>

<template>
  <span class="inline-block" @click.stop.prevent="copy">
    <slot></slot>
  </span>
</template>
