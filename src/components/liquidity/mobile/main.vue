<script lang="ts" setup>

</script>
<template>
  <div class="bg-global-white pt-4">
    <div class="px-4">
      <LiquidityMobileSelectContainer />
      <LiquidityMobileInfo/>
    </div>
    <div  style="border-bottom:1px solid #F1F3F5;" class="mt-4.25"></div>
    <div class="px-4 pb-4.25">
      <LiquidityMobileChangeTypeTag/>
      <LiquidityMobileFilterOption/>
    </div>
  </div>
  <div>
    <LiquidityMobileChartMainChart/>
  </div>
</template>