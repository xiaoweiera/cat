<script setup lang="ts">
import I18n from '~/utils/i18n/index'
const apply = 'http://ikingdata.mikecrm.com/ijyjMFO'
</script>

<template>
  <div class="pt-8 bg-white">
    <div>
      <div class="flex items-center justify-center">
        <h2 class="mr-3 text-global-highTitle text-32">{{ I18n.dapp.title }}</h2>
        <a v-router.blank="apply" class="text-white bg-global-darkblue rounded-kd34px px-4 py-2 flex items-center">
          <IconFont type="icon-shangchuan" size="16"/>
          <span class="text-sm ml-1.5">{{ I18n.dapp.apply }}</span>
        </a>
      </div>
    </div>
    <div class="pt-6 pb-3">
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
