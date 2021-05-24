<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
// import { currentLang } from '~/lib/lang'
import * as lang from '~/utils/lang'
const route = useRoute()
const router = useRouter()
const select = ref(route.path.slice(1, route.path.length) || '')
const navIsSelect = (path: String): String => {
  if (path === select.value) {
    return 'text-global-primary ml-kd32px'
  }
  return ' text-global-default opacity-85 ml-kd32px '
}
const { t, locale } = useI18n()
// const lang = ref(currentLang(route))

const toggleLocales = () => {
  // lang.value = lang.value === 'en'
  //   ? 'cn'
  //   : 'en'
  if (lang.current.value === lang.Language.en) {
    lang.setCurrent(lang.Language.cn)
  } else {
    lang.setCurrent(lang.Language.en)
  }
  router.replace({
    ...route,
    query: {
      ...route.query,
      lang: lang.current.value,
    },
  })
}
const title = ref('')
// locale.value = lang.value
watch(
  () => lang.value,
  (newValue) => {
    locale.value = newValue
    title.value = t('hero.subtitle')
  },
)

watch(
  () => route.path,
  (newValue) => {
    select.value = newValue.slice(1, newValue.length)
  },
)
useHead({
  title,
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
onMounted(() => {
  locale.value = lang.current.value
  title.value = t('hero.subtitle')
})
</script>
<template>
  <nav
    class="
      xshidden
      flex
      items-center
      relative
      z-2
      i8n-font-inter
      px-6
      h-18
      font-kdFang
      justify-start
    "
  >
    <a href="https://www.kingdata.com" target="_blank">
      <img src="/assets/logo.svg" alt="KingData" class="flex-none" />
    </a>
    <div class="flex-grow mt-2 ml-12">
      <div class="flex font-normal text-base text-navItem-default">
        <router-link
          :to="'/growthpad?lang=' + locale"
          :class="navIsSelect('growthpad')"
        >
          <span>GrowthPad</span>
        </router-link>
        <router-link
          :to="'/growthpad/examples?lang=' + locale"
          :class="navIsSelect('growthpad/examples')"
        >
          <span>{{ t('examples') }}</span>
        </router-link>
        <a
          class="text-global-default opacity-85 ml-kd32px"
          target="_blank"
          :href="t('nav.applySrc')"
        >{{ t('nav.apply') }}</a>
        <a
          class="text-global-default opacity-85 ml-kd32px"
          target="_blank"
          :href="t('nav.aboutSrc')"
        >{{ t('nav.about') }}</a>
      </div>
    </div>
    <ul class="text-golbal-default flex">
      <div class="flex items-center hand" @click="toggleLocales()">
        <div class="mr-1 text-global-default opacity-85 ml-kd32px">
          {{ t('lang') }}
        </div>
        <img
          class="w-6 h-6"
          src="https://res.ikingdata.com/nav/growLang.png"
          alt=""
        />
      </div>
      <a
        href="https://www.ikingdata.com/download"
        target="_blank"
        :class="navIsSelect('#')"
      >{{ t('nav.download') }}</a>
      <HeaderLogin></HeaderLogin>
    </ul>
  </nav>
  <div
    class="
      w-full
      mdhidden
      navLogoBg
      flex
      items-center
      relative
      z-2
      justify-between
      h-15
      bg
      px-5
    "
  >
    <a href="https://www.kingdata.com" target="_blank">
      <img
        class="w-25 h-8"
        src="https://res.ikingdata.com/nav/topicLogo.png"
        alt=""
      />
    </a>
    <div class="flex items-center hand" @click="toggleLocales()">
      <div class="mr-1 text-global-default opacity-85 ml-kd32px i8n-font-inter">
        <span>{{ t('lang') }}</span>
      </div>
      <img
        class="w-6 h-6"
        src="https://res.ikingdata.com/nav/growLang.png"
        alt=""
      />
      <a
        href="https://www.ikingdata.com/download"
        target="_blank"
        class="text-global-default opacity-85 ml-3 i8n-font-inter"
      >{{ t('nav.download') }}</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.headerBg {
  box-shadow: 0 0.5px 0 rgba(43, 140, 255, 0.08),
    0 2px 12px rgba(0, 50, 108, 0.08);
}
.navLogoBg {
  background: #eaf3fe;
  box-shadow: 0px 1px 0px rgba(43, 140, 255, 0.02),
    0px 4px 12px rgba(0, 0, 0, 0.06);
}
</style>
