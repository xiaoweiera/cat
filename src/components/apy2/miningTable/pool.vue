<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
const props=defineProps({
  data:Object
})
const iconSize=computed(()=>props.data.type==='token'?'24':'16')
const imgHeight=computed(()=>props.data.type==='token'?'h-8':'h-6')
const like=computed(()=>props.data.like?'icon-star-xuanzhong':'icon-star-weixuanzhong')
const likeClass=computed(()=>props.data.like?'text-global-primary':'text-global-highTitle text-opacity-45')
</script>
<template>
  <div class="font-kdExp flex items-center">
    <div class="relative mr-2">
      <IconFont type="icon-NEW" class="absolute" :size="iconSize"/>
      <img :class="imgHeight" class="w-8" src="https://res.ikingdata.com/apyTwo/hecoChain.jpg" alt="">
    </div>
    <div>
      <div class="flex items-center">
        <span class="mr-1 text-kd14px20px text-global-highTitle text-opacity-85">ETH</span>
        <IconFont :class="likeClass" :type="like"/>
      </div>
      <div class="flex items-center">
        <span class="text-12px18px text-global-highTitle text-opacity-65 mr-1">{{data.project}}</span>
        <img class="w-3.5 h-3.5 mr-1" :src="chainsIcon[data.projectLogo]" alt="">
        <IconFont :type="`icon-${tolocaleUpperCase(data.projectType)}`" size="14"/>
      </div>
      <div class="text-12px14px w-fit tracking-wide text-global-highTitle text-opacity-45 px-1 py-0.5 bg-global-highTitle bg-opacity-6 text-center rounded-kd4px">
        {{data.des}}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>