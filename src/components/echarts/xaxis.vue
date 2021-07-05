<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  type: {
    type: String,
    default () {
      return 'category'
    },
    boundaryGap: {
      type: [Boolean, Array],
      default() {
        return false
      }
    },
    data: {
      type: Array,
      required: true
    }
  }
})
</script>

<template>
  <p>xAxis</p>
</template>
