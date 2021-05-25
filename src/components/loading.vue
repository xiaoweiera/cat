<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  value: {
    type: String,
    default() {
      return '验证中，审核结束后自动更新结果'
    },
  },
})
</script>

<template>
  <span class="loading py-1 px-3">
    <IconFont type="loading" suffix="jpg"></IconFont>
    <span class="text-xs ml-1">{{ value }}</span>
  </span>
</template>

<style scoped lang="scss">
.loading {
  color: #fff;
  background: #2b8dfe;
  border-radius: 12px;
  line-height: 20px;
  display: inline-block;
}
</style>
