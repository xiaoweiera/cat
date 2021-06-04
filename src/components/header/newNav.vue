<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useHead } from '@vueuse/head'
import { current, nextLang, href } from '~/utils/lang'
import I18n from '~/utils/i18n/index'

const download = ref<string>('https://www.ikingdata.com/download')

const onSwitchLang = function() {
  const url = href(window.location.href, nextLang())
  if (url) {
    window.location.href = url
  }
}
</script>
<template>
  <nav
    class="
      headerBg
      flex
      items-center
      justify-between
      relative
      z-2
      px-6
      h-18
      font-kdFang
    "
  >
    <div class="flex items-center">
      <a class="block" href="https://www.kingdata.com" target="_blank">
        <img
          style="width: 106.59px; height: 36px"
          src="https://res.ikingdata.com/nav/navLogoAll.png"
          alt="KingData"
        />
      </a>
      <HeaderUrlAddress />
      <div class="flex-grow items-center text-global-default hidden md:flex">
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
<style>
.headerBg {
  box-shadow: 0 0.5px 0 rgb(43 140 255 / 4%), 0 2px 12px rgb(0 50 108 / 4%);
}
</style>
