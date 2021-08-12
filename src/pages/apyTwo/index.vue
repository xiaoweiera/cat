<script lang="ts" setup>
// @ts-ignore
import {ref} from 'vue'
</script>
<template>
<div class="  bg-global-white w-full h-full font-kdFang ">
  <div class="max-w-360 px-20 container">
    <ApyTwoBaseHeader class="mt-8"/>
    <div class="flex mt-6">
      <div class="max-w-156 w-156 flex-1  mr-8" >
        <ApyTwoBaseRotate />
      </div>
      <ApyTwoBaseNotice class="mr-8"/>
      <ApyTwoBasePlayType />
    </div>
    <ApyTwoBaseWarnTip class="mt-6"/>
    <ApyTwoChains class="mt-15"/>
    <div class="x-xian mt-6"></div>
    <div class="flex w-full py-6 bottomBorder">
      <div class="flex flex-1">
        <div class="w-full border-1 h-100 mr-8">图表</div>
      </div>
      <ApyTwoTopListMain  class="w-101.25 pl-8  leftBorder" />
    </div>
    <ApyTwoMiningPoolsMain class="mt-15"/>


    <div class="h-50">1</div>
  </div>

</div>
</template>
<style scoped>
.x-xian{
  border:0.5px solid rgba(3, 54, 102, 0.06);
}
.bottomBorder{
  border-bottom:1px solid rgba(3, 54, 102, 0.06);
}
.leftBorder{
  border-left:1px solid rgba(3, 54, 102, 0.06);
}
</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
