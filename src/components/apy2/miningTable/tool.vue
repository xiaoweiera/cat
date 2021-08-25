<script setup lang="ts">
import { defineProps } from 'vue'
const props=defineProps({
  data:Object,
  project_url:String
})
const a='/apy/loan'
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  v-router="project_url"   target="_blank" class="hand">去挖矿</a>
    <div class="mt-1 hand">查看图表</div>
  </div>
</template>
<style scoped lang="scss">
</style>