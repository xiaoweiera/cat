<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
// @ts-ignore
import { toInteger } from '~/utils'

defineProps({
  index: {
    type: [String, Number],
    default: () => '0'
  }
})

</script>
<template>
  <div class="w-full h-12 pl-4 pr-2.5 flex items-center">
    <span class="text-kdFang text-base font-medium text-global-highTitle">
      <span v-if="toInteger(index) === 0">
        <span>{{I18n.apyIndex.tokens}}</span>
      </span>
      <span v-else>TOP {{ index }}</span>
    </span>
  </div>
</template>

