<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  value0:String,
  value1:String
})
</script>
<template>
    <div v-if="value0">
      <span class="font-kdFang  text-kd12px16px text-global-highTitle text-opacity-45">{{I18n.apyIndex.singleInterest}}: </span>
      <span class="font-kdExp text-kd12px16px text-global-highTitle text-opacity-85">{{value0}}</span>
    </div>
    <div v-if="value1" class="font-kdFang  ">
      <span class="font-kdFang  text-kd12px16px text-global-highTitle text-opacity-45">{{I18n.apyIndex.compoundInterest}}: </span>
      <span class="font-kdExp text-kd12px16px text-global-highTitle text-opacity-85">{{value1}}</span>
    </div>
</template>
<style scoped lang="scss">
</style>