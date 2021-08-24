<script setup lang="ts">
import { defineProps, onMounted, ref,computed,watch } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import {getMiningPools} from '~/logic/apy2/index'
import * as R from 'ramda'
const [tag,setTag]=useProvide('tag','my')
const [project,]=useProvide('project','all')
const [txt,]=useProvide('txt','')
const [filterType,]=useProvide('filterType','all')
const [chained]=useProvide('chained','all')
const resultNumber=ref(0)
const param={
  group_id:0,
  symbol_type:'all',
  project_id:'all',
  query:'',
  chain:chain.value,
  ordering:'desc',
  page:1,
  page_size:4
}
const listData=ref([])
const tagList=computed(()=>{
  if(listTag && listTag.value[0]?.id!=='my'){
    listTag.value.unshift({id:'my',name:'自选'})
    setTag(listTag.value[1]?.id)
  }
  return listTag.value
})
const getList=async (clear:boolean)=>{
  const res=await getMiningPools(param)
  resultNumber.value=res.length
  listData.value=clear?res:listData.value.concat(res)
}
watch(()=>[tag.value[0],filterType.value[0],project.value[0],txt.value[0],chained.value[0]],(n)=>{
  if(!tag.value[0]) return
  param.page=1
  param.group_id=n[0]
  param.symbol_type=n[1]
  param.project_id=n[2]
  param.query=n[3]
  getList(true)
})
const more=()=>{
  param.page++
  getList(false)
}
</script>
<template>
  <div>
    <Apy2MiningPoolsHeader :hasCustom="true" :type="true" :hasChain="true" :tagList="tagList" />
    <Apy2MiningTableMain :data="listData" class="mt-3"/>
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">加载更多</div>
</template>
<style  lang="scss">

</style>
