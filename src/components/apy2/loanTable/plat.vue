
<script setup lang="ts">
import { defineProps } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleLowerCase} from '~/lib/tool'
const props=defineProps({
 logo:String,
  name:String,
  chain:String,
  des:String,
  isNew:Boolean
})
</script>
<template>
  <div class="flex items-center font-kdExp">
    <div class="relative mr-2" >
      <IconFont class="xshidden" :type="logo?logo:'icon-morentoken'" :class="{'new-24': isNew}"  size="32"/>
      <IconFont class="mdhidden" :type="logo?logo:'icon-morentoken'" :class="{'new-16': isNew}"  size="24"/>
    </div>
    <div>
      <div class="flex items-center text-kd14px20px text-global-highTitle text-opacity-85">
        <span class="mr-1">{{name}}</span>
        <img class="w-3.5" :src="chainsIcon[tolocaleLowerCase(chain)]" alt="">
      </div>
      <span v-if="des" class="rounded-kd4px bg-global-highTitle  px-1 py-0.5 text-center bg-opacity-6 text-kd12px14px text-global-highTitle text-opacity-45">{{des}}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>
