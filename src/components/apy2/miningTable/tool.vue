<script setup lang="ts">
import { defineProps } from 'vue'
const props=defineProps({
  data:Object,
  project_url:String,
  tokenName:String
})
const lookChart=`/apy/token?symbol=${props.tokenName}`
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  v-router.blank="project_url"  class="hand">去挖矿</a>
    <a v-router.blank="lookChart"   class="mt-1 hand">查看图表</a>
  </div>
</template>
<style scoped lang="scss">
</style>