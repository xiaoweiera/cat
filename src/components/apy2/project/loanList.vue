<script setup lang="ts">
import { defineProps, onMounted, ref,computed,watch } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import {getProjectLending_pools} from '~/logic/apy2/index'
import * as R from 'ramda'
const props=defineProps({projectId:Object})
const [project,]=useProvide('project','all')
const [txt,]=useProvide('txt','')
const [filterType,]=useProvide('filterType','all')
const [chained]=useProvide('chained','all')
const resultNumber=ref(0)
const param={
  project_id:'all',
  query:'',
  chain:'all',
  ordering:'desc',
  page:1,
  page_size:4
}
const listData=ref([])
const getList=async (clear:boolean)=>{
  const res=await getProjectLending_pools(param)
  resultNumber.value=res.length
  listData.value=clear?res:listData.value.concat(res)
}
watch(()=>[chained.value[0],txt.value[0]],(n)=>{
  param.page=1
  param.chain=n[0]
  param.query=n[1]
  getList(true)
})
const more=()=>{
  param.page++
  getList(false)
}
onMounted(getList(false))
</script>
<template>
  <div class="w-full h-full">
    <Apy2MiningPoolsHeader :hasCustom="false" :hasProject="false"  :type="false" :hasChain="true"  />
    <Apy2ProjectLoanTable :data="listData" class="mt-3"/>
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">加载更多</div>
</template>
<style  lang="scss">

</style>
