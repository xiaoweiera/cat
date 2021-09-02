
<script setup lang="ts">
import { defineProps,computed } from 'vue'
import {formatRulesNumber} from '~/lib/tool'
const props=defineProps({
  logo:String,
  name:String,
  value:Number,
  des:String
})
const getColor=computed(()=>props.value>=0?'text-global-numGreen':'text-global-numRed')
</script>
<template>
  <div class="font-kdExp  text-center">
    <div class="flex items-center justify-center">
      <img class="w-4 h-4 mr-1" :src="logo" alt="">
        <span class="text-kd12px16px text-global-highTitle">{{name}}</span>
    </div>
    <div :class="getColor" class="text-kd20px26px font-bold">{{formatRulesNumber(value)}}%</div>
    <div class="text-kd12px16px text-highTitle text-opacity-65">{{des}}</div>
  </div>
</template>
<style scoped lang="scss">
</style>