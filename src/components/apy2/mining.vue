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
  <div class=" flex flex-col items-center justify-center md:mb-16 mb-9   bg-global-white  h-full font-kdFang " >
    <div class="max-w-360 px-4  md:px-20  relative  w-full h-full container ">
      <div class="mt-4.25 md:mt-10 flex justify-between  items-center">
        <Apy2BaseHeader :title="I18n.apyIndex.miningTitle" class=" flex flex-col flex-wrap justify-center" />
          <Apy2BasePlayType type='mining' class="xshidden" />
      </div>
      <Apy2Chains class="md:mt-10 mt-9"/>
      <Apy2TopContainer :header="true"  type="mining"/>
      <Apy2BaseNotice class="md:mt-12 mt-9"/>
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

