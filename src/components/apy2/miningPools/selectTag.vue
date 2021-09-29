<script setup lang="ts">
import { ref,defineProps,defineEmits,computed } from 'vue'
import hmt from '~/lib/hmt'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chain} from '~/store/apy2/state'
import {  setInject, getInject } from '~/utils/use/state'
const props = defineProps({
  list: Object,
  type:String,
  tagType:String
})
const emitTag=defineEmits(['update:tag'])
const setTag=setInject('tag')
const tag=getInject('tag')
const changeTag=(id:number | string,name:any)=>{
  if(id==='my'){
    hmt.event('表格部分切换自选',`${props.type}_${props.tagType}_${chain.value}_${name}`)
  }else{
    hmt.event('表格部分切换分组',`${props.type}_${props.tagType}_favorite`)
  }
  setTag(id)
  emitTag('update:tag',id)
}
</script>
<template>
  <div class="flex items-center rounded-kd6px py-1 font-kdFang bg-global-highTitle bg-opacity-6 pl-1  showX ">
      <template v-for="(item,i) in props.list">
        <span  @click="changeTag(item.id,item.name)" :class="tag[0]===item.id?'selectTag':'tag'" class="hand">{{item.name}}</span>
      </template>
  </div>
</template>
<style scoped lang="scss">
.tag{
  @apply md:text-kd16px16px text-kd14px14px text-global-highTitle md:py-2 py-1.5 md:px-3 px-5   text-opacity-45 whitespace-nowrap;
}
.selectTag{
  @apply rounded-kd8px text-kd14px14px md:text-kd16px16px text-global-white md:py-2 py-1.5 md:px-3 px-5 bg-global-primary font-medium whitespace-nowrap;
}
</style>
