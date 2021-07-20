<script lang="ts" setup>
import {analysisType} from '~/store/liquidity/state'
const changeTag=(type:string)=>{
  analysisType.value=type
}
</script>
<template>
  <div class=" container flex items-center  bg-global-bgHui h-10.5 px-1 mt-4 font-kdFang ">
    <div @click="changeTag('flow')" :class="analysisType==='flow'?'selectedTag':'tag'">流动性分析</div>
    <div @click="changeTag('pay')" :class="analysisType==='pay'?'selectedTag':'tag'">交易数据分析</div>
  </div>
</template>
<style scoped lang="postcss">
.container{
  border-radius: 12px;
}
.tag{
  border-radius: 8px;
  text-align: center;
  @apply  p-2 text-global-default text-opacity-65 text-kd14px18px  flex-1;
}
.selectedTag{
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  text-align: center;
  @apply  p-2 text-global-primary text-kd14px18px bg-global-white  flex-1;
}
</style>
