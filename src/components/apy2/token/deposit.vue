<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
// 定义 props
import Props from '~/components/apy2/token/props'
import { useProvide } from '~/utils/use/state'
import dataEventName from '~/components/ui/date/eventname'
// @ts-ignore
const props = defineProps(Props())

// 定义已选择矿池列表
useProvide('poolList', '')
// 日期
useProvide(dataEventName.value)

</script>

<template>
  <UiDownload>
    <!-- 币种描述 -->
    <Apy2TokenDetail/>
    <div>
      <Apy2TokenTrend :symbol="symbol" :id="id" :type="type"/>
    </div>
  </UiDownload>
  <div class="mt-8">
    <h3 class="text-xl text-global-highTitle text-opacity-85 mb-3">{{ I18n.apy.token.pool.lends }}</h3>
    <Apy2TokenLendingList :symbol="symbol" :type="type"/>
  </div>
</template>

