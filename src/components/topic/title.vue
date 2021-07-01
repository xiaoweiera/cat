<script setup lang="ts">
/**
 * @file 内容标题
 */
import { defineProps } from 'vue'
defineProps({
  menu: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center px-5 bg-white h-14 page-title">
    <IconFont class="mr-2 inline-flex" :type="menu.icon_image" size="2xl"></IconFont>
    <b class="inline-block leading-6 text-lg">{{ menu.title || menu.name }}</b>
  </div>
</template>

<style lang="scss" scoped>
  .page-title {
    color: #445a84;
    box-shadow: 0 4px 12px rgba(44,140,248, 0.08);
  }
</style>
