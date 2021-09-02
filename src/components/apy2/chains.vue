<script setup lang="ts">
import {onBeforeMount } from 'vue'
import {useRoute} from 'vue-router'
import {chains} from '~/logic/apy2/config'
import {chain} from '~/store/apy2/state'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
const route = useRoute()
const getHref =(key:string)=>`?chain=${key}&lang=${lang.current.value}`
onBeforeMount(()=>chain.value=route.query.chain || 'all')
</script>
<template>
<div class="flex justify-center   font-kdFang flex-wrap containerBottomBor" >
  <template v-for="item in chains">
    <a :href="getHref(item.key)" :class="chain===item.key?'selectedTag':'tag'" class="content-fit hand px-1.5   flex items-center justify-center ">
        <img class="w-8 h-8" :src="item.icon" alt="">
        <div class="ml-1.5 ">{{item.name===I18n.apyIndex.allChain?I18n.apyIndex.all:item.name}}</div>
    </a>
  </template>
</div>
</template>
<style scoped lang="scss">
.containerBottomBor{
  border-bottom:1.5px solid #F0F0F0;
}
.tag{
  border-bottom:2px solid rgba(43, 141, 254, 0);
  @apply pb-2.5  mr-12 text-kd24px24px text-global-highTitle font-medium  text-opacity-65;
}
.selectedTag{
  border-bottom:3px solid rgba(43, 141, 254, 1);
  @apply pb-2.5  mr-12  text-kd24px24px text-global-primary font-medium ;
}
</style>
