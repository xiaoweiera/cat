<script setup lang="ts">
// @ts-ignore
import { toUpper } from 'ramda'
import { defineProps } from "vue"
// @ts-ignore
import { numberUint, toNumber, toInteger, upperFirst } from '~/utils'

defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <div class="apy-detail pt-2.5 pb-3 px-4 text-kdFang">
    <div class="item-row flex items-center">
      <span class="label">公链类型</span>
      <IconFont class="ml-1" :type="data.chain" size="14"/>
      <span class="ml-1 text-xs text-global-highTitle">{{ toUpper(data.chain) }}</span>
    </div>
    <div class="item-row flex items-center" v-if="data.project_category">
      <span class="label">矿池类型</span>
      <IconFont class="ml-1" :type="data.project_category" size="14"/>
      <span class="ml-1 text-xs text-global-highTitle">{{ upperFirst(data.project_category) }}</span>
    </div>
    <div class="item-row flex items-center" v-if="data.strategy_tags">
      <span class="label">矿池标签</span>
      <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1">
        <span class="text-global-highTitle text-opacity-45 ml-1">{{ data.strategy_tags }}</span>
      </span>
    </div>
    <div class="item-row flex items-center" v-if="data.lever">
      <span class="label">杠杆倍数</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45">{{ toInteger(data.lever) }}X</span>
    </div>
    <div class="item-row">
      <div>
        <span class="label">APY构成</span>
      </div>
      <div class="flex items-center mt-1" v-if="data.single_apy_detail">
        <span class="label dot">单利收益</span>
        <span class="ml-1 text-xs text-global-highTitle">{{ data.single_apy_detail }}</span>
      </div>
      <div class="flex items-center mt-1" v-if="data.compound_detail">
        <span class="label dot">复利收益</span>
        <span class="ml-1 text-xs text-global-highTitle">{{ data.compound_detail }}</span>
      </div>
    </div>
    <div class="item-row flex items-center">
      <span class="label">剩余额度</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45">${{ numberUint(data.quota_remain) }}  ({{ toNumber(data.quota_remain_percent) }}%)</span>
    </div>
    <div class="item-row flex items-center text-global-numRed" v-if="data.warining_info">
      <IconFont type="icon-info2" size="16"/>
      <span class="text-xs ml-1.5">{{ data.warining_info }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../detail.scss";
</style>
