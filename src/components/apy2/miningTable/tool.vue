<script setup lang="ts">
import { defineProps,reactive } from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  project_url:String,
  tokenName:String,
  id:Number | String
})
const pcTip=reactive({value:false})
const lookChart=`/apy/token?symbol=${props.tokenName}`
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  v-router.blank="project_url"  class="hand block">{{I18n.apyIndex.miningFarm}}</a>
    <Apy2PoolDialog class="xshidden" type="mining"  :id="id" >
      <template #reference>
        <div    class="mt-1 hand block">{{I18n.apyIndex.viewChart}}</div>
      </template>
    </Apy2PoolDialog>
    <div    class="mt-1 hand block mdhidden"  @click="pcTip.value=true">{{I18n.apyIndex.viewChart}}</div>
  </div>
  <UiDialogPcTip   :pcTip="pcTip"/>
</template>
<style scoped lang="scss">
</style>