<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  apy:Number,
  des:String
})
const apyClass=computed(()=>props.apy>=0?'text-global-numGreen':'text-global-numRed')
</script>
<template>
    <div  :class="apyClass" class="font-kdExp text-kd20px26px font-bold whitespace-nowrap">{{formatRulesNumber(apy)}}%</div>
    <div v-if="des" class="font-kdFang text-kd12px16px text-global-highTitle text-opacity-65">{{des}}</div>
</template>
<style scoped lang="scss">
</style>