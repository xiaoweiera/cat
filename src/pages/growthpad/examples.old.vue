<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watch, reactive, ref } from 'vue'
const { t, locale } = useI18n()
const enConfig = {
  title: 'GrowthPad Project Campaigns',
  des: 'Various types of projects such as DEX growth, machine gun pool growth, loan projects, brand enhancement, etc., support project customization',
  bannerImg: 'https://res.ikingdata.com/nav/allBannerEn.png',
  phoneBannerImg: 'https://res.ikingdata.com/nav/exPhoneBannerEn.png',
  dex: 'DEX',
  vaults: 'VAULTS',
  lending: 'LENDING',
  phoneOne: 'https://res.ikingdata.com/nav/phoneVaultsOne.png',
  phoneTwo: 'https://res.ikingdata.com/nav/phoneVaultsTwo.png',
  phoneStree: 'https://res.ikingdata.com/nav/phoneVaultsStree.png',
  one: 'https://res.ikingdata.com/nav/vaultsOne.png',
  two: 'https://res.ikingdata.com/nav/vaultsTwo.png',
  stree: 'https://res.ikingdata.com/nav/vaultsStree.png',
  phoneContentImg: 'https://res.ikingdata.com/nav/exPhoneContentEn.png',
}
const cnConfig = {
  title: 'GrowthPad 项目案例',
  des: 'DEX增长、机枪池增长、借贷项目、增强品牌宣传等多种类型项目，支持项目定制',
  bannerImg: 'https://res.ikingdata.com/nav/allBanner.png',
  phoneBannerImg: 'https://res.ikingdata.com/nav/exPhoneBanner.png',
  dex: 'DEX 增长',
  vaults: '机枪池增长',
  lending: '借贷项目增长',
  phoneOne: 'https://res.ikingdata.com/nav/phoneVaultsOneCn.png',
  phoneTwo: 'https://res.ikingdata.com/nav/phoneVaultsTwoCn.png',
  phoneStree: 'https://res.ikingdata.com/nav/phoneVaultsStreeCn.png',
  one: 'https://res.ikingdata.com/nav/vaultsOneCn.png',
  two: 'https://res.ikingdata.com/nav/vaultsTwoCn.png',
  stree: 'https://res.ikingdata.com/nav/vaultsStreeCn.png',
  phoneContentImg: 'https://res.ikingdata.com/nav/exPhoneContent.png',
}

const localConfig = ref({})
const tag = ref('vaults')

if (locale.value === 'en') {
  localConfig.value = enConfig
} else {
  localConfig.value = cnConfig
}

const change = (name) => {
  tag.value = name
}
watch(
  () => tag.value,
  (newValue, oldValue) => {
    if (newValue === 'dex') {
      enConfig.one = 'https://res.ikingdata.com/nav/dexOne.png'
      enConfig.two = 'https://res.ikingdata.com/nav/dexTwo.png'
      enConfig.stree = 'https://res.ikingdata.com/nav/dexStree.png'
      cnConfig.one = 'https://res.ikingdata.com/nav/dexOneCn.png'
      cnConfig.two = 'https://res.ikingdata.com/nav/dexTwoCn.png'
      cnConfig.stree = 'https://res.ikingdata.com/nav/dexStreeCn.png'

      enConfig.phoneOne = 'https://res.ikingdata.com/nav/phoneDexOne.png'
      enConfig.phoneTwo = 'https://res.ikingdata.com/nav/phoneDexTwo.png'
      enConfig.phoneStree = 'https://res.ikingdata.com/nav/phoneDexStree.png'
      cnConfig.phoneOne = 'https://res.ikingdata.com/nav/phoneDexOneCn.png'
      cnConfig.phoneTwo = 'https://res.ikingdata.com/nav/phoneDexTwoCn.png'
      cnConfig.phoneStree = 'https://res.ikingdata.com/nav/phoneDexStreeCn.png'
    } else if (tag.value === 'vaults') {
      enConfig.one = 'https://res.ikingdata.com/nav/vaultsOne.png'
      enConfig.two = 'https://res.ikingdata.com/nav/vaultsTwo.png'
      enConfig.stree = 'https://res.ikingdata.com/nav/vaultsStree.png'
      cnConfig.one = 'https://res.ikingdata.com/nav/vaultsOneCn.png'
      cnConfig.two = 'https://res.ikingdata.com/nav/vaultsTwoCn.png'
      cnConfig.stree = 'https://res.ikingdata.com/nav/vaultsStreeCn.png'

      enConfig.phoneOne = 'https://res.ikingdata.com/nav/phoneVaultsOne.png'
      enConfig.phoneTwo = 'https://res.ikingdata.com/nav/phoneVaultsTwo.png'
      enConfig.phoneStree = 'https://res.ikingdata.com/nav/phoneVaultsStree.png'
      cnConfig.phoneOne = 'https://res.ikingdata.com/nav/phoneVaultsOneCn.png'
      cnConfig.phoneTwo = 'https://res.ikingdata.com/nav/phoneVaultsTwoCn.png'
      cnConfig.phoneStree
        = 'https://res.ikingdata.com/nav/phoneVaultsStreeCn.png'
    } else {
      enConfig.one = 'https://res.ikingdata.com/nav/lendingOne.png'
      enConfig.two = 'https://res.ikingdata.com/nav/lendingTwo.png'
      enConfig.stree = 'https://res.ikingdata.com/nav/lendingStree.png'
      cnConfig.one = 'https://res.ikingdata.com/nav/lendingOneCn.png'
      cnConfig.two = 'https://res.ikingdata.com/nav/lendingTwoCn.png'
      cnConfig.stree = 'https://res.ikingdata.com/nav/lendingStreeCn.png'

      enConfig.phoneOne = 'https://res.ikingdata.com/nav/phoneLendingOne.png'
      enConfig.phoneTwo = 'https://res.ikingdata.com/nav/phoneLendingTwo.png'
      enConfig.phoneStree
        = 'https://res.ikingdata.com/nav/phoneLendingStree.png'
      cnConfig.phoneOne = 'https://res.ikingdata.com/nav/phoneLendingOneCn.png'
      cnConfig.phoneTwo = 'https://res.ikingdata.com/nav/phoneLendingTwoCn.png'
      cnConfig.phoneStree
        = 'https://res.ikingdata.com/nav/phoneLendingStreeCn.png'
    }
    if (locale.value === 'en') {
      localConfig.value = enConfig
    } else {
      localConfig.value = cnConfig
    }
  },
)
watch(
  () => locale.value,
  (newValue, oldValue) => {
    if (newValue === 'en') {
      localConfig.value = enConfig
    } else {
      localConfig.value = cnConfig
    }
  },
)
</script>
<template>
  <div
    class="maxWidth flex flex-col font-kdFang w-full px-4 md:px-30 items-center"
  >
    <div
      class="
        text-kd24px32px
        md:text-kd36px140
        i8n-font-Barlow
        text-global-highTitle
        font-semibold
        mt-10
        md:mt-20
      "
    >
      {{ localConfig.title }}
    </div>
    <div
      class="text-kd14px22 text-global-default opacity-85 mt-3 i8n-font-inter"
    >
      {{ localConfig.des }}
    </div>
    <img class="xshidden w-full mt-10.7" :src="localConfig.bannerImg" alt="" />
    <img
      class="mdhidden w-full mt-4"
      :src="localConfig.phoneBannerImg"
      alt=""
    />
    <div
      class="
        flex
        items-center
        justify-center
        font-medium
        betweenBanner
        w-full
        h-12
        md:h-13.5
        relative
        z-30
      "
    >
      <div
        :class="
          tag === 'dex'
            ? 'selectTag hand i8n-font-Barlow textEn'
            : 'selectNoTag hand i8n-font-Barlow  textEn'
        "
        @click="change('dex')"
      >
        {{ localConfig.dex }}
      </div>
      <div
        :class="
          tag === 'vaults'
            ? 'selectTag centerTag hand i8n-font-Barlow  textEn'
            : 'selectNoTag centerTag hand i8n-font-Barlow textEn'
        "
        @click="change('vaults')"
      >
        {{ localConfig.vaults }}
      </div>
      <div
        :class="
          tag === 'lending'
            ? 'selectTag hand i8n-font-Barlow textEn'
            : 'selectNoTag hand i8n-font-Barlow textEn'
        "
        @click="change('lending')"
      >
        {{ localConfig.lending }}
      </div>
    </div>
    <div class="mt-10 md:mt-15md:px-15">
      <!--     手机端-->

      <div class="mdhidden">
        <img :src="localConfig.phoneOne" alt="" />
        <img class="mt-7" :src="localConfig.phoneTwo" alt="" />
        <img class="mt-7" :src="localConfig.phoneStree" alt="" />
      </div>
      <!--     pc端-->
      <div class="xshidden px-25">
        <img :src="localConfig.one" alt="" />
        <img class="mt-7" :src="localConfig.two" alt="" />
        <img class="mt-7" :src="localConfig.stree" alt="" />
      </div>
      <!--       <img  class="mdhidden mt-10" :src="localConfig.phoneContentImg" alt="">-->
    </div>
    <!--   <GrowthpadExaFooter />-->
    <GrowthpadFooter :small="true" />
  </div>
</template>
<style scoped>
.selectTag {
  @apply i8n-font-Barlow  h-full flex items-center text-kd14px18px text-global-primary  border-b-2 border-global-primary  text-kd16px150;
}
.textEn {
  font-weight: bold;
  font-size: 16px !important;
  line-height: 150% !important;
}
.centerTag {
  @apply i8n-font-Barlow mr-6 ml-6 md:mr-12 md:ml-12;
}
.selectNoTag {
  @apply i8n-font-Barlow text-global-default text-kd16px150 text-kd14px18px opacity-65;
}
.maxWidth {
  max-width: 1440px;
}
.bannerBg {
  width: 250px;
  height: 227px;
}
.betweenBanner {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  box-sizing: border-box;
  box-shadow: 0px 6px 56px -12px rgba(43, 141, 255, 0.16);
  border-radius: 4px;
}
</style>
// @formatter:off
<route lang="yaml">
meta:
  layout: growthpadLayout
</route>
// @formatter:off
