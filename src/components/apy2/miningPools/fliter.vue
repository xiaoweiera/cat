<script setup lang="ts">
import { ref,defineProps,defineEmit } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {  setInject, getInject } from '~/utils/use/state'
const props = defineProps({
  list: Object,
})
const setFilterType=setInject('filterType')
const emitEvent = defineEmit(['update:filterType'])
const tag=ref('全部')
const changeTag=(name:string)=>{
  tag.value=name
  setFilterType(name)
  emitEvent('update:filterType',name)
}

</script>
<template>
  <div class="flex items-center rounded-kd6px p-0.5 font-kdFang bg-global-white w-fit-content" style="border:1px solid rgba(3, 54, 102, 0.1);">
    <template v-for="(item,i) in props.list">
      <span @click="changeTag(item)" :class="tag===item?'selectTag':'tag'" class="py-1.5 px-3 hand">{{item}}</span>
    </template>
  </div>
</template>
<style scoped lang="scss">
.tag{
  @apply text-kd14px18px text-global-highTitle text-opacity-85;
}
.selectTag{
  @apply rounded-kd4px text-kd14px18px text-global-white bg-global-primary font-medium;
}
</style>
