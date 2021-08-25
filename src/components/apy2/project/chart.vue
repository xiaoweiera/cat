<script setup lang="ts">
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'
import {defineProps} from 'vue'
const props=defineProps({
  chartData:Object,
  loading:Boolean,
  custom:Boolean
})
</script>
<template>
  <Spin :loading="loading">
  <div class="w-full  h-full relative">
    <Echarts  v-if="chartData.xAxis && chartData.xAxis.length > 0" custom-class="w-full h-45 md:h-77.5 "  :legend="props.custom?LegendDirection.custom:LegendDirection.bottom">
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
  <div class="mt-8">
  </div>
  </Spin>
</template>
