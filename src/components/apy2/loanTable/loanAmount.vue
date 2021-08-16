
<script setup lang="ts">
import { defineProps } from 'vue'
const props=defineProps({
  value:String
})
</script>
<template class="font-kdExp">
  <div class="text-kd14px20px text-global-highTitle text-opacity-85">
    ${{value}}
  </div>
</template>
<style scoped lang="scss">
</style>