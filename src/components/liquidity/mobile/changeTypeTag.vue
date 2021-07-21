<script lang="ts" setup>
import {analysisType} from '~/store/liquidity/state'
import I18n from '~/utils/i18n/index'
const changeTag=(type:string)=>{
  analysisType.value=type
}
</script>
<template>
  <div class=" container flex items-center  bg-global-bgHui h-10.5 px-1  font-kdFang ">
    <div v-login  @click="changeTag('flow')" :class="analysisType==='flow'?'selectedTag':'tag'">{{I18n.liquidity.mobile.flow}}</div>
    <div v-login  @click="changeTag('pay')" :class="analysisType==='pay'?'selectedTag':'tag'">{{I18n.liquidity.mobile.pay}}</div>
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
