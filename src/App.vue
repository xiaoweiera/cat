<script setup lang="ts">
import { useHead } from '@vueuse/head'
import '~/styles/font.css'
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'KingData',
  meta: [
    {
      name: 'keywords',
      content: "BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis 增长平台  GrowthPad",
    },
  ],
})
</script>
<template>
  <div :class="t('lang')==='En'?'en':'cn'">
  <router-view />
  </div>
</template>
<style>
.en .i8n-font-Barlow {
  font-family: i8n-font-Barlow !important
}
.en .i8n-font-inter{
  font-family: i8n-font-inter !important
}
@media screen and (max-width: 768px) {
  .xshidden{
    display: none !important;
  }
}
@media screen and (min-width: 768px) {
  .mdhidden{
    display: none !important;
  }
}
.hand{
  cursor: pointer;
}
</style>