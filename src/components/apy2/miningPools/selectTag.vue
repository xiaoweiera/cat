<script setup lang="ts">
import { ref,defineProps,defineEmit,computed } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {  setInject, getInject } from '~/utils/use/state'
const props = defineProps({
  list: Object,
})
const emitTag=defineEmits(['update:tag'])
const setTag=setInject('tag')
const tag=getInject('tag')
const changeTag=(id:number | string)=>{
  setTag(id)
  emitTag('update:tag',id)
}
</script>
<template>
  <div class="flex items-center rounded-kd6px py-1 font-kdFang bg-global-highTitle bg-opacity-6 pl-1  showX ">
      <template v-for="(item,i) in props.list">
        <span v-login @click="changeTag(item.id)" :class="tag[0]===item.id?'selectTag':'tag'" class="hand">{{item.name}}</span>
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
