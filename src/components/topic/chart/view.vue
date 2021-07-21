<script setup lang="ts">
/**
 * @file echart 视图
 * @author svon.me@gmail.com
 */

import { defineProps, computed } from 'vue'
// @ts-ignore
import { Position, colors } from '~/logic/echarts/interface'
import { toBoolean } from '~/utils'

/*
interface data {
  detail: ChartDetail
  legends: Array<any>
  xAxis: Array<any>
  yAxis: Array<any>
}
*/

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
// @ts-ignore
const stackStatus = computed(function() {
  return toBoolean(props.data?.detail?.stack)
})
// @ts-ignore
const logStatus = computed(function() {
  return toBoolean(props.data?.detail?.log)
})

const getAreaStatus = computed(function() {
  if (props.data?.detail) {
    const stack = toBoolean(props.data?.detail?.stack)
    if (stack) {
      return true
    }
    const multiple = toBoolean(props.data?.detail?.multiple)
    if (!multiple) {
      return true
    }
  }
  return false
})

</script>

<template>
  <Echarts :stack="stackStatus" :log="logStatus">
    <!-- 提示框 trigger: 触发方式 -->
    <EchartsTooltip trigger="axis" />
    <!--图例-->
    <template v-for="(item, index) in data.legends" :key="`legend-${index}`">
      <!--
        value: 图例名称
        type: 图例对应的图形类型(通过 index 与 series 数据匹配)
        show: 是否显示
        position: 通过该字段控制 Series 中对应的数据以那个 Y 轴为纬度展示
      -->
      <EchartsLegend :index="index" :value="item.name" :color="colors[index]" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
    </template>
    <!-- 设置Y轴 -->
    <!--
      position: Y轴位置 [left / right]
      legend: 控制某些图例(series)数据的刻度尺
    -->
    <EchartsYaxis :index="0" :position="Position.left"/>
    <EchartsYaxis :index="1" :position="Position.right"/>

    <!-- 设置X轴 -->
    <EchartsXaxis :value="data.xAxis"/>

    <!--数据-->
    <template v-for="(item, index) in data.legends" :key="index">
      <!--
        通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
        value: 数据
      -->
      <EchartsSeries :index="index" :value="item.data" :color="colors[index]" :area="getAreaStatus"/>
    </template>
  </Echarts>
</template>

