<script setup lang="ts">
import { defineProps, onMounted, ref,computed,watch } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import {getProjectMining_pools} from '~/logic/apy2/index'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const props=defineProps({projectId:Object})
const [project,]=useProvide('project','all')
const [txt,]=useProvide('txt','')
const [filterType,]=useProvide('filterType','all')
const [chained]=useProvide('chained','all')
const resultNumber=ref(0)
const param={
  // symbol_type:'all',
  project_id:props.projectId,
  // project_id:'all',
  query:'',
  chain:chained.value[0],
  ordering:'desc',
  page:1,
  page_size:10
}
const listData=ref([])
const getList=async (clear:boolean)=>{
  const res=await getProjectMining_pools(param)
  resultNumber.value=res.length
  listData.value=clear?res:listData.value.concat(res)
}
watch(()=>[filterType.value[0],chained.value[0],txt.value[0]],(n)=>{
  param.page=1
  param.symbol_type=n[0]
  param.chain=n[1]
  param.query=n[2]
  getList(true)
})
const more=()=>{
  param.page++
  getList(false)
}
onMounted(()=>getList(false))
</script>
<template>
  <div class="w-full h-full">
    <Apy2MiningPoolsHeader class=" mb-3"  :hasCustom="false" :hasProject="false"  :type="true" :hasChain="true"  />
    <Apy2ProjectMiningTable :data="listData"  />
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">{{I18n.apyIndex.more}}</div>
</template>
<style  lang="scss">

</style>
