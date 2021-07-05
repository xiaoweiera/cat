<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<template>
  <div>
    <GrowthpadTaskTitle :data="data" class="flex justify-between items-center"/>
    <p v-if="data.rule" class="pt-1">
      <template v-for="(text, index) in data.rule" :key="index">
        <span class="block text-xs text-global-primary leading-4" v-html="text"></span>
      </template>
    </p>
    <div class="hidden">
      <!-- 此处样式在 v-for 中使用，动态使用 v-html 添加元素 -->
      <span class="text-global-numRed">&nbsp;</span>
    </div>
  </div>
</template>

