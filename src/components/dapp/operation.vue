<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'

defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="text-right">
    <div>
      <a v-router.blank="data.website" class="inline-flex items-center text-global-darkblue justify-end cursor-pointer">
        <span class="text-14-18">{{ I18n.dapp.website }}</span>
        <IconFont type="icon-right" size="xs"/>
      </a>
    </div>
    <div class="pt-3">
      <div class="inline-block">
        <DappStar :id="data.id" :value="data.clout" :clouted="data.is_clouted"/>
      </div>
    </div>
  </div>
</template>

