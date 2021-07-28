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
    <div class="flex items-center mb-3.5">
      <img class="w-7.5 " src="https://res.ikingdata.com/liquidity/leftYunTip.png" alt="">
      <div class="text-kd16px24px text-global-highTitle ml-1" style="font-weight: 500;">{{I18n.webTip.newFeatures}}</div>
    </div>
    <div class="pl-4">
      <template v-for="item in webTipData">
      <div class="itemProject">{{item.name}}</div>
      </template>
    </div>
  </div>
</template>

<style scoped >

.itemProject{
  border-left:2px solid #2B8DFE;
  font-weight: 500;
  @apply pl-4 mb-1.5 text-global-primary text-kd14px18px;
}
</style>

