<script lang="ts" setup>
// @ts-ignore
import { reactive, onBeforeMount } from 'vue'
const logos = reactive({})

onBeforeMount(() => {
  console.log('111')
})
</script>
<template>
  <div class="flex w-full contentContainer">
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
