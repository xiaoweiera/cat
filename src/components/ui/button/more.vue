<script setup lang="ts">
import { ref } from 'vue'

const loading = ref<boolean>(false)

const onClick = function() {
  if (loading.value) {
    return false
  }
  loading.value = true
}
</script>

<template>
  <div v-login class="inline-block w-50 h-8.5 rounded bg-global-highTitle bg-opacity-6 text-center cursor-pointer" @click="onClick">
    <div class="h-full flex items-center justify-center">
      <IconFont v-if="loading" type="loading" suffix="png" size="18"/>
      <span v-else class="text-global-highTitle text-opacity-65 text-sm leading-5">加载更多</span>
    </div>
  </div>
</template>

<style scoped>
</style>
