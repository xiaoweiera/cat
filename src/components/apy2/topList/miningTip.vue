<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import {chainsIcon} from '~/logic/apy2/config'
import {project_type} from '~/logic/apy2/config'
import {formatRulesNumber,getIconType,tolocaleLowerCase} from '~/lib/tool'
import I18n from '~/utils/i18n/index'

const props=defineProps({
  data:Object
})
</script>
<template>
  <div class="font-kdFang  relative z-99999 ">
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
      <span class="ml-1 px-1  text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">{{data.strategy_tags}}</span>
    </div>
    <div v-if="data.lever" class="flex mt-1.5 items-center">
      <span class="labelName">{{I18n.apyIndex.lever}}</span>
      <span v-if="data.lever" class="txt ml-1">{{data.lever}}x</span>
    </div>
    <div v-if="data.single_apy_detail || data.compound_detail" class="flex flex-col mt-1.5 relative">
      <div class="labelName whitespace-nowrap">{{I18n.apyIndex.apyGroup}}</div>
      <div v-if="data.single_apy_detail" class="ml-0.7 mt-1.3 relative"><div class="roundTip">.</div><span class="labelName ml-3.6">{{I18n.apyIndex.singleInterest}}</span><span class="money">{{data.single_apy_detail}}</span></div>
      <div v-if="data.compound_detail" class="ml-0.7 mt-1.3 relative"><div class="roundTip">.</div><span class="labelName ml-3.6">{{I18n.apyIndex.compoundInterest}}</span><span class="money">{{data.compound_detail}}</span></div>
    </div>
    <div v-if="data.quota_remain || data.quota_remain_percent" class="flex mt-1.5 items-center">
      <span class="labelName">{{I18n.apyIndex.remainRatio}}</span>
      <span class="txt ml-1 font-kdExp">${{formatRulesNumber(data.quota_remain)}}  ({{formatRulesNumber(data.quota_remain_percent)}}%)</span>
    </div>
    <div v-if="data.warining_info" class="flex items-center mt-2">
      <IconFont class="mx-1 text-global-numRed" size="16"   type="icon-info2"></IconFont>
      <span class="text-global-numRed text-kd12px16px">{{data.warining_info}}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.money{
  @apply font-kdExp text-kd12px16px text-global-highTitle ml-1;
}
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
