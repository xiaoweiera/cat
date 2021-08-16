<script setup lang="ts">
import {ref, defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
const tagList=[
  {name:'全部',key:'all'},
  {name:'单币',key:'dan'},
  {name:'LP',key:'lp'}
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
  <div class="font-kdFang projectChart">
    <Apy2ProjectChartInfo/>
    <div class="mt-3 flex items-center justify-between">
      <div class="flex items-center">
        <el-select :popper-append-to-body="false" v-model="type" size="small">
          <el-option v-for="item in selectList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit ml-3 flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
          <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
          <span class="text-global-highTitle text-opacity-85 text-kd14px18px font-medium">添加矿池</span>
        </div>
      </div>
      <UiDateDay @change="changeTime"/>
    </div>
<!--    图表echarts-->
    <div>

    </div>
<!--    表格-->
    <div class="mt-8">
      <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium">所有挖矿池子</span>
     <div class="flex items-center justify-between">
       <div class="flex items-center">
         <Apy2MiningPoolsFliter class="my-3 mr-3" :list="tagList"/>
         <Apy2BaseChains/>
       </div>
       <Apy2BaseSelectData placeStr="搜索币种" />
     </div>
      <Apy2MiningTableMain />
    </div>

  </div>
</template>
<style lang="scss">
.projectChart {
  .el-input__inner {
    border: 1px solid rgba(3, 54, 102, 0.06);
    background: none;
    width: 120px;
    height: 34px;
    padding-left: 4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }

  .el-icon-arrow-up {
    @apply mt-0.5;
  }
}
</style>



