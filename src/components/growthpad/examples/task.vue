<script setup lang="ts">
  import { defineProps } from 'vue'
  defineProps({
    data: Object,
  })
</script>

<template>
  <div class="task-content">
  </div>
</template>

<style scoped lang="postcss">
  .task-content {
    border-radius: 64px;
    background: linear-gradient(90deg, rgba(43, 141, 254, 0.12) 0%, rgba(43, 141, 254, 0) 100%);
  }
</style>
