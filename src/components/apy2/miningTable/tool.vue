<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  project_url:String,
  tokenName:String
})
const lookChart=`/apy/token?symbol=${props.tokenName}`
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  v-router.blank="project_url"  class="hand block">{{I18n.apyIndex.miningFarm}}</a>
    <div    class="mt-1 hand block">{{I18n.apyIndex.viewChart}}</div>
  </div>
</template>
<style scoped lang="scss">
</style>