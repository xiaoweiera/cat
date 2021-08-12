<script lang="ts" setup>
// @ts-ignore
import {ref} from 'vue'
</script>
<template>
  <div class=" flex justify-center   bg-global-white  h-full font-kdFang " >
    <div class="max-w-360  px-20  w-full h-full container ">
      <Apy2BaseHeader class="mt-8"/>
      <div class="flex mt-6">
        <div class="max-w-156 w-156 flex-1  mr-8" >
          <Apy2BaseRotate />
        </div>
        <ApyTwoBaseNotice class="mr-8"/>
        <Apy2BasePlayType />
      </div>
      <Apy2BaseWarnTip class="mt-6"/>
      <Apy2Chains class="mt-15"/>
      <div class="x-xian mt-6"></div>
      <div class="flex w-full py-6 bottomBorder">
        <div class="flex flex-1 ">
          <div class="flex-1  border-1 h-100 mr-8">图表</div>
        </div>
        <Apy2TopListMain  class="w-101.25 pl-8  leftBorder" />
      </div>
      <Apy2MiningPoolsMain class="mt-15"/>


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
