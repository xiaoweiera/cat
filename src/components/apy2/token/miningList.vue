<script setup lang="ts">
import { defineProps, onMounted,onBeforeMount, ref,computed,watch } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import {getProjectTokenMining_pools} from '~/logic/apy2/index'
import * as R from 'ramda'
const props=defineProps({projectId:Object,symbol:String})
const [project,]=useProvide('project','all')
const [txt,]=useProvide('txt','')
const [filterType,]=useProvide('filterType','all')
const [chained]=useProvide('chained','all')
const resultNumber=ref(0)
const param={
  project_id:project.value[0],
  symbol:props.symbol,
  symbol_type:filterType.value[0],
  query:'',
  chain:chained.value[0],
  ordering:'desc',
  page:1,
  page_size:4
}
const listData=ref([])
const getList=async (clear:boolean)=>{
  console.log(param,'mmmm')
  const res=await getProjectTokenMining_pools(param)
  resultNumber.value=res.length
  listData.value=clear?res:listData.value.concat(res)
}
watch(()=>[filterType.value[0],project.value[0],chained.value[0],txt.value[0]],(n)=>{
  param.page=1
  param.symbol_type=n[0]
  param.project_id=n[1]
  param.chain=n[2]
  param.query=n[3]
  getList(true)
})
const more=()=>{
  param.page++
  getList(false)
}
watch(()=>props.symbol,(n)=> {
  param.symbol=n
  getList(false)}
)
</script>
<template>
  <div class="w-full h-full">
    <Apy2MiningPoolsHeader :hasCustom="false" :hasProject="true"  :type="true" :hasChain="true"  />
    <Apy2MiningTableMain :data="listData" class="mt-3"/>
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">加载更多</div>
</template>
<style  lang="scss">

</style>
