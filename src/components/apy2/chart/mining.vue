<script setup lang="ts">
import { ref,defineProps,onMounted,reactive } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {  setInject, getInject } from '~/utils/use/state'
import { EchartData, Position, seriesType } from '~/logic/echarts/interface'
import {getTop10Chart} from '~/logic/apy2/index'
import {echartTransform} from '~/lib/common'
const props = defineProps({
  list: Object,
})
const chartData = reactive<EchartData>(new EchartData())
const getChart=async ()=>{
  const result=await getTop10Chart()
  const data=echartTransform(result)
  chartData.legends = data.legends
  chartData.xAxis = data.xAxis
  chartData.series = data.series
  console.log(chartData,'数据')
}

onMounted(getChart())

</script>
<template>
<div class="w-full h-full">
  <Echarts v-if="chartData.xAxis && chartData.xAxis.length > 0">
    <!-- 提示框 trigger: 触发方式 -->
    <EchartsTooltip trigger="axis" />

    <template v-for="(item, index) in chartData.legends" :key="index">
      <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
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
      <EchartsSeries :index="index" :color="item.color" :value="chartData.series[item.id]"/>
    </template>
  </Echarts>
</div>
</template>
<style scoped lang="scss">
.tag{
  @apply text-kd14px18px text-global-highTitle text-opacity-85 whitespace-nowrap;
}
.selectTag{
  @apply rounded-kd4px text-kd14px18px text-global-white bg-global-primary font-medium whitespace-nowrap;
}
</style>
