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
const type = ref('TVL')
const selectList = ref(['TVL'])
const chartTypeList=ref([
  {name:'日活数量',key:'dayUser'}
])
const chartType=ref('dayUser')
const [selectTxt,]=useProvide('selectTxt','')
const [chain,]=useProvide('chain','all')
const [filterType,]=useProvide('filterType','all')
const changeTime = (time: any) => {
  console.log(time)
}
</script>
<template>
  <div class="font-kdFang dataLook">
    <Apy2ProjectChartInfo title="项目数据总览"/>
    <div class="mt-3 flex items-center justify-between">
      <div class="flex items-center">
        <el-select class="mr-3" :popper-append-to-body="false" v-model="type" size="small">
          <el-option v-for="item in selectList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

        <el-select :popper-append-to-body="false" v-model="chartType" size="small">
          <el-option v-for="item in chartTypeList" :key="item.key" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </div>
      <UiDateDay @change="changeTime"/>
    </div>
    <div class="flex items-center my-3">
      <div class="righBorder pr-12">
        <div class="dataTxt pr-12 ">TVL</div>
        <div class="dataNumber">$212124.11</div>
      </div>
      <div class="righBorder px-12" >
        <div class="dataTxt">TVL</div>
        <div class="dataNumber">$212124.11</div>
      </div>
      <div class="pl-12">
        <div class="dataTxt">TVL</div>
        <div class="dataNumber">$212124.11</div>
      </div>
    </div>
    <!--    图表echarts-->
    <Apy2ProjectChart />
  </div>
</template>
<style  lang="scss">
.dataLook{
  @apply  bg-global-white;
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    width: 120px !important;
    height: 34px !important;
    padding-left:4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }
  .righBorder{
    border-right: 1px solid rgba(3, 54, 102, 0.1);
  }
  .dataTxt{
    @apply text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang;
  }
  .dataNumber{
    @apply text-kd26px26px text-global-highTitle text-opacity-85 font-kdExp mt-0.5;
  }
}

</style>



