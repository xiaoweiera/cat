<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {getIconType} from '~/lib/tool'
const props = defineProps({
  logo: String,
  name: String,
  like: Boolean,
  chain: String,
  type: String
})
</script>
<template>
  <div class="flex items-center">
    <div class="font-kdExp relative pb-1">
      <IconFont type="icon-NEW" class="absolute z-1" size="24"/>
      <img class="w-8 h-8  ml-0.5 top-0.5 relative" :src="logo" alt="">
    </div>
    <div class="items-center flex">
      <div class="ml-1.5">
        <div class="flex items-center">
          <span class="mr-1 text-kd14px20px text-global-highTitle text-opacity-85 font-kdExp">{{ name }}</span>
          <IconFont class="text-global-highTitle text-opacity-45" type="icon-star-weixuanzhong" size="16"/>
        </div>
        <div class="flex items-center">
          <img class="w-3.5 mr-1" :src="chainsIcon[chain]" alt="">
          <IconFont :type="getIconType(type)" size="16"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>



