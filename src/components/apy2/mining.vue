<script lang="ts" setup>
import {onMounted} from 'vue'
import {chain,rankingTag,tableTag,listTag,tokenList,projectList} from '~/store/apy2/state'
import {getMiningGroup,getTokenAndProject} from '~/logic/apy2/index'
import I18n from '~/utils/i18n/index'
import { TabCategoryData } from '~/logic/apy2/interface'

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
<!--  <Apy2Calculator class="mt-20 mb-10 ml-10"/>-->
  <div class=" flex flex-col items-center justify-center mb-10   bg-global-white  h-full font-kdFang " >
    <div class="max-w-360  px-20  relative  w-full h-full container ">
      <div class="mt-12 flex justify-between  items-center">
        <Apy2BaseHeader :title="I18n.apyIndex.miningTitle" class=" flex flex-col flex-wrap justify-center" />
        <div>
          <Apy2BasePlayType />
        </div>
      </div>
      <Apy2Chains class="mt-12"/>
      <div class="flex w-full h-120   mt-4 pb-6 bottomBorder ">
        <div class="flex flex-1  ">
          <div class="flex-1 h-100 mr-8">
            <Apy2ChartMining class="w-full"/>
          </div>
        </div>
        <!--        榜单-->
        <Apy2TopListMain type="mining"  class="w-101.25  pt-3 px-3 topListShadow   ">
          <template #item>
            <Apy2TopListMiningItem  />
          </template>
        </Apy2TopListMain>
      </div>
      <Apy2BaseNotice class="mt-12"/>
      <div class="mt-12">
        <!--表格数据-->
        <Apy2BaseTableMain :type="TabCategoryData.mining"/>
      </div>
      <div class="mt-12">
        <Apy2MiningPoolsMain/>
      </div>
    </div>
    <Apy2BaseWaringTxt class="mt-12"/>
  </div>
</template>
<style scoped>
.x-xian{
  border:0.5px solid rgba(3, 54, 102, 0.06);
}
.bottomBorder{
  border-bottom:1px solid rgba(3, 54, 102, 0.06);
}
.topListShadow{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>

