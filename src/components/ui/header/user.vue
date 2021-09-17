<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import { href, nextLang } from '~/utils/lang'
import { env } from '~/lib/process'

const onSwitchLang = function() {
  const url = href(window.location.href, nextLang())
  if (url) {
    // @ts-ignore
    window.location.href = url
  }
}

</script>

<template>
  <div class="flex items-center text-white">
    <span class="flex items-center cursor-pointer" @click.stop.prevent="onSwitchLang">
      <IconFont class="hidden md:flex text-sm" type="icon-yuyan" size="22"/>
      <span class="ml-1.5 inline-block whitespace-nowrap text-14-18">{{ I18n.common.lang }}</span>
    </span>

    <span class="split hidden lg:inline-block">|</span>

    <a v-router.blank="env.appDownload" class="hidden lg:inline-block">
      <span class="inline-block whitespace-nowrap text-14-18">{{I18n.common.nav.download }}</span>
    </a>

    <span class="split inline-block">|</span>

    <!-- 登录/注册 -->
    <HeaderLogin></HeaderLogin>

<!--    <div class="hidden xl:flex bg-white py-2 px-3 items-center ml-4 text-global-primary rounded cursor-pointer">-->
<!--      <IconFont class="flex" type="icon-qianbao" size="22"/>-->
<!--      <span class="ml-1.5 inline-block whitespace-nowrap">链接钱包</span>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.split {
  @apply mx-4 text-white text-opacity-65;
}
</style>
