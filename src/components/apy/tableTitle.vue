<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: { type: String },
  timer: { type: Number },
})
</script>
<template>
  <div class="xshidden flex justify-center items-center">
    <div
      style="font-size: 24px"
      class="text-global-highTitle font-medium mr-1.5"
    >
      {{ title }}
    </div>
    <div class="text-kd14px20px font-normal text-global-default opacity-65">
      ({{ timer }} 秒后更新)
    </div>
  </div>
</template>
