<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import {webTipData} from '~/logic/webTip'
import {setInject, getInject } from '~/utils/use/state'
const data=getInject('data')
const setdata=setInject('data')
const changeData=(item:any)=>{
  setdata(item)
}
</script>

<template>
  <div class="text-kdFang leftSide">
    <div class="flex items-center px-6 mb-3">
      <img class="w-7.5 " src="https://res.ikingdata.com/liquidity/leftYunTip.png" alt="">
      <div style="font-weight: 600;" class="text-kd20px28px text-global-highTitle i8n-font-en-barlow ml-1" >{{I18n.webTip.newFeatures}}</div>
    </div>
    <div style="height: 34px !important;" class="flex items-center   ">
      <template v-for="item in webTipData.newData">
      <div @click="changeData(item)" :class="data[0].name===item.name?'selectItem':'noItem'" class="itemProject w-full h-full flex items-center pl-13.5 text-center i8n-font-en-inter hand">{{item.name}}</div>
      </template>
    </div>
  </div>
</template>

<style scoped >
.selectItem{
  border-left:3.5px solid #2B8DFE;
  @apply  bg-global-white text-global-primary ;
}
.noItem{
  border-left:3.5px solid rgba(43, 141, 254, 0);
  @apply text-global-default text-opacity-85;
}
.itemProject{
  font-weight: 500;
  @apply text-kd14px18px;
}
</style>

