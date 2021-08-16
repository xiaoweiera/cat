<script setup lang="ts">
import { ref,defineProps,defineEmit } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {  setInject, getInject } from '~/utils/use/state'
const props = defineProps({
  list: Object,
})
const emitTag=defineEmit(['update:tag'])
const setTag=setInject('tag')
const tag=ref(props.list[1].key)
const changeTag=(key:string)=>{
  tag.value=key
  setTag(key)
  emitTag('update:tag',key)
}

</script>
<template>
  <div class="flex items-center rounded-kd12px py-1 font-kdFang bg-global-highTitle bg-opacity-6 px-1 ">
      <template v-for="(item,i) in props.list">
        <span @click="changeTag(item.key)" :class="tag===item.key?'selectTag':'tag'" class="py-2 px-3 hand">{{item.name}}</span>
      </template>
  </div>
</template>
<style scoped lang="scss">
.tag{
  @apply text-kd24px24px text-global-highTitle text-opacity-45 whitespace-nowrap;
}
.selectTag{
  @apply rounded-kd8px text-kd24px24px text-global-white bg-global-primary font-medium whitespace-nowrap;
}
</style>
