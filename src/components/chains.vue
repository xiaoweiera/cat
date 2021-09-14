<script setup lang="ts">
import router, { getParam } from '~/utils/router'
import {onBeforeMount,ref } from 'vue'

import {getChains} from '~/logic/topRank/dapp'
import {chains} from '~/logic/apy2/config'
import I18n from '~/utils/i18n/index'

const chain = ref<string>('all')

const getHref =(key:string)=> {
  return router({
    query: {
      chain: key
    }
  })
}

onBeforeMount(()=> {
  chain.value = getParam<string>('chain', 'all') as string
})
</script>
<template>
  <div class="flex   md:flex-wrap flex-nowrap      font-kdFang flex-wrap md:border-b-1 border-global-highTitle  border-opacity-6" >
    <template v-for="item in chains">
      <a :href="getHref(item.key)" :class="chain===item.key?'selectedTag ':'tag'" class="flex hand  rounded-kd20px max-h-9  flex items-center justify-center " style="flex-shrink:0;" >
        <IconFont size="20" type="" class="mr-1"/>
        <div >{{item.name===I18n.apyIndex.allChain?I18n.apyIndex.all:item.name}}</div>
      </a>
    </template>
  </div>
</template>
<style scoped  lang="scss">
.tag{
  @apply px-3 py-1.5   mr-3  text-kd16px24px text-global-highTitle text-opacity-85 ;
}
.selectedTag{
  @apply px-3 py-1.5 bg-global-primary   mr-3  text-kd16px24px text-global-white ;
}
</style>
