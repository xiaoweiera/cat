<script setup lang="ts">
import I18n from '~/utils/i18n/index'
const download = 'https://www.kingdata.com/download'
</script>

<template>
  <div class="flex items-center text-sm text-kdFang text-white">
      <span class="flex items-center">
        <IconFont class="flex" type="icon-yuyan" size="22"/>
        <span class="ml-1.5 inline-block whitespace-nowrap">{{ I18n.common.lang }}</span>
      </span>
    <span class="split">|</span>
    <a v-router.blank="download" class="inline-block">
      <span class="inline-block whitespace-nowrap">{{I18n.common.nav.download }}</span>
    </a>
    <span class="split">|</span>
    <span class="flex cursor-pointer">
        <IconFont class="flex" type="icon-yonghu1" size="22"/>
      </span>
    <div class="bg-white py-2 px-3 flex items-center ml-4 text-global-primary rounded cursor-pointer">
      <IconFont class="flex" type="icon-qianbao" size="22"/>
      <span class="ml-1.5">链接钱包</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split {
  @apply inline-block px-4 text-white text-opacity-65;
}
</style>
