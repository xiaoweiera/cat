<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'

const selectName=ref(0)
const selectTag=(key:string)=>selectName.value=key
const list=[1,2,3,4,5]
</script>
<!--icon-F-->
<!--icon-V-->
<!--icon-L-->
<template>
  <div class="font-kdFang w-full  font-kdExp ">
  <template v-for="(item,i) in list">
    <div v-if="i<5" :class="i===list.length-1?'':'py-3.1'"  class="flex items-center w-full topBorder">
      <div class=" flex items-center">
        <IconFont v-if="i<3" class="text-global-highTitle text-opacity-25 absolute relative" style="font-size:38px;"    :type='`icon-a-${i+1}`'></IconFont>
        <div v-else  class="mx-2.9 text-kd24px24px text-global-highTitle text-opacity-65 font-kdExp font-bold">{{i+1}}</div>
      </div>
      <div class="flex flex-col w-full ml-3">
        <div class="flex justify-between">
          <div class="flex items-center relative">
            <IconFont class="text-global-highTitle text-opacity-25 absolute" style="font-size:26px;"   type="icon-NEW"></IconFont>
            <img class="w-8 h-5" src="https://res.ikingdata.com/apyTwo/hecoChain.jpg" alt="">
            <span class="ml-1 text-kd14px20px font-kdExp text-global-highTitle">ETH/USDT</span>
          </div>
          <div>
            <span class="mr-1 text-global-numGreen font-bold text-kd20px20px">34.33%</span>
            <UiPopover class="ml-3 inline-block px-0">
              <template #reference>
                <IconFont class="text-global-highTitle text-opacity-25" style="font-size:18px;"   type="icon-help"></IconFont>
              </template>
              <template #content>
             <div class="min-w-70 relative p-1.3">
               <ApyTwoTopListMiningTip />
             </div>
              </template>
            </UiPopover>
          </div>
        </div>
        <div class="mt-1 flex items-center flex-wrap justify-between">
          <div class="flex items-center">
            <span class="text-kd12px18px text-global-highTitle text-opacity-65">Coinwind</span>
            <IconFont class="text-global-highTitle text-opacity-25 ml-1" size="14"  type="icon-BSC"></IconFont>
            <IconFont class="text-global-highTitle text-opacity-25 ml-1" size="14"  type="icon-V"></IconFont>
            <span class="ml-1 px-1 text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">MDEX 董事会</span>
          </div>
          <div>
            <span class="text-kd12px12px text-global-highTitle text-opacity-45 font-normal">TVL</span>
            <span class="ml-1 text-kd12px12px text-global-highTitle text-opacity-85 ">$3.4亿</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  </div>
</template>
<style scoped lang="scss">
.topBorder{
  border-top: 1px solid rgba(3, 54, 102, 0.06);
}
.tag{
  @apply mr-2  text-kd14px18px text-global-highTitle font-medium  text-opacity-65;
}
.selectedTag{
  border-radius: 6px;
  @apply mr-2 text-kd14px18px text-global-primary font-medium bg-global-primary bg-opacity-8;
}
.btnCount{
  border: 1px solid rgba(43, 141, 254, 0.32);
  border-radius: 4px;
}
</style>
