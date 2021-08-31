<script setup lang="ts">
import { ref,defineProps,onMounted,reactive,watch } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {  setInject, getInject } from '~/utils/use/state'
import { EchartData, Position, seriesType } from '~/logic/echarts/interface'
import {getMiningTop10Chart} from '~/logic/apy2/index'
import {chartTop} from '~/logic/apy2/config'
import {echartTransform} from '~/lib/common'
import {chain,tokenList} from '~/store/apy2/state'
import { chartFormatter } from '~/lib/common'
const props = defineProps({
  list: Object,
})
const token=ref(chartTop[0])
const moreToken=ref('')
const showNumber=ref(5)
const keyNumber=ref(0)
const chartData = reactive<EchartData>(new EchartData())
const getChart=async ()=>{
  const result=await getMiningTop10Chart({chain:chain.value,symbol:token.value})
  const data=echartTransform(result)
  chartData.legends = data.legends
  chartData.xAxis = data.xAxis
  chartData.series = data.series
  keyNumber.value++
}
const selectToken=(name:string)=>token.value=name
watch(token,(n)=>getChart())
watch(moreToken,(n)=>token.value=n)
onMounted(getChart())
</script>
<template>
<div class="w-full h-full font-kdFang top10Project">
  <div>
    <span  class="text-kd25px28px font-medium text-global-highTitle text-opacity-85">单币挖矿收益率 Top 10</span>
    <a href="/apy/token" target="_blank" class="text-global-highTitle text-opacity-65 ml-3 text-kd14px18px ">{{I18n.apyIndex.moreToken}} <IconFont  type="icon-right" size="12"/></a>
  </div>
  <div class="flex items-center  mt-4">
    <div class="flex items-center">
      <template v-for="item in chartTop">
        <span @click="selectToken(item)"  :class="token===item?'selectTag':'tag'" class="hand">{{item}}</span>
      </template>
    </div>
    <el-select  filterable :placeholder="I18n.apyIndex.selectCoins" :popper-append-to-body="false" v-model="moreToken"  class="ml-1"  size="small" >
      <template v-for="item in tokenList">
        <el-option v-if="chartTop.indexOf(item.name)===-1"  :label="item.name" :value="item.name">
        </el-option>
      </template>
    </el-select>
  </div>
<!--  图表-->
  <Echarts :key="keyNumber" v-if="chartData.xAxis && chartData.xAxis.length > 0">
    <!-- 提示框 trigger: 触发方式 -->
    <EchartsTooltip trigger="axis"   :formatter="chartFormatter"/>

    <template v-for="(item, index) in chartData.legends" :key="index">
      <EchartsLegend :index="index" :color="item.color" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
    </template>

    <EchartsYaxis :index="0" :position="Position.left"/>
    <EchartsYaxis :index="1" :position="Position.right"/>

    <!-- 设置X轴 -->
    <EchartsXaxis :value="chartData.xAxis"/>
    <!--数据-->
    <template v-for="(item, index) in chartData.legends" :key="index">
      <!--
        通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
        value: 数据
      -->
      <EchartsSeries :index="index"  :value="chartData.series[item.id]"/>
    </template>
  </Echarts>
</div>
</template>
<style  lang="scss">
.tag{
  @apply px-2 py-1 text-kd14px18px mr-2 font-medium text-global-highTitle text-opacity-85 whitespace-nowrap;
}
.selectTag{
  @apply mr-2 rounded-kd4px text-kd14px18px text-global-primary px-2 py-1 bg-global-primary  bg-opacity-8 font-medium whitespace-nowrap;
}
.top10Project{
  @apply  bg-global-white;
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    padding-left:4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-35 text-center h-9 flex items-center  text-kd14px18px ;
  }
  .el-icon-arrow-up{
    @apply mt-0.5;
  }
}

</style>
