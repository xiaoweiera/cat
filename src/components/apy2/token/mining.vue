<script setup lang="ts">
import { defineProps,computed } from 'vue'
import I18n from '~/utils/i18n/index'
// 定义 props
import Props from '~/components/apy2/token/props'
import { useProvide } from '~/utils/use/state'
import dataEventName from '~/components/ui/date/eventname'

// @ts-ignore
const props = defineProps(Props())

// 定义已选择矿池列表
useProvide('poolList')
// 日期
useProvide(dataEventName.value)
const title=computed(()=>I18n.template(I18n.apyIndex.tokenMiningListTitle,{token:props.symbol}))
</script>

<template>
  <UiDownload>
    <!-- 币种描述 -->
    <Apy2TokenDetail :symbol="symbol" :type="type"/>
    <div :key="trendKey">

      <Apy2TokenTrend :symbol="symbol" :type="type"/>
    </div>
  </UiDownload>
  <div class="mt-8">
    <h3 class="text-kd18px24px text-global-highTitle text-opacity-85 mb-3">{{ title }}</h3>
    <Apy2TokenMiningList :symbol="symbol" :type="type"/>
  </div>
</template>
