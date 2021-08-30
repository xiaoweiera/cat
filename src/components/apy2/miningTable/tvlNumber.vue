<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {formatRulesNumber,getBoolean} from '~/lib/tool'
const props=defineProps({
  name:String,
  tvl:String,
  remainTvl:String,
  tvlRate:String
})
</script>
<template>
  <div class="  items-center">
    <div class="font-kdExp text-kd14px20px text-global-highTitle text-opacity-85">
      <span>TVL: </span>
      <span>${{formatRulesNumber(tvl)}}</span>
<!--      <span class="ml-1">{{name}}</span>-->
    </div>
    <div v-if="getBoolean(remainTvl) || getBoolean(tvlRate)" class="font-kdFang mt-1 text-kd12px16px text-global-highTitle text-opacity-45">
      <span>剩余可投额度: </span>
      <span>${{formatRulesNumber(remainTvl)}} ({{formatRulesNumber(tvlRate)}}%)</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>