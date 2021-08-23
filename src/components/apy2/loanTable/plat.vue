
<script setup lang="ts">
import { defineProps } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
const props=defineProps({
 logo:String,
  name:String,
  chain:String,
  des:String
})
</script>
<template>
  <div class="flex items-center font-kdExp">
    <div class="relative mr-2">
      <IconFont type="icon-NEW" class="absolute" size="24"/>
      <IconFont size="32" :type="logo?logo:'icon-morentoken'"></IconFont>
    </div>
    <div>
      <div class="flex items-center text-kd14px20px text-global-highTitle text-opacity-85">
        <span class="mr-1">{{name}}</span>
        <img class="w-3.5" :src="chainsIcon[chain]" alt="">
      </div>
      <span v-if="des" class="rounded-kd4px bg-global-highTitle  px-1 py-0.5 text-center bg-opacity-6 text-kd12px14px text-global-highTitle text-opacity-45">{{des}}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>
