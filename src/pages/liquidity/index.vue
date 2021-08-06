<script lang="ts" setup>
// @ts-ignore
import {ref} from 'vue'
import I18n from '~/utils/i18n/index'

import {useRoute} from 'vue-router'
import {symbolStore, pairStore} from '~/store/liquidity/state'

const route = useRoute()
symbolStore.id = route.query.token ? route.query.token : symbolStore.id
pairStore.id = route.query.pair ? route.query.pair : pairStore.id
pairStore.name = route.query.pairName ? route.query.pairName : ''
const mobile=ref(false)
mobile.value=window.screen.width>768?false:true
window.addEventListener('resize', function() {
  mobile.value=window.screen.width>768?false:true
})
</script>
<template>
<!--  <UiDialogWebNewTipMain class="xshidden"/>-->
  <div v-if="!mobile" class="flex w-full contentContainer" style="overflow-x: hidden">
    <LiquiditySideContainer/>
    <LiquidityMainContainer/>
<!--    浮窗户-->
    <UiFixTip>
      <template #default="scope">
        <span class="inline-block md:text-center md:block text-kd12px16px font-medium leading-5 text-global-default text-opacity-85 md:whitespace-pre-line">
          <div class="md:block">{{ I18n.common.fixTip.content1 }}</div>
           <div class="md:block">{{ I18n.common.fixTip.content2 }}</div>
           <div class="md:block">{{ I18n.common.fixTip.content3 }}</div>
          <span>{{ I18n.common.fixTip.confirm }}</span>
        </span>
        <a class="inline-block ml-5 md:ml-0 md:block md:mt-2 cursor-pointer" target="_blank" v-router="I18n.growthpad.growthpad.about.telegram">
            <span class="md:w-full inline-block join-btn text-xs leading-4 py-1 px-3 text-center text-white">{{ I18n.common.chat.joinTelegram }}</span>
        </a>
      </template>
    </UiFixTip>
  </div>
  <div v-else class="w-full ">
    <LiquidityMobileMain class="pt-4"/>
  </div>
</template>
<style>
.el-message {
  width: 160px !important;
  min-width: 160px !important;
}
.join-btn {
  background: #2B8DFE;
  border-radius: 12px;
}
.contentContainer {
  display: flex;
  height: calc(100vh - 72px);
}
</style>
// @formatter:off
<route lang="yaml">
meta:
  layout: liquidityLayout
</route>
// @formatter:off
