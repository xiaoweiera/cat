<script setup lang="ts">
import { defineProps, onMounted, ref,computed,watch } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import {getTokenlending_pools} from '~/logic/apy2/index'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const props=defineProps({symbol:String})
const [project,]=useProvide('project','all')
const [txt,]=useProvide('txt','')
const [filterType,]=useProvide('filterType','all')
const [chained]=useProvide('chained','all')
const resultNumber=ref(0)
const  inCoin=ref('')
const  outCoin=ref('')
const param={
  lend_symbol:'all',
  loan_symbol:'all',
  project_id:'all',
  ordering:'desc',
  sort:undefined,
  chain:'all',
  page:1,
  page_size:10
}
const listData=ref([])
const getList=async (clear:boolean)=>{
  const res=await getTokenlending_pools(param)
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
  param.loan_symbol=n
  getList(false)}
)
onMounted(getList())
</script>
<template>
  <div class="w-full h-full">
    <Apy2MiningPoolsHeader :hasCustom="false" :hasProject="true"  :type="true" :hasChain="true"  />
    <Apy2LoanTableMain :data="listData" class="mt-3"/>
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">{{I18n.apyIndex.more}}</div>
</template>
<style  lang="scss">

</style>
