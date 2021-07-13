<script setup lang="ts">
/**
 * @file echart 视图
 * @author svon.me@gmail.com
 */

import { defineProps } from 'vue'

defineProps({
  chart: {
    type: Object,
    required: true,
  }
})

</script>

<template>
  <Echarts>
    <!-- 提示框 trigger: 触发方式 -->
    <EchartsTooltip trigger="axis" />
    <!--图例-->
    <template v-for="(item, index) in chart.legend" :key="`legend-${index}`">
      <!--
        value: 图例名称
        type: 图例对应的图形类型(通过 index 与 series 数据匹配)
        show: 是否显示
      -->
      <EchartsLegend :index="index" :value="item.name" :type="item.type"/>
    </template>
    <!-- 设置Y轴 -->
    <!--
      position: Y轴位置 [left / right]
      legend: 控制某些图例(series)数据的刻度尺
    -->
    <template v-for="(item, index) in chart.yaxis" :key="`yaxis-${index}`">
      <EchartsYaxis :index="index" :position="item.position" :legend="item.legend"/>
    </template>

    <!-- 设置X轴 -->
    <EchartsXaxis :value="chart.xaxis"/>

    <!--数据-->
    <template v-for="(item, index) in chart.series" :key="index">
      <!--
        通过 index 与 legend 对应
        value: 数据
      -->
      <EchartsSeries :index="index" :value="item.data" :stack="item.stack"/>
    </template>
  </Echarts>
</template>

