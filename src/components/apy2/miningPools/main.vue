<script setup lang="ts">
import { defineProps, onMounted, ref,computed } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import * as R from 'ramda'
const [tag,]=useProvide('tag','follow')
const [filterType,]=useProvide('filterType','all')

const tagList=computed(()=>{
  if(listTag && listTag.value[0]?.id!=='follow'){
    listTag.value.unshift({id:'follow',name:'关注矿池'})
  }
  return listTag.value
})
</script>
<template>
  <div>
    <Apy2MiningPoolsHeader :tagList="tagList" />
    <Apy2MiningTableMain class="mt-3"/>
  </div>
</template>
<style  lang="scss">

</style>
