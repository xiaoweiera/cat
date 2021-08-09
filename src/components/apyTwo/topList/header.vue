<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'

const selectName=ref(0)
const selectTag=(key:string)=>selectName.value=key
const list=['USDT','BTC','ETH']
</script>
<template>
  <div class="font-kdFang w-93.25 ">
    <div class="flex justify-between items-center">
      <span class="text-kd18px24px font-medium text-global-highTitle  text-opacity-85">借贷利率榜</span>
      <div class="flex items-center btnCount py-1 px-2 hand">
        <img class="w-4 h-4" src="https://res.ikingdata.com/apyTwo/count.jpg" alt="">
        <span class="ml-0.5 text-global-primary text-kd14px18px">真实利率计算器</span>
      </div>
    </div>
    <div class="flex items-center mt-3">
      <template v-for="(item,i) in list">
        <div :class="i===0?'selectedTag':'tag'" class="hand px-2 py-1">{{item}}</div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
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
