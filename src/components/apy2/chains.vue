<script setup lang="ts">
import {onBeforeMount } from 'vue'
import {useRoute} from 'vue-router'
import {chains} from '~/logic/apy2/config'
import {chain} from '~/store/apy2/state'
import * as lang from '~/utils/lang'
const route = useRoute()
const getHref =(key:string)=>`?chain=${key}&lang=${lang.current.value}`
onBeforeMount(()=>chain.value=route.query.chain || 'all')
</script>
<template>
<div class="flex justify-center items-center font-kdFang flex-wrap">
  <template v-for="item in chains">
    <a :href="getHref(item.key)" :class="chain===item.key?'selectedTag':'tag'" class="content-fit hand mr-12 flex items-center justify-center ">
        <img class="w-8 h-8" :src="item.icon" alt="">
        <div class="ml-1.5 ">{{item.name}}</div>
    </a>
  </template>
</div>
</template>
<style scoped lang="scss">
.tag{
  @apply  p-2 text-kd24px24px text-global-highTitle font-medium  text-opacity-65;
}
.selectedTag{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  @apply p-2  text-kd24px24px text-global-primary font-medium;
}
</style>
