
<script setup lang="ts">
import { defineProps } from 'vue'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  value:String
})
</script>
<template class="font-kdExp">
  <div class="text-kd14px20px text-global-highTitle text-opacity-85">
      <span>{{formatRulesNumber(value)}}</span>
  </div>
</template>
