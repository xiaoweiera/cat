<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  width: {
    type: Number,
    default: () => 200
  }
})
</script>

<template>
  <el-popover popper-class="custom-popover" placement="top" title="" :width="width" trigger="hover">
    <template #reference>
      <slot name="label"></slot>
    </template>
    <div class="p-2">
      <slot name="content"></slot>
    </div>
  </el-popover>
</template>
