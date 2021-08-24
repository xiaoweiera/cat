<script lang="ts" setup>
import {onMounted} from 'vue'
import {chain,rankingTag,tableTag,listTag,tokenList} from '~/store/apy2/state'
import {getLendingGroup,getTokenList} from '~/logic/apy2/index'
const getGroupData=async ()=>{
  const result=await getLendingGroup(chain.value)
  console.log(result,'group')
  rankingTag.value=result?.ranking
  tableTag.value=result?.table
  listTag.value=result?.list
}
const getTokens=async ()=>tokenList.value=await getTokenList()
onMounted(async ()=>{
  await getTokens()
  await getGroupData()
})
</script>
<template>
  <div class=" flex justify-center   bg-global-white  h-full font-kdFang " >
    <div class="max-w-360  px-20  relative w-full h-full container ">
      <div class="flex items-center justify-between">
        <Apy2BaseHeader class="mt-8"/>
        <Apy2SelectContainerSelectTool pageType="lend" class="absolute -top-3  right-7" />
      </div>
      <div class="x-xian mt-6"></div>
      <div class="flex w-full py-6 bottomBorder">
        <div class="flex flex-1 ">
          <div class="flex-1 h-100 mr-8">
            <Apy2ChartLoan/>
          </div>
        </div>
<!--        榜单-->
        <Apy2TopListMain type="loan"  class="w-101.25 pl-8  leftBorder">
          <template #item>
            <Apy2TopListLoanItem />
          </template>
        </Apy2TopListMain>
      </div>
      <div class="mt-15">
        <!--表格数据-->
        <Apy2BaseTableMain/>
      </div>
      <Apy2LoanPoolsMain class="mt-15"/>
      <div class="h-50"></div>
    </div>

  </div>
</template>
<style scoped>
.x-xian{
  border:0.5px solid rgba(3, 54, 102, 0.06);
}
.bottomBorder{
  border-bottom:1px solid rgba(3, 54, 102, 0.06);
}
.leftBorder{
  border-left:1px solid rgba(3, 54, 102, 0.06);
}
</style>
