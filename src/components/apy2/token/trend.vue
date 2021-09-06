<script setup lang="ts">
import { reactive, ref, defineProps, toRaw } from 'vue'
import { getEchartData } from '~/logic/apy2/token'
import { watchState } from '~/utils/use/state'
import dataEventName, { getDateValue } from '~/components/ui/date/eventname'
import { uuid } from '~/utils'
import { chartFormatter } from '~/lib/common'
import { Position, LegendDirection, EchartData } from '~/logic/echarts/interface'

import Props from './props'

const loading = ref<boolean>(false)
const echartKey = ref<string>('')
const echartData = reactive<EchartData>(new EchartData())

const props = defineProps(Props())
const param=ref()
const updateData = async function(date: any, pools: number[]) {
  loading.value = true
  const query = {
    ...date,
    ...props,
    pools: pools.join(','),
  }
  param.value=query
  echartKey.value = uuid(JSON.stringify(query))
  // const result = await getEchartData(query)
  // echartKey.value = uuid(JSON.stringify(query))
  // if (result) {
  //   echartData.legends = result.legends
  //   echartData.xAxis = result.xAxis
  //   echartData.series = result.series
  //   echartData.yAxis = result.yAxis
  // }
  // loading.value = false
}

watchState([dataEventName.value, 'poolList'], function(result: any[]) {
  const date = getDateValue(result[0])
  let pools = []
  if (result[1]) {
    const [ list = [] ] = toRaw(result[1])
    pools.push(...list)
  }
  updateData(date, pools)
})


</script>

<template>
        <Apy2TopContainer class="mt-4" v-if="props.type==='mining'" :symbol="props.symbol" :key="echartKey" :header="false" :paramData="param" :token="true"  type="mining"/>
        <Apy2TopContainer class="mt-4" v-else :key="echartKey" :symbol="props.symbol"  :header="false" :paramData="param" :token="true"  type="lend"/>
<!--  <Spin :loading="loading">-->
<!--    <div v-if="echartData.xAxis && echartData.xAxis.length > 0">-->
<!--      <Echarts :key="echartKey" custom-class="h-45 md:h-85" :legend="LegendDirection.custom">-->
<!--        &lt;!&ndash; 提示框 trigger: 触发方式 &ndash;&gt;-->
<!--&lt;!&ndash;        <EchartsTooltip trigger="axis" :formatter="chartFormatter"/>&ndash;&gt;-->
<!--  <Spin :loading="loading">-->
<!--    <div v-if="echartData.xAxis && echartData.xAxis.length > 0">-->
<!--      <Echarts :key="echartKey" custom-class="h-45 md:h-85" :legend="false">-->
<!--        &lt;!&ndash; 提示框 trigger: 触发方式 &ndash;&gt;-->
<!--        <EchartsTooltip trigger="axis" :formatter="chartFormatter"/>-->

<!--        <template v-for="(item, index) in echartData.legends" :key="index">-->
<!--          <EchartsLegend :index="index" :value="item.name" :color="item.color" :type="item.type" :position="item.kline ? Position.right : Position.left"/>-->
<!--        </template>-->

<!--        <EchartsYaxis :index="0" :position="Position.left" :unit="echartData.yAxis.left"/>-->
<!--        <EchartsYaxis :index="1" :position="Position.right" :unit="echartData.yAxis.right"/>-->

<!--        &lt;!&ndash; 设置X轴 &ndash;&gt;-->
<!--        <EchartsXaxis :value="echartData.xAxis"/>-->


<!--        &lt;!&ndash;数据&ndash;&gt;-->
<!--        <template v-for="(item, index) in echartData.legends" :key="index">-->
<!--          &lt;!&ndash;-->
<!--            通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)-->
<!--            value: 数据-->
<!--          &ndash;&gt;-->
<!--          <EchartsSeries :index="index" :color="item.color" :value="echartData.series[item.id]"/>-->
<!--        </template>-->
<!--      </Echarts>-->
<!--    </div>-->
<!--  </Spin>-->
</template>
