<script setup lang="ts">
import { ref,defineProps,defineEmits } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import hmt from '~/lib/hmt'
import {  setInject, getInject } from '~/utils/use/state'
const props = defineProps({
  list: Object,
  type:String
})
const setFilterType=setInject('filterType')
const emitEvent = defineEmits(['update:filterType'])
const tag=ref('all')
const changeTag=(key:string)=>{
  if(props.type){
    hmt.event('底部榜单切换币种类型',`${props.type}IconChange`)
  }
  tag.value=key
  setFilterType(key)
  emitEvent('update:filterType',key)
}
</script>
<template>
  <div class="flex items-center rounded-kd6px p-0.5 font-kdFang bg-global-white w-fit" style="border:1px solid rgba(3, 54, 102, 0.1);">
    <template v-for="(item,i) in props.list">
      <span @click="changeTag(item.key)" :class="tag===item.key?'selectTag':'tag'" class="py-1.5 px-3 hand">{{item.name}}</span>
    </template>
  </div>
</template>
<style scoped lang="scss">
.tag{
  @apply text-kd14px18px text-global-highTitle text-opacity-85 whitespace-nowrap;
}
.selectTag{
  @apply rounded-kd4px text-kd14px18px text-global-white bg-global-primary font-medium whitespace-nowrap;
}
</style>
