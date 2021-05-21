<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
  },
})
const input = ''
</script>

<template>
  <div className="flex items-center">
    <el-input v-model="input" placeholder="输入您的TwitterID" size="small" />
    <div>
      <slot></slot>
    </div>
  </div>
</template>
