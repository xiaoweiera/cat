<script setup lang="ts">
</script>

<template>
  <div class="count-group">
    <slot></slot>
  </div>
</template>

<style scoped lang="postcss">
  .count-group {
    counter-reset: number;
  }
</style>
