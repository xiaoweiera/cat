<script setup lang="ts">
import { defineProps } from 'vue'
const props=defineProps({
  data:Object,
})
const lookChart=`/apy/token?symbol=${props.data.symbol_alias}`
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  v-router.blank="data.project_url"  class="hand block">去挖矿</a>
    <a v-router.blank="lookChart"   class="mt-1 hand block">查看图表</a>
    <UiDialogBase  customClass="480px">
      <template #title>
        <div class="mt-1 hand">真实利率计算器</div>
      </template>
      <template #content>
        <Apy2Calculator :chain="data.chain"  :lendCoin="data.lending_symbol" :loanCoin="data.symbol_alias" :project_id="data.project_id" />
      </template>
    </UiDialogBase>
  </div>
</template>
<style scoped lang="scss">
</style>