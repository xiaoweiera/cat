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
<div class="flex md:justify-center  md:flex-wrap flex-nowrap  showXChain    font-kdFang flex-wrap md:border-b-1 border-global-highTitle  border-opacity-6" >
  <template v-for="item in chains">
    <a :href="getHref(item.key)" :class="chain===item.key?'selectedTag ':'tag'" class="flex hand pr-1.5 pl-0.5   flex items-center justify-center " style="flex-shrink:0;" >
        <img class="md:w-8 md:h-8 w-6 h-6" :src="item.icon" alt="">
        <div class="ml-1.5 md:text-kd24px24px text-kd18px18px ">{{item.name===I18n.apyIndex.allChain?I18n.apyIndex.all:item.name}}</div>
    </a>
  </template>
</div>
</template>
<style scoped  lang="scss">
.showXChain{
  @apply overflow-hidden overflow-x-scroll;
}
/* 滑轮样式 */
.showXChain::-webkit-scrollbar {
  height: 0px;
}

.showXChain::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0);
}
.containerBottomBor{
  border-bottom:1.5px solid #F0F0F0;
}
.tag{
  border-bottom:2px solid rgba(43, 141, 254, 0);
  @apply pb-2.5 mr-3 md:mr-12 text-kd24px24px text-global-highTitle font-medium   text-opacity-65;
}
.selectedTag{
  border-bottom:3px solid rgba(43, 141, 254, 1);
  @apply pb-2.5 mr-3  md:mr-12  text-kd24px24px text-global-primary font-medium ;
}
</style>
