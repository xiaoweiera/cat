<script lang="ts" setup>
import I18n from '~/utils/i18n/index'
</script>
<template>
  <Apy2Mining />
  <div class="hidden">
    <UiWechatShare :title="I18n.apyIndex.pageMining.title" :content="I18n.apyIndex.pageMining.content"/>

    <UiHeaderTitle :value="I18n.apyIndex.pageMining.title"/>
    <UiHeaderMeta name="keywords" content="BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis"/>
    <UiHeaderMeta name="description" content="KingData 全球领先的区块链分析搜索引擎，基于区块链交易构成的复杂关系网络，以及行业不同领域的数据特性，运用图计算、机器学习和图构建等技术，为用户提供区块链行业在交易、安全，投研、溯源、可视化、Dapp等领域的专业数据服务。"/>
  </div>
</template>


// @formatter:off
<route lang="yaml">
meta:
 layout: all
</route>
// @formatter:off
