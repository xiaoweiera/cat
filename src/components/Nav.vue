<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useHead} from "@vueuse/head";

let show = ref(false)
// @ts-ignore


const route = useRoute()
const select = route.path.split('/')[1] || ''
// @ts-ignore
const navIsSelect = (path: String): String => {
  if (path === select) {
    return 'text-global-primary ml-kd32px'
  }
  return ' text-global-default opacity-85 ml-kd32px '
}
const {
  t,
  availableLocales,
  locale,
} = useI18n()
const title = ref(t('hero.subtitle'))
//判断中英文
let lang = ref(true) //true是英文
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  title.value = t('hero.subtitle')
}
useHead({
  title: title,
  meta: [
    {
      name: 'keywords',
      content: 'BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis 增长平台  GrowthPad',
    },
    {
      name: 'description',
      content: 'GrowthPad 旨在根据精准的用户行为画像，精妙的建模、高效的任务模式，让项目方可以摆脱传统的冷启动方式，精准找到目标用户。同样平台也帮助企业把丰厚的奖励分发给目标用户，避免羊毛党和科学家，真正的做到了企业快速增长。',
    },
  ],
})
</script>


<template>
  <nav class="xshidden flex items-center relative z-2 i8n-font-inter    px-6 h-18 font-kdFang    justify-start">
    <img src="/assets/logo.svg" alt="KingData" class="flex-none ">
    <div class="flex-grow mt-2 ml-12">
      <div class="flex font-normal  text-base text-navItem-default">
        <router-link to="/growthpad" :class="navIsSelect('growthpad')">GrowthPad</router-link>
        <a class=" text-global-default opacity-85 ml-kd32px " target="_blank"
           :href="t('nav.applySrc')">{{ t('nav.apply') }}</a>
        <a class=" text-global-default opacity-85 ml-kd32px " target="_blank"
           :href="t('nav.aboutSrc')">{{ t('nav.about') }}</a>
      </div>
    </div>

    <ul class=" text-golbal-default flex">
      <div @click="toggleLocales" class="flex items-center hand">
        <div class="mr-1 text-global-default opacity-85 ml-kd32px "> {{ t('lang') }}</div>
        <img class="w-6 h-6" src="https://res.ikingdata.com/nav/growLang.png" alt="">
      </div>
      <a href="https://www.ikingdata.com/download" target="_blank" :class="navIsSelect('#')">{{ t('nav.download') }}</a>
    </ul>
  </nav>
  <div class="mdhidden navLogoBg flex items-center relative z-2 justify-between h-15 bg px-5 ">
    <img
        class="w-25 h-8"
        src="https://res.ikingdata.com/nav/topicLogo.png"
        alt=""
    />
    <div @click="toggleLocales" class="flex items-center hand">
      <div class="mr-1 text-global-default opacity-85 ml-kd32px i8n-font-inter"> {{ t('lang') }}</div>
      <img class="w-6 h-6" src="https://res.ikingdata.com/nav/growLang.png" alt="">
      <a href="https://www.ikingdata.com/download" target="_blank"
         class="text-global-default opacity-85 ml-3 i8n-font-inter">{{ t('nav.download') }}</a>
    </div>
  </div>
  <div v-if="show" class="mdhidden bg-white w-70 fixed z-3 top-0 h-full">
<!--    <img @click="changeShow(false)" src="https://res.ikingdata.com/nav/vclose.png"-->
<!--         class="absolute right-3 top-3 w-5 h-5" alt=""-->
<!--    >-->
    <div class="flex flex-col ml-4 mt-10">
      <a class="text-kd16px18px font-medium text-global-default w-20 mb-3" href="https://www.kingdata.com/topic"
      >数据图表</a>
      <a class="text-kd16px18px font-medium text-global-default w-27 mb-3" href="https://www.kingdata.com/news">7x27
        小时监控</a>
      <a class="text-kd16px18px font-medium text-global-default w-20 mb-43" href="https://www.kingdata.com/reports"
      >研究报告</a>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.navLogoBg {
  background: #EAF3FE;
  box-shadow: 0px 1px 0px rgba(43, 140, 255, 0.02), 0px 4px 12px rgba(0, 0, 0, 0.06);
}

</style>
