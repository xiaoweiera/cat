<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, toRaw } from 'vue'
import { useHead } from '@vueuse/head'
import I18n from '~/utils/i18n/index'
import { href } from '~/utils/lang'

// 获取当前路由对象
const router = useRoute()

const navIsSelect = (path: string): string => {
  const $router = toRaw(router)
  const pathname: string = $router.path.value
  if (pathname && pathname.includes(path)) {
    return 'text-global-primary'
  }
  return 'text-global-default opacity-85'
}
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
</script>
<template>
  <HeaderNewNav>
    <template #nav>
      <div
        class="flex ml-8 font-normal text-base items-center whitespace-nowrap"
      >
        <router-link :to="href('/growthpad')" :class="navIsSelect('growthpad')">
          <span>{{ I18n.growthpad.title }}</span>
        </router-link>
        <a
          class="ml-8 opacity-85"
          target="_blank"
          href="http://ikingdata.mikecrm.com/kbZDdCb"
        >
          <span>{{ I18n.common.nav.apply }}</span>
        </a>
        <a
          class="ml-8 opacity-85"
          target="_blank"
          href="https://www.yuque.com/kingdata_growthpad/tlll4r/blz39c"
        >
          <span>{{ I18n.common.nav.about }}</span>
        </a>
      </div>
    </template>
  </HeaderNewNav>
</template>
