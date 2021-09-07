<script setup lang="ts">
import { Position } from '~/logic/echarts/interface'
import { chartFormatterAll } from '~/lib/common'
import {defineProps, watch, ref} from 'vue'
import { uuid } from '~/utils'
const props = defineProps({
  chartData:Object,
  loading:Boolean
})
const chartKey = ref<string>(uuid())

watch(props, () => {
  chartKey.value = uuid()
})

</script>
<template>
    <div  class="w-full h-full  relative">
<!--      custom-class="w-full h-45 md:h-77.5 "-->
      <Echarts  v-if="chartData.xAxis && chartData.xAxis.length > 0" :legend="false" :key="chartKey">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis"   :formatter="chartFormatterAll"/>

        <template v-for="(item, index) in chartData.legends" :key="index">
          <EchartsLegend :index="index" :color="item.color" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
        </template>

        <EchartsYaxis :index="0" :position="Position.left" :unit="chartData.yAxis.left"/>
        <EchartsYaxis :index="1" :position="Position.right" />

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
      <UiLoading v-if="loading"/>
    </div>

</template>
