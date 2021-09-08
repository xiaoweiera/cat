<script setup lang="ts">
import { toUpper } from 'ramda'
import { defineProps } from "vue"
import I18n from '~/utils/i18n/index'
// @ts-ignore
import { toInteger, upperFirst, toNumberCashFormat, toNumberFormat, isEmpty } from '~/utils'

defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <div class="apy-detail pt-2.5 pb-3 px-4 text-kdFang">
    <div class="item-row flex items-center">
      <span class="apy-label">{{ I18n.apy.table.chain }}</span>
      <IconFont class="ml-1" :type="data.chain" size="14"/>
      <span class="ml-1 text-xs text-global-highTitle">{{ toUpper(data.chain) }}</span>
    </div>
    <div class="item-row flex items-center" v-if="data.project_category">
      <span class="apy-label">{{ I18n.apy.table.type }}</span>
      <IconFont class="ml-1" :type="data.project_category" size="14"/>
      <span class="ml-1 text-xs text-global-highTitle">{{ upperFirst(data.project_category) }}</span>
    </div>
    <div class="item-row flex items-center" v-if="data.strategy_tags">
      <span class="apy-label">{{ I18n.apy.table.tag }}</span>
      <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1">
        <span class="text-global-highTitle text-opacity-45">{{ data.strategy_tags }}</span>
      </span>
    </div>
    <div class="item-row flex items-center" v-if="data.lever">
      <span class="apy-label">{{ I18n.apy.table.margin }}</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45 text-kdExp">{{ toInteger(data.lever) }}X</span>
    </div>
    <div class="item-row">
      <div>
        <span class="apy-label">{{ I18n.apy.table.apyTotal }}</span>
      </div>
      <div class="flex items-center mt-1" v-if="data.single_apy_detail">
        <span class="apy-label dot">{{ I18n.apy.table.single }}</span>
        <span class="ml-1 text-xs text-global-highTitle">{{ data.single_apy_detail }}</span>
      </div>
      <div class="flex items-center mt-1" v-if="data.compound_detail">
        <span class="apy-label dot">{{ I18n.apy.table.compound }}</span>
        <span class="ml-1 text-xs text-global-highTitle">{{ data.compound_detail }}</span>
      </div>
    </div>

    <div class="item-row flex items-center" v-if="isEmpty(data.quota_remain) && isEmpty(data.quota_remain_percent)">
      <span class="apy-label">{{ I18n.apy.table.remaining }}</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45">-</span>
    </div>
    <div class="item-row flex items-center" v-else>
      <span class="apy-label">{{ I18n.apy.table.remaining }}</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45">
        <span v-if="!isEmpty(data.quota_remain)">{{ toNumberCashFormat(data.quota_remain, '$') }}</span>
        <span v-if="!isEmpty(data.quota_remain_percent)" class="ml-2">({{ toNumberFormat(data.quota_remain_percent, '%') }})</span>
      </span>
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
