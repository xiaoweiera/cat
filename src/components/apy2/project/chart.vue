<script setup lang="ts">
// import { echartData } from '~/logic/apy2/token'
// // @ts-ignore
// import { Position, LegendDirection, colors, seriesType } from '~/logic/echarts/interface'
// const data = echartData()
</script>
<template>
  <div>
<!--    <div>-->
<!--      <Echarts custom-class="h-45 md:h-85" :legend="LegendDirection.custom">-->
<!--        &lt;!&ndash; 提示框 trigger: 触发方式 &ndash;&gt;-->
<!--        <EchartsTooltip trigger="axis" />-->
<!--        <template v-for="(item, index) in data.legends" :key="index">-->
<!--          <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>-->
<!--        </template>-->
<!--        <EchartsYaxis :index="0" :position="Position.left"/>-->
<!--        <EchartsYaxis :index="1" :position="Position.right"/>-->
<!--        &lt;!&ndash; 设置X轴 &ndash;&gt;-->
<!--        <EchartsXaxis :value="data.xAxis"/>-->
<!--        &lt;!&ndash;数据&ndash;&gt;-->
<!--        <template v-for="(item, index) in data.legends" :key="index">-->
<!--          &lt;!&ndash; 通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)value: 数据 &ndash;&gt;-->
<!--          <EchartsSeries :index="index" :color="item.color" :value="data.series[item.id]"/>-->
<!--        </template>-->
<!--      </Echarts>-->
<!--    </div>-->
  </div>
  <div class="mt-8">
  </div>
</template>
