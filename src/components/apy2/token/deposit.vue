<script setup lang="ts">
import { echartData } from '~/logic/apy2/token'
// @ts-ignore
import { Position, LegendDirection, colors, seriesType } from '~/logic/echarts/interface'
const data = echartData()
</script>

<template>
  <div class="h-85">
    <Echarts :legend="LegendDirection.custom">
      <!-- 提示框 trigger: 触发方式 -->
      <EchartsTooltip trigger="axis" />

      <template v-for="(item, index) in data.legends" :key="index">
        <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
      </template>

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
        <EchartsSeries :index="index" :color="item.color" :value="data.series[item.id]"/>
      </template>
    </Echarts>
  </div>
  <div class="mt-8">
    <h3 class="text-xl text-global-highTitle text-opacity-85">借贷 BTC 的所有最佳路径</h3>
  </div>
</template>

