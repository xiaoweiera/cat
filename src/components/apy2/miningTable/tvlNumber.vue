<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
const props=defineProps({
  tvl:String,
  des:String
})
</script>
<template>
  <div class="  items-center">
    <div class="font-kdExp text-kd14px20px text-global-highTitle text-opacity-85">
      <span>TVL: </span>
      <span>{{tvl}}</span>
    </div>
    <div class="font-kdFang mt-1 text-kd12px16px text-global-highTitle text-opacity-45">
      <span>剩余可投额度: </span>
      <span>{{des}}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>