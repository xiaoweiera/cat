<script lang="ts" setup>
import {onMounted} from 'vue'
import {chain,rankingTag,tableTag,listTag,tokenList,projectList} from '~/store/apy2/state'
import {getLendingGroup,getTokenList,getTokenAndProject} from '~/logic/apy2/index'
import { TabCategoryData } from '~/logic/apy2/interface'
import I18n from '~/utils/i18n/index'
const getGroupData=async ()=>{
  const result=await getLendingGroup(chain.value)
  rankingTag.value=result?.ranking
  tableTag.value=result?.table
  listTag.value=result?.list
}
const getData=async ()=>{
  const [tokenData,projectData]=await getTokenAndProject(chain.value)
  tokenList.value=tokenData
  projectList.value=projectData
} 
// const getTokens=async ()=>tokenList.value=await getTokenList()
onMounted(async ()=>{
  await getData()
  await getGroupData()
})
</script>
<template>
  <div class=" flex flex-col items-center justify-center md:mb-16 mb-9   bg-global-white  h-full font-kdFang " >
    <div class="max-w-360 px-4  md:px-20  relative  w-full h-full container ">
      <div class="mt-4.25 md:mt-10 flex justify-between  items-center">
        <Apy2BaseHeader :title="I18n.apyIndex.loanTitle" class=" flex flex-col flex-wrap justify-center" />
        <Apy2BasePlayType type='lend' class="xshidden" />
      </div>
      <Apy2Chains class="md:mt-10 mt-9"/>
      <Apy2TopContainer :header="true"  type="lend"/>
            <Apy2BaseNotice class="md:mt-12 mt-9"/>
      <div class="md:mt-12 mt-9">
        <!--表格数据-->
        <Apy2BaseTableMain :type="TabCategoryData.lend"/>
      </div>
      <div class="md:mt-12 mt-9">
        <Apy2LoanPoolsMain/>
      </div>
      <Apy2BaseWaringTxt class="md:mt-12 mt-9  flex justify-center"/>
    </div>

  </div>









<!--  <div class=" flex flex-col items-center justify-center mb-16   bg-global-white  h-full font-kdFang " >-->
<!--    <div class="max-w-360  px-20  relative  w-full h-full container ">-->
<!--      <div class="mt-12 flex justify-between items-center">-->
<!--        <Apy2BaseHeader :title="I18n.apyIndex.loanTitle" class=" flex flex-col flex-wrap justify-center" />-->
<!--        <div>-->
<!--          <Apy2BasePlayType />-->
<!--        </div>-->
<!--      </div>-->
<!--      <Apy2Chains class="mt-12"/>-->

<!--      <div class="flex w-full    mt-4 pb-6 bottomBorder">-->
<!--        <div class="flex flex-1  ">-->
<!--          <div class="flex-1  mr-8">-->
<!--            <Apy2ChartLoan class="w-full h-85.5 "/>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash;        榜单&ndash;&gt;-->
<!--        <Apy2TopListMain type="lend"  class="w-101.25   pt-3 pl-8  leftBorder    ">-->
<!--          <template #item>-->
<!--            <Apy2TopListLoanItem  />-->
<!--          </template>-->
<!--        </Apy2TopListMain>-->
<!--      </div>-->



<!--      <Apy2BaseNotice class="mt-12"/>-->
<!--      <div class="mt-12">-->
<!--        &lt;!&ndash;表格数据&ndash;&gt;-->
<!--        <Apy2BaseTableMain :type="TabCategoryData.lend"/>-->
<!--      </div>-->
<!--      <div class="mt-12">-->
<!--        <Apy2LoanPoolsMain/>-->
<!--      </div>-->
<!--    </div>-->
<!--    <Apy2BaseWaringTxt class="mt-12"/>-->
<!--  </div>-->
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
.topListShadow{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>
