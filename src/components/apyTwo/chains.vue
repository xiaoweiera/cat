<script setup lang="ts">
import { ref, defineProps } from 'vue'
import {chains} from '~/logic/apyTwo/mining/config'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  filterData: Object,
  tagType: String,
})
const selectName=ref('all')
const selectTag=(key:string)=>selectName.value=key
</script>
<template>
<div class="flex justify-center items-center font-kdFang flex-wrap">
  <template v-for="item in chains">
    <div @click="selectTag(item.key)" :class="selectName===item.key?'selectedTag':'tag'" class="content-fit hand mr-12 flex items-center justify-center ">
        <img class="w-8 h-8" :src="item.icon" alt="">
        <div class="ml-1.5 ">{{item.name}}</div>
    </div>
  </template>
</div>
</template>
<style scoped lang="postcss">
.tag{
  @apply  p-2 text-kd24px24px text-global-highTitle font-medium  text-opacity-65;
}
.selectedTag{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  @apply p-2  text-kd24px24px text-global-primary font-medium;
}
</style>
