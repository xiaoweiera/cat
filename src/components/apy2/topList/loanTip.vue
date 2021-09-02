<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chainsIcon} from '~/logic/apy2/config'
import {project_type} from '~/logic/apy2/config'
import {formatRulesNumber,getIconType,tolocaleLowerCase} from '~/lib/tool'
const props=defineProps({
  data:Object
})
</script>
<template>
  <div class="font-kdFang ">
    <div v-if="data.chain" class="flex items-center">
      <span class="labelName">{{I18n.apyIndex.chainType}}</span>
      <img class="w-3.5 h-3.5 mx-1" :src="chainsIcon[tolocaleLowerCase(data.chain)]" alt="">
      <span class="txt">{{data.chain}}</span>
    </div>
    <div v-if="data.project_category" class="flex mt-1.5 items-center">
      <span class="labelName">{{I18n.apyIndex.poolType}}</span>
      <IconFont class="text-global-highTitle text-opacity-25 mx-1" size="14"   :type="getIconType(data.project_category)"></IconFont>
      <span class="txt">{{data.project_category}}</span>
    </div>
    <div v-if="data.strategy_tags" class="flex mt-1.5 items-center">
      <span class="labelName">{{I18n.apyIndex.poolTag}}</span>
      <span class="ml-1 px-1   text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">{{data.strategy_tags}}</span>
    </div>
    <div v-if="data.apy_detail" class="flex mt-1.5 items-center">
      <span class="labelName whitespace-nowrap">{{I18n.apyIndex.interestGroup}}</span>
      <span  class="ml-1 font-kdExp text-kd12px16px text-global-highTitle">{{data.apy_detail}}</span>
    </div>
    <div v-if="data.quota_remain || data.quota_remain_percent" class="flex mt-1.5 items-center">
      <span class="labelName">{{I18n.apyIndex.borrowMoney}}</span>
      <span class="txt ml-1 font-kdExp">${{formatRulesNumber(data.quota_remain)}}  ({{formatRulesNumber(data.quota_remain_percent)}}%)</span>
    </div>
    <div v-if="data.warining_info" class="flex items-center mt-2">
      <IconFont class=" mx-1 text-global-numRed" style="font-size:16px; "   type="icon-info2"></IconFont>
      <span class="text-global-numRed text-kd12px16px">{{data.warining_info}}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.roundTip{
  font-size: 40px;
  @apply text-global-highTitle text-opacity-45 absolute bottom-3;
}
.labelName{
  @apply text-global-highTitle text-opacity-45 text-kd12px16px;
}
.txt{
  @apply text-global-highTitle text-kd12px16px;
}
</style>
