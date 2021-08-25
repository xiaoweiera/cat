<script setup lang="ts">
import { ref, defineProps,watch,onMounted } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {getLoanPools} from '~/logic/apy2/index'
const [inCoin,]=useProvide('inCoin','全部')
const [outCoin,]=useProvide('outCoin','全部')
const [projectId,]=useProvide('projectId','全部')
const [chained,]=useProvide('chained','全部')
const [key,]=useProvide('key',0)
const resultNumber=ref(0)
const param={
  lend_symbol:inCoin.value[0],
  loan_symbol:outCoin.value[0],
  project_id:'all',
  chain:'all',
  page:1,
  page_size:4
}
const listData=ref([])
const getList=async (clear:boolean)=>{
  param.lend_symbol=param.lend_symbol==='全部'?'all':param.lend_symbol
  param.loan_symbol=param.loan_symbol==='全部'?'all':param.loan_symbol
  param.chain=param.chain==='全部'?'all':param.chain
  param.project_id=param.project_id==='全部'?'all':param.project_id
  const res=await getLoanPools(param)
  console.log('res',res)
  resultNumber.value=res?.length
  listData.value=clear?res:listData.value.concat(res)
  listData.value=listData.value?.concat(res)
  console.log(res,'result')
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
    <div class="font-kdFang font-medium text-kd18px24px text-global-highTitle text-opacity-85">抵押借贷最佳路径</div>
    <Apy2LoanPoolsHeader  @search="search" class="mt-4"/>
    <Apy2LoanTableMain :data="listData"  :key="key[0]" />
  </div>
  <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">加载更多</div>
</template>
<style  lang="scss">

</style>
