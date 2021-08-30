<script setup lang="ts">

import '~/styles/font.css'

import { computed } from 'vue'
import * as lang from '~/utils/lang'
import { useHead } from '@vueuse/head'

// @ts-ignore
const locale = computed(function() {
  if (lang.current.value === lang.Language.en) {
    return zhEn
  }
  return zhCn
})

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
  <div>
    <UiDialogWebNewTipMain class="xshidden"/>
    <router-view />
  </div>
</template>
<style lang="scss">
.showY{
  @apply overflow-hidden overflow-y-scroll;
}
.en .i8n-font-en-inter {
  font-family: i8n-font-inter;
}
.en .i8n-font-en-Barlow {
  font-family: i8n-font-Barlow;
}
body {
  -webkit-overflow-scrolling: touch;
}
.el-loading-spinner .circular{
  display: inline !important;
}

/*
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
*/

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

.none-select {
  user-select: none;
}

.el-message {
  z-index: 9999;
}

.message-tips {
  min-width: inherit !important;
  background: #ffffff !important;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.08),
    0px 6px 16px rgba(0, 0, 0, 0.06), 0px 9px 28px 8px rgba(0, 0, 0, 0.03) !important;
  border-radius: 6px;
  padding: 10px 15px !important;
  .el-message__icon {
    &:before {
      content: none;
    }
    width: 24px;
    height: 24px;
    display: inline-block;
    background: url('https://res.ikingdata.com/icon/success.svg');
  }
  .el-message__content {
    font-size: 14px !important;
    color: #00b464 !important;
  }
}

.el-button--small {
  min-height: 24px !important;
  padding: 5px 11px !important;
}

/* 指令消息框 */
.el-message-box {
  &.directive-message {
    padding: 16px;
    width: 340px;
    .el-message-box__header {
      padding: 0 0 16px 0;
      .el-message-box__headerbtn {
        display: none;
      }
    }
    .el-message-box__content {
      padding: 0;
      p {
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
      }
    }
    .el-message-box__title {
      text-align: center;
      color: #033666;
      font-size: 16px;
      font-weight: 500;
    }
    .el-message-box__btns {
      padding: 16px 0 0 0;
      display: flex;
      .el-button {
        flex: 1;
        width: 0;
        & + .el-button {
          margin-left: 12px !important;
        }
      }
    }
  }
}

.p-0 {
  padding: 0 !important;
}

.w-fit {
  width: fit-content;
}

/* 等宽等高 */
.equal-width-height {
  width: 100%;
  position: relative;
  border: 1px solid transparent;
}
.equal-width-height::before {
  content: '';
  display: block;
}
.equal-width-height > .equal-content {
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  position: absolute;
}

.el-dialog {
  /* 全屏的弹窗 */
  &.screen-dialog {
    margin: 0 !important;
    width: initial !important;
    @apply absolute;
    @apply left-15 top-15 right-15 bottom-15;
    @apply md:left-15 md:top-20 md:right-15 md:bottom-20;
    .el-dialog__header {
      @apply hidden;
    }
    .el-dialog__body {
      padding: 20px !important;
      @apply h-full;
    }
  }
  /* 去掉 dialog 一些默认内边距 */
  &.diy-dialog {
    &.hidden-header {
      .el-dialog__header {
        @apply hidden;
      }
    }
    .el-dialog__body {
      padding: 0 !important;
    }
  }
}

/* 滑轮样式 */
.showY::-webkit-scrollbar {
  height: 8px;
  @apply w-0.5;
}

.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}

.new-16 {
  --new-size: 16px;
}
.new-24 {
  --new-size: 24px;
}
.new-30 {
  --new-size: 30px;
}
.new-40 {
  --new-size: 40px;
}
[class~=new], [class*=new] {
  @apply relative;
  $icon: "https://statics.ikingdata.com/img/new.png";
  &:after {
    content: "";
    @apply absolute left-0 top-0 right-0 bottom-0;
    background-image: url($icon);
    background-position: left top;
    background-repeat: no-repeat;
    background-size: var(--new-size);
  }
}

</style>
