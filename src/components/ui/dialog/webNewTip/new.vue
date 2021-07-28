<script setup lang="ts">
import { defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
import {webTipData} from '~/logic/webTip'
const props=defineProps({
  name:String
})


</script>

<template>
  <div class="text-kdFang leftSide">
    <div class="flex items-center px-6 mb-3.5">
      <img class="w-7.5 " src="https://res.ikingdata.com/liquidity/leftYunTip.png" alt="">
      <div style="font-weight: 600;" class="text-kd20px28px text-global-highTitle i8n-font-en-barlow ml-1" >{{I18n.webTip.newFeatures}}</div>
    </div>
    <div style="min-height: 34px !important;" class="flex items-center bg-global-white leftBorder ">
      <template v-for="item in webTipData">
      <div class="itemProject w-full text-center i8n-font-en-inter">{{item.name}}</div>
      </template>
    </div>
  </div>
</template>

<style scoped >
.leftBorder{
  border-left:3.5px solid #2B8DFE;
}
.itemProject{
  font-weight: 500;
  @apply text-global-primary text-kd14px18px;
}
</style>

