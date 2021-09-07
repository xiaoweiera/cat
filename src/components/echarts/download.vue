<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
})

onMounted(() => {
  console.error('⚠️ EchartsDownload 已废弃, 请使用 UiDownloadButton')
})

</script>

<template>
  <UiDownloadButton :title="title"></UiDownloadButton>
</template>
