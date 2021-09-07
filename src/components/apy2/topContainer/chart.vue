<script setup lang="ts">
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'
import { chartFormatterAll } from '~/lib/common'
import {defineProps,onMounted} from 'vue'
const props=defineProps({
  chartData:Object,
})
</script>
<template>
    <div  class="w-full h-full  relative">
<!--      custom-class="w-full h-45 md:h-77.5 "-->
      <Echarts  v-if="chartData.xAxis && chartData.xAxis.length > 0"  :legend="false">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis"   :formatter="chartFormatterAll"/>

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
      <div v-else class="flex items-center justify-center   w-full   h-full justify-center">
        <img class="w-50   z-2 mt-4 md:mt-0 mr-4 mb-10" src="https://res.ikingdata.com/nav/loadingState.gif" alt="">
      </div>
    </div>

</template>
