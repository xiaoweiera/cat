<script lang="ts" setup>
import { useProvide,setInject } from '~/utils/use/state'
const [tokenTableShow, ] = useProvide('tokenTableShow', false)
</script>
<template>
  <div class="bg-global-white pt-4">
    <div class="px-4 a">
      <LiquidityMobileSelectContainer />
      <LiquidityMobileInfo/>
    </div>
    <div  style="border-bottom:1px solid #F1F3F5;" class="mt-4.25"></div>
      <LiquidityMobileTokenTable />
    <div v-if="!tokenTableShow[0]" class="px-4 pb-4.25">
      <LiquidityMobileChangeTypeTag/>
      <LiquidityMobileFilterOption/>
    </div>
  </div>
  <div v-if="!tokenTableShow[0]">
    <LiquidityMobileChartMainChart/>
  </div>
</template>
<style>
.a{
  position: relative;
  z-index: 1000;
}
.b{
  position: relative;
  z-index: -1;
}
.showY {
  overflow: hidden;
  overflow-y: auto;
}
</style>