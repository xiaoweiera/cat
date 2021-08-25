<script setup lang="ts">
import { defineProps } from 'vue'
// 定义 props
import Props from '~/components/apy2/token/props'
// @ts-ignore
const props = defineProps(Props())
</script>

<template>
  <div>
    <!-- 币种描述 -->
    <Apy2TokenDetail/>
    <div>
      <Apy2TokenTrend :symbol="props.symbol" :id="props.id" :type="props.type"/>
    </div>
  </div>
  <div class="mt-8">
    <h3 class="text-xl text-global-highTitle text-opacity-85 mb-3">借贷 BTC 的所有最佳路径</h3>
    <Apy2TokenLendingList :symbol="props.symbol"/>
  </div>
</template>

