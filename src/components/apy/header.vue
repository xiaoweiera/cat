<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { ElDrawer } from 'element-plus'
import { currentLang } from '~/lib/lang'
import { headerConfig, tools } from '~/logic/apy/config'

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
const lang = ref(currentLang(route))

const toggleLocales = () => {
  lang.value = lang.value === 'en'
    ? 'cn'
    : 'en'
  router.replace({
    ...route,
    query: {
      ...route.query,
      lang: lang.value,
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
const isShowMore = ref(false)
// @ts-ignore
const showMore = () => (isShowMore.value = true)
// @ts-ignore
const closeMore = () => (isShowMore.value = false)
useHead({
  title: 'DeFi挖矿收益APY大全',
  meta: [
    {
      name: 'keywords',
      content:
        'Heco生态币,BSC生态币,ETH生态币,挖矿收益,生态币年化收益,DeFi挖矿,Heco挖矿,BSC挖矿,ETH挖矿,挖矿收益APY大全',
    },
    {
      name: 'description',
      content:
        '本站收集整理了Heco、ETH、BSC三条公链各借贷平台和机枪池的挖矿收益APY数据，根据类型将其分类方便您的查看',
    },
  ],
})
const show = ref(true)
onMounted(() => {
  lang.value = currentLang(route)
  locale.value = lang.value
  title.value = t('hero.subtitle')
})
const showDialog = () => (show.value = !show.value)
</script>
<template>
  <nav
    class="
      xshidden
      headerBg
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
    <a
      href="https://www.kingdata.com"
      target="_blank"
    ><img
      src="/assets/logo.svg"
      alt="KingData"
      class="flex-none mb-2"
    /></a>
    <div class="flex-grow mt-2 h-full">
      <div
        class="
          flex
          font-normal
          h-full
          items-center
          text-base text-navItem-default
        "
      >
        <template v-for="(item, i) in headerConfig">
          <a
            :class="
              i === 0
                ? 'oneHeaderItem'
                : headerConfig.length - 1 === i
                  ? 'headerItem hfull'
                  : 'headerItem'
            "
            target="_blank"
            :href="item.url"
          ><span :class="headerConfig.length - 1 === i ? 'mt-0.5' : ''">{{
            item.name
          }}</span></a>
        </template>
      </div>
    </div>
    <ul
      class="text-golbal-default flex items-center hand"
      @mouseleave="closeMore()"
    >
      <div
        class="text-global-default opacity-85 h-15 flex items-center"
        @mouseenter="showMore()"
      >
        工具
      </div>
      <img
        class="w-3 ml-1.5"
        src="https://res.ikingdata.com/nav/downTip.png"
        alt=""
      />
      <div
        v-if="isShowMore"
        class="
          bg-white
          w-46.5
          rounded-md
          absolute
          right-14
          py-1.5
          top-13
          px-4
          text-font-kd14px18px
        "
      >
        <div
          v-for="item in tools"
          class="toolItem text-global-default text-kd14px18px opacity-85 tool"
        >
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </div>
      </div>
      <a
        href="https://www.ikingdata.com/download"
        target="_blank"
        :class="navIsSelect('#')"
      >APP 下载</a>
    </ul>
  </nav>
  <div
    class="
      mdhidden
      headerBg
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
    <a
      href="https://www.kingdata.com"
      target="_blank"
    ><img
      class="w-25 h-8"
      src="https://res.ikingdata.com/nav/topicLogo.png"
      alt=""
    /></a>
    <div class="flex items-center hand">
      <!--      <div class="mr-1 text-global-default opacity-85 ml-kd32px i8n-font-inter"> 中文</div>-->
      <!--      <img class="w-6 h-6" src="https://res.ikingdata.com/nav/growLang.png" alt="">-->
      <a
        href="https://www.ikingdata.com/download"
        target="_blank"
        class="text-global-default opacity-85 ml-3 i8n-font-inter"
      >APP下载</a>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.toolItem:hover {
  @apply text-global-primary;
}

.headerItem {
  @apply text-global-default opacity-85 mb-2 ml-8 flex items-center;
}

.oneHeaderItem {
  @apply text-global-default opacity-85 mb-2 ml-12 flex items-center;
}

.tool {
  padding: 6px 0px;
}

.hfull {
  height: 100%;
  border-bottom: 2px solid #2b8cff;
}

.headerBg {
  box-shadow: 0 0.5px 0 rgb(43 140 255 / 4%), 0 2px 12px rgb(0 50 108 / 4%);
}

.navLogoBg {
  background: #eaf3fe;
}
</style>
