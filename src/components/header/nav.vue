<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useHead } from '@vueuse/head'
import { current, nextLang, href } from '~/utils/lang'
import I18n from '~/utils/i18n/index'

const download = ref<string>('https://www.ikingdata.com/download')

onBeforeMount(() => {
  useHead({
    title: I18n.growthpad.title,
    meta: [
      {
        name: 'keywords',
        content:
          'BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis 增长平台  GrowthPad',
      },
      {
        name: 'description',
        content:
          'GrowthPad 旨在根据精准的用户行为画像，精妙的建模、高效的任务模式，让项目方可以摆脱传统的冷启动方式，精准找到目标用户。同样平台也帮助企业把丰厚的奖励分发给目标用户，避免羊毛党和科学家，真正的做到了企业快速增长。',
      },
    ],
  })
})

const onSwitchLang = function() {
  const url = href(window.location.href, nextLang())
  if (url) {
    window.location.href = url
  }
}
</script>
<template>
  <nav
    class="flex items-center justify-between relative z-2 px-6 h-18 font-kdFang"
  >
    <div class="flex items-center">
      <a class="block" href="https://www.kingdata.com" target="_blank">
        <img src="/assets/logo.svg" alt="KingData" class="flex-none" />
      </a>
      <div
        class="ml-20 flex-grow items-center text-global-default hidden md:flex"
      >
        <slot name="nav" :lang="current"></slot>
      </div>
    </div>
    <div>
      <slot name="about" :lang="current">
        <ul class="flex">
          <span
            class="hidden md:flex items-center hand text-global-default"
            @click.stop.prevent="onSwitchLang"
          >
            <span class="mr-1 opacity-85 inline-block whitespace-nowrap">
              {{ I18n.common.lang }}
            </span>
            <IconFont
              class="w-6 h-6"
              type="lang"
              suffix="png"
              size="2xl"
            ></IconFont>
          </span>
          <!-- 下载 -->
          <a
            class="hidden md:inline-block opacity-85 ml-8 text-global-default"
            :href="download"
            target="_blank"
          >
            <span class="inline-block whitespace-nowrap">{{
              I18n.common.nav.download
            }}</span>
          </a>
          <!-- 登录/注册 -->
          <HeaderLogin></HeaderLogin>
        </ul>
      </slot>
    </div>
  </nav>
</template>
