<script setup lang="ts">
import {ref, defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
import {selectChains} from '~/logic/apy2/config'

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
    <div class="mt-3 flex items-center justify-between">
      <div class="my-4 flex items-center justify-between w-full">
        <UiTransfer class="" title="添加借贷币种" sub-title="已选借贷币种"  :selects="selectChains" @submit="onSumbit">
          <template #content>
            <div class="px-4 rounded-kd6px w-30 h-8.5 w-fit  flex items-center hand" style="border:1px solid rgba(3, 54, 102, 0.1);">
              <IconFont class="text-global-highTitle text-opacity-85 mr-1" type="icon-add" size="16"/>
              <span class="text-global-highTitle text-opacity-85 text-kd14px18px font-medium">添加借贷币种</span>
            </div>
          </template>
          <!-- 自定义左侧列表显示内容 -->
          <template #item="scope">
            <Apy2BaseAddTokenDialogItem class="w-full"/>
          </template>
          <!-- 自定义右侧列表显示内容 -->
          <template #result="scope">
            <Apy2BaseAddTokenDialogItem class="w-full"/>
          </template>
        </UiTransfer>
        <UiDateDay @change="changeTime"/>
      </div>
    </div>
    <!--    图表echarts-->
    <Apy2ProjectChart />
    <!--    表格-->
    <div class="mt-8">
      <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium">所有借贷池子</span>
      <div class="flex items-center justify-between my-3">
        <div class="flex items-center projectChart">
          <Apy2BaseChains/>
        </div>
        <Apy2BaseSelectData placeStr="搜索币种" />
      </div>
      <Apy2ProjectTable />
    </div>

  </div>
</template>
<style scoped lang="scss">

</style>



