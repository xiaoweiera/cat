<script setup lang="ts">
import I18n from '~/utils/i18n/index'
const apply = 'http://ikingdata.mikecrm.com/jCRg6mX'
</script>

<template>
  <div class="bg-white">
    <div class="pt-4 md:pt-8 px-4">
      <div class="flex items-center justify-center text-kdFang">
        <h2 class="mr-3 text-global-highTitle text-32 hidden md:block">{{ I18n.dapp.title }}</h2>
        <h2 class="mr-3 text-global-highTitle text-kd22px22px block md:hidden ">{{ I18n.dapp.title }}</h2>
        <a v-router.blank="apply" class="text-white bg-global-darkblue rounded-kd34px px-4 py-2 flex items-center whitespace-nowrap">
          <IconFont type="icon-shangchuan" size="16"/>
          <span class="text-xs md:text-sm ml-1.5">{{ I18n.dapp.apply }}</span>
        </a>
      </div>
    </div>
    <div class="pt-4 md:pt-6 pb-4 md:pb-3 px-4">
      <div class="flex justify-center">
        <Chains/>
      </div>
    </div>
    <div>
      <DappDiscover/>
    </div>
  </div>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
