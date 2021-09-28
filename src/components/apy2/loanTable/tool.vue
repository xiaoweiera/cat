<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import { defineProps } from 'vue'
const props=defineProps({
  data:Object,
})
const lookChart=`/apy/token?symbol=${props.data.symbol_alias}`
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  v-router.blank="data.project_url"  class="hand block">{{I18n.apyIndex.lendFarm}}</a>
<!--    <a v-router.blank="lookChart"   class="mt-1 hand block">{{I18n.apyIndex.viewChart}}</a>-->
  </div>
</template>
<style scoped lang="scss">
</style>