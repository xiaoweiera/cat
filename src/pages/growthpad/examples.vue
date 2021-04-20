<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {watch, reactive,ref} from "vue";
const {t, locale} = useI18n()
const enConfig = {
  title: 'GrowthPad Project Campaigns',
  des: 'Various types of projects such as DEX growth, machine gun pool growth, loan projects, brand enhancement, etc., support project customization',
  bannerImg: 'https://res.ikingdata.com/nav/allBannerEn.png',
  phoneBannerImg: 'https://res.ikingdata.com/nav/exPhoneBannerEn.png',
  dex: 'dex',
  vaults: 'vaults',
  lending: 'lending',
  contentImg: 'https://res.ikingdata.com/nav/exContentEn.png',
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
  contentImg: 'https://res.ikingdata.com/nav/exContent.png',
  phoneContentImg: 'https://res.ikingdata.com/nav/exPhoneContent.png',
}
const localConfig = ref(enConfig)

watch(() => locale.value, (newValue, oldValue) => {
  if (newValue === 'en') {
    localConfig.value=enConfig
  }else{
    localConfig.value=cnConfig
  }
})
</script>
<template>
 <div class="maxWidth flex flex-col font-kdFang  w-full px-4 md:px-30 items-center">
   <div class="text-kd24px32px md:text-kd36px140  text-global-highTitle font-semibold mt-10 md:mt-20">{{localConfig.title}}</div>
   <div class="text-kd14px22 text-global-default opacity-85 mt-3">{{localConfig.des}}</div>
    <img class="xshidden  w-full mt-10.7"  :src="localConfig.bannerImg" alt="">
   <img class="mdhidden w-full mt-4 " :src="localConfig.phoneBannerImg" alt="">
   <div class="flex items-center justify-center font-medium betweenBanner w-full  h-12 md:h-13.5    relative z-30">
     <div class="mr-6 md:mr-12 text-global-default text-kd14px18px md:text-kd16px150 opacity-65">{{localConfig.dex}}</div>
     <div class="mr-6 md:mr-12  h-full flex items-center text-global-primary text-kd14px18px border-b-2 border-global-primary  text-kd16px150">{{localConfig.vaults}}</div>
     <div class="text-global-default text-kd16px150 text-kd14px18px opacity-65">{{localConfig.lending}}</div>
   </div>
     <img  class="xshidden mt-15" :src="localConfig.contentImg" alt="">
   <img  class="mdhidden mt-10" :src="localConfig.phoneContentImg" alt="">
 </div>
</template>
<style scoped>
.maxWidth{
  max-width: 1440px;
}
.bannerBg{
  width:250px;
  height:227px;
}
.betweenBanner{
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 100%);
  box-sizing: border-box;
  box-shadow: 0px 6px 56px -12px rgba(43, 141, 255, 0.16);
  border-radius: 4px;
}
</style>