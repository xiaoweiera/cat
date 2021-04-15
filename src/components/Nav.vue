<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const {
  t,
  availableLocales,
  locale,
} = useI18n()
let show = ref(false)
// @ts-ignore
const changeShow = (state: boolean) => {
  if(locale.value==='zh-CN'){
    show.value = state
  }

}

const route = useRoute()
const select = route.path.split('/')[1] || ''
// @ts-ignore
const navIsSelect = (path: String): String => {
  if (path === select) {
    return 'text-global-primary ml-kd32px'
  }
  return ' text-global-default opacity-85 ml-kd32px '
}
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="xshidden flex items-center relative z-2      px-6 h-18 font-kdFang    justify-start">
    <img src="/assets/logo.svg" alt="KingData" class="flex-none ">
    <div class="flex-grow mt-2 ml-12">
      <div class="flex font-normal  text-base text-navItem-default">
        <!--   <img src="/assets/more-nav-item.svg" alt="more">-->
<!--        <a v-if="locale==='zh-CN'" :class="navIsSelect('#')" target="_blank" href="https://www.kingdata.com/topic">数据图表</a>-->
<!--        <a v-if="locale==='zh-CN'" :class="navIsSelect('#')" target="_blank" href="https://www.kingdata.com/news">7x27 小时监控</a>-->
<!--        <a v-if="locale==='zh-CN'" :class="navIsSelect('reports')" target="_blank" href="https://www.kingdata.com/reports">研究报告</a>-->
        <router-link to="/growthpad" :class="navIsSelect('growthpad')">GrowthPad</router-link>
      </div>
    </div>

    <ul class=" text-golbal-default flex">
      <div @click="toggleLocales" class="flex items-center hand">
        <div class="mr-1 text-global-default opacity-85 ml-kd32px"> {{t('lang')}}</div>
        <img class="w-6 h-6" src="https://res.ikingdata.com/nav/growLang.png" alt="">
      </div>
      <a href="https://www.ikingdata.com/download" target="_blank" :class="navIsSelect('#')">{{ t('nav.download') }}</a>
    </ul>
  </nav>
  <div class="mdhidden navLogoBg flex items-center relative z-2 justify-between h-15 bg px-5 ">
<!--    <img @click="changeShow(true)"-->
<!--         class="w-6 h-6 mt-1.5"-->
<!--         src="https://res.ikingdata.com/nav/list.png"-->
<!--         alt=""-->
<!--    />-->
    <img
        class="w-25 h-8"
        src="https://res.ikingdata.com/nav/topicLogo.png"
        alt=""
    />
    <div @click="toggleLocales" class="flex items-center hand">
      <div class="mr-1 text-global-default opacity-85 ml-kd32px"> {{t('lang')}}</div>
      <img class="w-6 h-6" src="https://res.ikingdata.com/nav/growLang.png" alt="">
      <a href="https://www.ikingdata.com/download" target="_blank" class="text-global-default opacity-85 ml-3 ">{{ t('nav.download') }}</a>
    </div>
  </div>
  <div v-if="show" class="mdhidden bg-white w-70 fixed z-3 top-0 h-full">
    <img @click="changeShow(false)" src="https://res.ikingdata.com/nav/vclose.png"
         class="absolute right-3 top-3 w-5 h-5" alt=""
    >
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
