<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
const props=defineProps({
  data:Object
})
const apyClass=computed(()=>props.data.apy>=0?'text-global-numGreen':'text-global-numRed')
</script>
<template>
    <div :class="apyClass" class="font-kdExp text-kd20px26px font-bold whitespace-nowrap">{{data.apy}}%</div>
    <div class="font-kdFang text-kd12px16px text-global-highTitle text-opacity-65">{{data.apyDes}}</div>
</template>
<style scoped lang="scss">
</style>