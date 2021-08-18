<script setup lang="ts">
import {ref, defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
import {selectChains} from '~/logic/apy2/config'
const tagList=[
  {name:'全部',key:'all'},
  {name:'单币',key:'dan'},
  {name:'LP',key:'lp'}
]
const radios = [
  { label: '单币', value: 1 },
  { label: 'LP', value: 2 }
]
const type = ref('TVL')
const selectList = ref(['TVL'])
const [selectTxt,]=useProvide('selectTxt','')
const [chain,]=useProvide('chain','all')
const [filterType,]=useProvide('filterType','all')
const changeTime = (time: any) => {
  console.log(time)
}
</script>
<template>
  <div class="font-kdFang">
    <Apy2ProjectChartInfo/>
    <div class="mt-3 flex items-center justify-between ">
      <div class="flex items-center">
        <el-select class="projectMining" :popper-append-to-body="false" v-model="type" size="small">
          <el-option v-for="item in selectList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <UiTransfer title="添加矿池" sub-title="已选矿池"  :radios="radios" :selects="selectChains" @submit="onSumbit">
          <template #content>
            <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit ml-3 flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
              <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
              <span class="text-global-highTitle text-opacity-85 text-kd14px18px font-medium">添加矿池</span>
            </div>
          </template>
          <!-- 自定义左侧列表显示内容 -->
          <template #item="scope">
            <Apy2BaseAddPoolDialogItem class="w-full"/>
          </template>
          <!-- 自定义右侧列表显示内容 -->
          <template #result="scope">
            <Apy2BaseAddPoolDialogItem class="w-full"/>
          </template>
        </UiTransfer>
      </div>
      <UiDateDay @change="changeTime"/>
    </div>
<!--    图表echarts-->
    <Apy2ProjectChart />
<!--    表格-->
    <div class="mt-8">
      <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium">所有挖矿池子</span>
     <div class="flex items-center justify-between">
       <div class="flex items-center projectChart">
         <Apy2MiningPoolsFliter class="my-3 mr-3" :list="tagList"/>
         <Apy2BaseChains/>
       </div>
       <Apy2BaseSelectData placeStr="搜索币种" />
     </div>
      <Apy2MiningTableMain />
    </div>

  </div>
</template>
<style  lang="scss">
.projectMining{
 .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    width: 120px !important;
    height: 34px !important;
    padding-left:4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }
}

</style>



