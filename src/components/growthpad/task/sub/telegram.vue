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
  <div class="flex items-center">
    <el-input v-model="input" placeholder="输入您加入电报群的ID" size="small" />
    <div>
      <slot></slot>
    </div>
  </div>
</template>
