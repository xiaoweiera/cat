<script setup lang="ts">
import { ref, defineProps,watch,onMounted } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {getLoanPools} from '~/logic/apy2/index'
const [inCoin,]=useProvide('inCoin',I18n.apyIndex.all)
const [outCoin,]=useProvide('outCoin',I18n.apyIndex.all)
const [projectId,]=useProvide('projectId',I18n.apyIndex.all)
const [chained,]=useProvide('chained',I18n.apyIndex.all)
const [key,]=useProvide('key',0)
const resultNumber=ref(0)
const param={
  lend_symbol:inCoin.value[0],
  loan_symbol:outCoin.value[0],
  project_id:'all',
  chain:'all',
  page:1,
  page_size:10
}
const listData=ref([])
const getList=async (clear:boolean)=>{
  param.lend_symbol=param.lend_symbol===I18n.apyIndex.all?'all':param.lend_symbol
  param.loan_symbol=param.loan_symbol===I18n.apyIndex.all?'all':param.loan_symbol
  param.chain=param.chain===I18n.apyIndex.all?'all':param.chain
  param.project_id=param.project_id===I18n.apyIndex.all?'all':param.project_id
  const res=await getLoanPools(param)
  resultNumber.value=res?.length
  listData.value=clear?res:listData.value.concat(res)
}
watch(()=>[inCoin.value[0],outCoin.value[0],projectId.value[0],chained.value[0]],(n)=>{
  param.page=1
  param.lend_symbol=n[0]
  param.loan_symbol=n[1]
  param.project_id=n[2]
  param.chain=n[3]
  // getList(true)

})
const search=()=>{
  getList(true)
}
const more=()=>{
  param.page++
  getList(false)
}
onMounted(getList(true))
</script>
<template>
  <div>
    <div class="font-kdFang font-medium text-kd20px24px text-global-highTitle text-opacity-85">{{I18n.apyIndex.loanListDes}}</div>
    <Apy2LoanPoolsHeader  @search="search" class="mt-4"/>
    <Apy2LoanTableMain :data="listData"  :key="key[0]" />
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">{{I18n.apyIndex.more}}</div>
</template>
<style  lang="scss">

</style>
