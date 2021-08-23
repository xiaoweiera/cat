
<script setup lang="ts">
import { defineProps } from 'vue'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  value:String,
  valueRate:String
})
</script>
<template class="font-kdExp">
  <div class="text-kd14px20px text-global-highTitle text-opacity-85">
    $
    <span v-if="value || valueRate">
      <span>{{formatRulesNumber(value)}}</span>
      <span>{{formatRulesNumber(valueRate)}}</span>
    </span>
    <span v-else>-</span>

  </div>
</template>
<style scoped lang="scss">
</style>