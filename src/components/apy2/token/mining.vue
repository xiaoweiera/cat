<script setup lang="ts">
import { defineProps } from 'vue'
// 定义 props
import Props from '~/components/apy2/token/props'

const props = defineProps(Props())


</script>

<template>
  <div>
    <!-- 币种描述 -->
    <Apy2TokenDetail :symbol="symbol" :id="id" :type="type"/>
    <div :key="trendKey">
      <Apy2TokenTrend :symbol="symbol" :id="id" :type="type"/>
    </div>
  </div>
  <div class="mt-8">
    <h3 class="text-xl text-global-highTitle text-opacity-85">BTC 所有 APY 池子</h3>
  </div>
</template>
