<script lang="ts" setup>
import {onMounted} from 'vue'
import {chain,rankingTag,tableTag,listTag,tokenList,projectList} from '~/store/apy2/state'
import {getMiningGroup,getTokenAndProject} from '~/logic/apy2/index'
const getGroupData=async ()=>{
  const result=await getMiningGroup(chain.value)
  rankingTag.value=result?.ranking
  tableTag.value=result?.table
  listTag.value=result?.list
}
const getData=async ()=>{
  const [tokenData,projectData]=await getTokenAndProject(chain.value)
  tokenList.value=tokenData
  projectList.value=projectData
}
onMounted(async ()=>{
  await getData()
  await getGroupData()
})
</script>
<template>
  {{rankingTag}}--
  <div class=" flex justify-center    bg-global-white  h-full font-kdFang " >
    <div class="max-w-360  px-20  relative  w-full h-full container ">
      <div class="flex items-center justify-between">
        <Apy2BaseHeader class="mt-8"/>
        <Apy2SelectContainerSelectTool pageType="mining" class="absolute -top-3  right-7" />
      </div>
      <div class="flex mt-6">
        <div class="max-w-156 w-156 flex-1  mr-8" >
          <Apy2BaseRotate />
        </div>
        <Apy2BaseNotice class="mr-8"/>
        <Apy2BasePlayType />
      </div>
      <Apy2BaseWarnTip class="mt-6"/>
      <Apy2Chains class="mt-15"/>
      <div class="x-xian mt-6"></div>
      <div class="flex w-full py-6 bottomBorder">
        <div class="flex flex-1 ">
          <div class="flex-1 h-100 mr-8">
            <Apy2ChartMining/>
          </div>
        </div>
<!--        榜单-->
        <Apy2TopListMain type="mining"  class="w-101.25 pl-8  leftBorder">
          <template #item>
            <Apy2TopListMiningItem />
          </template>
        </Apy2TopListMain>
      </div>
      <div class="mt-15">
        <!--表格数据-->
<!--        <Apy2BaseTableMain/>-->
      </div>
      <Apy2MiningPoolsMain class="mt-15"/>
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

