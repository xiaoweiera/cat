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
      sticky
      md:static
      top-0
      headerBg
      flex
      items-center
      justify-between
      relative
      z-2
      px-4
      md:px-6
      h-18
      font-kdFang
    "
  >
    <div class="md:hidden">
      <!-- 移动端导航条 -->
      <HeaderMobile></HeaderMobile>
    </div>
    <div class="flex items-center">
      <a class="block" href="https://www.kingdata.com" target="_blank">
        <img src="/assets/logo.svg" alt="KingData" class="flex-none" />
      </a>
      <div class="ml-12 hidden md:flex md:items-center">
        <!--PC端导航-->
        <HeaderPc></HeaderPc>
        <div class="ml-20 flex-grow items-center text-global-default">
          <slot name="nav" :lang="current"></slot>
        </div>
      </div>
    </div>
    <div>
      <slot name="about" :lang="current">
        <ul class="flex items-center">
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
            class="hidden md:inline-block opacity-85 m-4 text-global-default"
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
<style scoped lang="scss">
$height: 72px;
.headerBg {
  height: $height;
  z-index: 999;
  //box-shadow: 0 0.5px 0 rgb(43 140 255 / 4%), 0 2px 12px rgb(0 50 108 / 4%);
  background: #eaf3fe;
  box-shadow: 0px 1px 0px rgba(43, 140, 255, 0.02),
    0px 4px 12px rgba(0, 0, 0, 0.06);

  :deep(.nav-menu-box) {
    top: $height;
  }
}
</style>
