<script lang="ts" setup>
// @ts-ignore
import { reactive, onBeforeMount } from 'vue'
import {useRoute} from 'vue-router'
import {symbolStore,pairStore} from '~/store/liquidity/state'
const route = useRoute()
symbolStore.id=route.query.token?route.query.token:symbolStore.id
pairStore.id=route.query.pair?route.query.pair:pairStore.id
</script>
<template>
  <div class="flex w-full contentContainer" style="overflow-x: hidden">
    <LiquiditySideContainer />
    <LiquidityMainContainer />
  </div>
</template>
<style>
.el-message{
  width:160px !important;
  min-width: 160px !important;
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
