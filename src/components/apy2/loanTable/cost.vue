
<script setup lang="ts">
import { defineProps } from 'vue'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  value:Number
})
</script>
<template>
    <div :class="value>=0?'text-global-numGreen':'text-global-numRed'" class="text-kd26px26px font-bold font-kdExp">{{formatRulesNumber(value)}}%</div>
</template>
