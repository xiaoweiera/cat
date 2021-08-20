<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chainsIcon} from '~/logic/apy2/config'
import {project_type} from '~/logic/apy2/config'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  data:Object
})
</script>
<template>
  <div class="font-kdFang ">
    <div class="flex items-center">
      <span class="label">公链类型</span>
      <img class="w-3.5 h-3.5 mx-1" :src="chainsIcon[data.chain]" alt="">
      <span class="txt">{{data.chain}}</span>
    </div>
    <div class="flex mt-1.5 items-center">
      <span class="label">矿池类型</span>
      <IconFont class="text-global-highTitle text-opacity-25 mx-1" size="14"   :type="`icon-${project_type[data.project_category]}`"></IconFont>
<!--      <span class="txt">存款收益</span>-->
    </div>
    <div class="flex mt-1.5 items-center">
      <span class="label">矿池标签</span>
      <span class="ml-1 px-1  text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">{{data.strategy_tags}}</span>
    </div>
    <div class="flex mt-1.5 items-center">
      <span class="label">杠杆倍数</span>
      <span class="txt ml-1">{{data.lever}}x</span>
    </div>
    <div class="flex flex-col mt-1.5 relative">
      <div class="label whitespace-nowrap">APY构成</div>
      <div class="ml-0.7 mt-1.3 relative"><div class="roundTip">.</div><span class="label ml-3.6">单利收益</span><span class="money">{{data.single_apy_detail}}</span></div>
      <div class="ml-0.7 mt-1.3 relative"><div class="roundTip">.</div><span class="label ml-3.6">复利收益</span><span class="money">{{data.compound_detail}}</span></div>
    </div>
    <div class="flex mt-1.5 items-center">
      <span class="label">剩余额度</span>
      <span class="txt ml-1 font-kdExp">${{formatRulesNumber(data.quota_remain)}}  ({{formatRulesNumber(data.quota_remain_percent)}}%)</span>
    </div>
    <div class="flex items-center mt-2">
      <IconFont class="mx-1 text-global-numRed" size="16"   type="icon-info2"></IconFont>
      <span class="text-global-numRed text-kd12px16px">投入后需锁仓30天</span>
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
.label{
  @apply text-global-highTitle text-opacity-45 text-kd12px16px;
}
.txt{
  @apply text-global-highTitle text-kd12px16px;
}
</style>
