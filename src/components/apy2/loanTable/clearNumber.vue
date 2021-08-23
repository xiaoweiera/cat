
<script setup lang="ts">
import { defineProps } from 'vue'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  value0:Number,
  value1:Number
})
</script>
<template>
  <div class="font-kdExp">
      <span class="text-kd20px26px text-global-highTitle text-opacity-85">{{formatRulesNumber(value0)}}%</span>
      <span class=" text-global-highTitle text-opacity-85"> / {{formatRulesNumber(value1)}}%</span>
  </div>
</template>
<style scoped lang="scss">
</style>