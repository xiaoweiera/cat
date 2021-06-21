<script lang="ts" setup>
// @ts-ignore
import { reactive, onBeforeMount } from 'vue'
import {useRoute} from 'vue-router'
import {symbolStore,pairStore} from '~/store/liquidity/state'
const route = useRoute()
symbolStore.id=symbolStore.id?symbolStore.id:route.query.symbol
pairStore.id=pairStore.id?pairStore.id:route.query.pair

onBeforeMount(() => {
})
</script>
<template>
  <div class="flex w-full contentContainer" style="overflow-x: hidden">
    <LiquiditySideContainer />
    <LiquidityMainContainer />
  </div>
</template>
<style>
.contentContainer {
  display: flex;
  height: calc(100vh - 72px);
}
</style>
// @formatter:off
<route lang="yaml">
meta:
  layout: home
</route>
// @formatter:off
