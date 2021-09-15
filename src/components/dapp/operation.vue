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
  <div>
    <a v-router.blank="data.website" class="flex items-center text-global-darkblue justify-end cursor-pointer">
      <span class="text-sm">{{ I18n.dapp.website }}</span>
      <IconFont type="icon-right" size="xs"/>
    </a>
    <div class="pt-3">
      <DappStar :id="data.id" :value="data.clout" :clouted="data.is_clouted"/>
    </div>
  </div>
</template>

