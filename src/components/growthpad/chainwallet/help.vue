<script setup lang="ts">
  import I18n from '~/utils/i18n/index'
</script>

<template>
  <div class="help-box p-3 text-kdFang whitespace-nowrap">
    <span class="text-center mb-2 hidden md:block">
      <img class="inline-block w-20" src="https://res.ikingdata.com/static/share/growth_qrcode.jpg?r=2&lang=en"/>
    </span>
    <span class="inline-block md:block text-sm leading-5 md:whitespace-pre-line max-w-xs overflow-x-auto">
      <span class="md:block">{{ I18n.growthpad.chainwallet.help.val1 }}</span>
      <span class="md:block">{{ I18n.growthpad.chainwallet.help.val2 }}</span>
    </span>
    <a class="inline-block ml-5 md:ml-0 md:block md:mt-2 cursor-pointer" target="_blank" v-router="I18n.growthpad.chainwallet.about.telegram">
      <span class="md:w-full inline-block join-btn text-xs leading-4 py-1 px-3 text-center text-white">{{ I18n.common.chat.joinTelegram }}</span>
    </a>
  </div>
</template>

<style scoped lang="scss">
  .help-box {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
  }
  .join-btn {
    background: #2B8DFE;
    border-radius: 12px;
  }
</style>
