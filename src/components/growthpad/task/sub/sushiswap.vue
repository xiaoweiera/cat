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
  <div class="check-box">
    <el-input
      v-model="input"
      placeholder="请输入验证的 ETH 地址"
      size="small"
    />
    <div class="suffix">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './input.scss';
</style>
