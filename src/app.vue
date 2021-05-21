<script setup lang="ts">
import { useHead } from '@vueuse/head'
import '~/styles/font.css'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'KingData',
  meta: [
    {
      name: 'keywords',
      content:
        'BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis 增长平台  GrowthPad',
    },
  ],
})
</script>
<template>
  <div :class="t('lang') === 'En' ? 'en' : 'cn'">
    <router-view />
  </div>
</template>
<style lang="scss">
[class*=' el-icon-'],
[class^='el-icon-'] {
  font-family: element-icons !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-picker-panel__icon-btn {
  font-size: 12px;
  color: #303133;
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  margin-top: 8px;
}
.el-icon-d-arrow-left:before {
  content: '<<';
}
.el-icon-arrow-left:before {
  margin-left: 10px;
  content: '<';
}
.el-icon-arrow-right:before {
  margin-right: 10px;
  content: '>';
}
.el-icon-d-arrow-right:before {
  content: '>>';
}
button {
  outline: 0 !important;
}
.en .i8n-font-Barlow {
  font-family: i8n-font-Barlow !important;
}
.en .i8n-font-inter {
  font-family: i8n-font-inter !important;
}
div,
img,
button,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

@media screen and (max-width: 768px) {
  .xshidden {
    display: none !important;
  }
}
@media screen and (min-width: 768px) {
  .mdhidden {
    display: none !important;
  }
}
.hand {
  cursor: pointer;
}
[help] {
  cursor: help;
  position: relative;
  display: inline-block;
  i:last-child {
    &:after {
      position: absolute;
      width: 16px;
      height: 8px;
      display: block;
      left: 50%;
      top: 0;
      $icon: 'https://res.ikingdata.com/icon/arrow.png';
      background: #fff url($icon) no-repeat center bottom;
    }
  }
  &:after {
    display: none;
    white-space: nowrap;
    word-break: keep-all;
    content: attr(help);
    position: absolute;
    left: 50%;
    bottom: 100%;
    border-radius: 6px;
    filter: drop-shadow(0px 6px 18px rgba(0, 0, 0, 0.12));
    transform: translate(-50%, -8px);
    padding: 8px 16px;
    font-size: 14px;
    color: rgba(37, 62, 111, 0.85);
    background: #fff;
  }
  &:hover,
  &:active {
    &:after {
      display: block;
    }
  }
}
</style>
