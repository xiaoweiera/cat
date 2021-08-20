<script setup lang="ts">
import { uuid } from '~/utils'
import { defineProps, onMounted, ref,computed } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
const [tag]=useProvide('tag','collect')
const [filterType]=useProvide('filterType','all')
const typeList=ref([{name:'综合',key:'all'},{name:'单利',key:'single'}])
const tagList=computed(()=>{
  if(tableTag && tableTag.value[0]?.id!=='collect'){
    tableTag.value.unshift({id:'collect',name:'自选'})
  }
  return tableTag.value
})
const tableKey= computed(function () {
  return uuid(`${tag.value[0]}-${chain.value}-${filterType.value[0]}`)
})
</script>

<template>
  <div class="flex items-center justify-between">
    <Apy2MiningPoolsSelectTag  :list="tagList"   class="mr-10"/>
    <div class="flex items-center">
      <Apy2MiningPoolsFliter class="mr-3"  :list="typeList" />
    </div>
  </div>

<Apy2BaseTable type="mining" :key="tableKey" :groupId="tag[0]" :chain:="chain" :apyType="filterType[0]" class="mt-4"/>
</template>

<style lang="scss">

</style>
