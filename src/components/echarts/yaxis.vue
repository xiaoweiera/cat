<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  type: {
    type: String,
    default () {
      return 'value'
    }
  }
})
</script>

<template>
  <p>yAxis</p>
</template>

