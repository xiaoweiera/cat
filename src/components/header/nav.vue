<script setup lang="ts">
import { ref } from 'vue'
import { headerTag } from '~/store/header/login'
// @ts-ignore
import { current, nextLang, href } from '~/utils/lang'
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
const download = ref<string>('https://www.ikingdata.com/download')
const growthPad = ref('https://kingdata.com/growthpad')
// @ts-ignore
const onSwitchLang = function() {
  const url = href(window.location.href, nextLang())
  if (url) {
    // @ts-ignore
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
      <HeaderMobile></HeaderMobile>
    </div>
    <div class="flex items-center">
      <a
        v-if="headerTag.name === 'GrowthPad'"
        v-router="growthPad"
        class="block"
        target="_blank"
      >
        <img
          class="w-28 h-9.5"
          src="https://res.ikingdata.com/nav/navLogoAll.png"
          alt=""
        />
      </a>
      <a v-else href="https://www.kingdata.com" class="block" target="_blank">
        <img class="w-28 h-9.5" src="/assets/logo.svg" alt="" />
      </a>
      <div class="hidden md:inline-block">
        <HeaderPc></HeaderPc>
      </div>
      <div
        class="
          ml-12.5
          flex-grow
          items-center
          text-global-default
          hidden
          md:flex
          pr-8
        "
      >
        <slot name="nav" :lang="current"></slot>
      </div>
    </div>
    <div>
      <slot name="about" :lang="current">
        <ul class="flex items-center">
          <span
            class="hidden md:flex items-center hand text-global-default"
            @click.stop.prevent="onSwitchLang"
          >
            <img
              class="w-5 h-5"
              src="https://res.ikingdata.com/nav/navLang.png"
              alt=""
            />
            <span class="ml-1.5 opacity-85 inline-block whitespace-nowrap">
              {{ I18n.common.lang }}
            </span>
          </span>
          <!-- 下载 -->
          <div class="betweenIcon hidden md:block">|</div>
          <a
            class="hidden md:inline-block opacity-85 text-global-default"
            :href="download"
            target="_blank"
          >
            <span class="inline-block whitespace-nowrap">{{
              I18n.common.nav.download
            }}</span>
          </a>
          <div class="betweenIcon hidden md:block">|</div>
          <!-- 登录/注册 -->
          <HeaderLogin></HeaderLogin>
        </ul>
      </slot>
    </div>
  </nav>
</template>
<style scoped lang="scss">
.betweenIcon {
  color: rgba(37, 62, 111, 0.16);
  @apply mx-4;
}
.nav-logo {
  width: 113px;
  min-width: 113px;
}
$height: 72px;
.headerBg {
  height: $height;
  z-index: 999;
  //box-shadow: 0 0.5px 0 rgb(43 140 255 / 4%), 0 2px 12px rgb(0 50 108 / 4%);
  background: #eaf3fe;
  box-shadow: 0px 1px 0px rgba(43, 140, 255, 0.02),
    0px 4px 12px rgba(0, 0, 0, 0.06);

  ::v-deep(.nav-menu-box) {
    top: $height;
  }
}
</style>
