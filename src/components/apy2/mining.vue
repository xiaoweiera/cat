<script lang="ts" setup>
import {onMounted} from 'vue'
import {chain,rankingTag,tableTag,listTag,tokenList,projectList} from '~/store/apy2/state'
import {getMiningGroup,getTokenAndProject} from '~/logic/apy2/index'
import I18n from '~/utils/i18n/index'
import { TabCategoryData } from '~/logic/apy2/interface'

const getGroupData=async ()=>{
  const result=await getMiningGroup(chain.value)
  rankingTag.value=result?.ranking
  console.log(rankingTag.value)
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
  <div class=" flex flex-col items-center justify-center md:mb-16 mb-9   bg-global-white  h-full font-kdFang " >
    <div class="max-w-360 px-4  md:px-20  relative  w-full h-full container ">
      <div class="mt-4.25 md:mt-12 flex justify-between  items-center">
        <Apy2BaseHeader :title="I18n.apyIndex.miningTitle" class=" flex flex-col flex-wrap justify-center" />
          <Apy2BasePlayType class="xshidden" />
      </div>
      <Apy2Chains class="md:mt-12 mt-9"/>
<!--      <div class="flex items-center md:mt-6 mt-3 md:justify-between ">-->
<!--        <span  class="text-kd18px24px md:text-kd20px24px md:mr-3 mr-1.5 font-medium text-global-highTitle text-opacity-85" style="font-size:20px !important;">{{I18n.apyIndex.miningChartTitle}} Top 5</span>-->
<!--        <a href="/apy/token" target="_blank" class="text-global-highTitle text-opacity-65 flex items-center  text-kd12px16px md:text-kd14px18px ">{{I18n.apyIndex.moreToken}} <IconFont  type="icon-right" size="12"/></a>-->
<!--      </div>-->
      <Apy2TopContainer :header="true"  type="mining"/>
<!--      <div class="flex w-full md:flex-row flex-col   mt-4 md:pb-6   md:border-b-1 border-global-highTitle border-opacity-6">-->
<!--        <div class="flex flex-1 md:order-0  mt-4 md:mt-0 order-1 ">-->
<!--          <div class="flex-1  md:mr-8">-->
<!--            <Apy2ChartMining class="w-full"/>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash;        榜单&ndash;&gt;-->
<!--        <Apy2TopListMain type="mining"  class="md:w-101.25 w-full  md:order-1  order-0 pt-3 md:pl-8 border-b-1 md:border-b-0  md:border-l-1 border-global-highTitle border-opacity-6 ">-->
<!--          <template #item>-->
<!--            <Apy2TopListMiningItem  />-->
<!--          </template>-->
<!--        </Apy2TopListMain>-->
<!--      </div>-->
<!--      <Apy2BaseNotice class="mt-12"/>-->
      <div class="md:mt-12 mt-9">
        <!--表格数据-->
        <Apy2BaseTableMain :type="TabCategoryData.mining"/>
      </div>
      <div class="md:mt-12 mt-9">
        <Apy2MiningPoolsMain/>
      </div>
      <Apy2BaseWaringTxt class="md:mt-12 mt-9  flex justify-center"/>
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
.topListShadow{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>

