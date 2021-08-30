<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import { toUpper } from 'ramda'
import { defineProps } from "vue"
// @ts-ignore
import { numberUint, toNumber, toInteger } from '~/utils'

defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <div class="apy-detail pt-2.5 pb-3 px-4 text-kdFang">
    <div class="item-row flex items-center">
      <span class="label">{{ I18n.apy.table.chain }}</span>
      <IconFont :type="data.chain" size="14"/>
      <span class="ml-1 text-xs text-global-highTitle">{{ toUpper(data.chain) }}</span>
    </div>
    <div class="item-row flex items-center" v-if="data.project_category">
      <span class="label">{{ I18n.apy.table.type }}</span>
      <IconFont :type="data.project_category" size="14" class="ml-1"/>
      <span class="ml-1 text-xs text-global-highTitle">{{ data.project_category }}</span>
    </div>
    <div class="item-row flex items-center" v-if="data.strategy_tags">
      <span class="label">{{ I18n.apy.table.tag }}</span>
      <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1">
        <span class="text-global-highTitle text-opacity-45 ml-1">{{ data.strategy_tags }}</span>
      </span>
    </div>
    <div class="item-row flex">
      <span class="label mr-1">
        <span class="leading-5">{{ I18n.apy.table.interestRate }}</span>
      </span>
      <div class="leading-5">
        <div v-if="data.single_apy_detail">
          <span class="text-xs text-global-highTitle">{{ data.single_apy_detail }}</span>
        </div>
        <div class="mt-1" v-if="data.compound_detail">
          <span class="text-xs text-global-highTitle">{{ data.compound_detail }}</span>
        </div>
      </div>
    </div>
    <div class="item-row flex items-center">
      <span class="label">{{ I18n.apy.table.borrowingLimit }}</span>
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
