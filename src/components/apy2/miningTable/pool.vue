<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase,tolocaleLowerCase} from '~/lib/tool'
import { toBoolean } from '~/utils'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  id:Number,
  followed:Boolean,
  type:String,
  logo:String,
  name:String,
  like:Boolean,
  project:String,
  chain:String,
  category:String,
  strategy:String,
  isNew:Boolean
})
const iconSize=computed(()=>props.type==='token'?'24':'16')
const imgHeight=computed(()=>props.type==='token'?'h-8':'h-6')
const like=computed(()=>props.like?'icon-star-xuanzhong':'icon-star-weixuanzhong')
const likeClass=computed(()=>props.like?'text-global-primary':'text-global-highTitle text-opacity-45')
</script>
<template>
  <div class="font-kdExp flex items-center">
    <div class="relative mr-2" >
      <IconFont class="xshidden" :type="logo" :class="{'new-24': isNew}"  size="32"/>
      <IconFont class="mdhidden" :type="logo" :class="{'new-16': isNew}"  size="24"/>
    </div>
    <div>
      <div class="flex items-center">
        <span class="mr-1 text-kd14px20px text-global-highTitle text-opacity-85">{{name}}</span>
        <Apy2BaseFollow class="ml-1 lp-follow text-global-highTitle text-opacity-45" :pool="true" type="mining" :value="id" :status="toBoolean(followed)"/>
      </div>

      <div class="flex items-center">
        <span v-if="project" class="text-kd12px18px text-global-highTitle text-opacity-65 md:mr-1 w-max">{{project}}</span>
        <img v-if="chain" class="w-3.5 h-3.5 mr-1" :src="chainsIcon[tolocaleLowerCase(chain)]" alt="">
        <IconFont v-if="category" :type="`icon-${tolocaleUpperCase(category)}`" size="14"/>
      </div>
      <div v-if="strategy" class="text-kd10px10px md:text-kd12px14px max-h-4.5 flex items-center w-fit tracking-wide text-global-highTitle text-opacity-45 px-1  bg-global-highTitle bg-opacity-6 text-center rounded-kd4px">
        {{strategy}}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>