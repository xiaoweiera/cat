<script setup lang="ts">
import { flatten } from 'ramda'
import { reactive, ref, defineProps, toRaw } from 'vue'
import { getEchartData } from '~/logic/apy2/token'
import { watchState } from '~/utils/use/state'
import dataEventName, { getDateValue } from '~/components/ui/date/eventname'
import { uuid } from '~/utils'

// @ts-ignore
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'
import Props from './props'
import safeGet from '@fengqiaogang/safe-get'

const loading = ref<boolean>(false)
const echartKey = ref<string>('')
const echartData = reactive<EchartData>(new EchartData())

// 定义 props
const props = defineProps(Props())

const updateData = async function(date: any, pools: number[]) {
  loading.value = true
  const { from_ts = 0, to_ts = 0 } = date
  const query = {
    pools: pools.join(','),
    from_ts: Math.floor(from_ts / 1000),
    to_ts: Math.floor(to_ts / 1000),
    ...props
  }
  const result = await getEchartData(query)
  echartKey.value = uuid(JSON.stringify(query))
  if (result) {
    echartData.legends = result.legends
    echartData.xAxis = result.xAxis
    echartData.series = result.series
  }
  loading.value = false
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
  <Spin :loading="loading">
    <div v-if="echartData.xAxis && echartData.xAxis.length > 0">
      <Echarts :key="echartKey" custom-class="h-45 md:h-85" :legend="LegendDirection.custom">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis" />

        <template v-for="(item, index) in echartData.legends" :key="index">
          <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
        </template>

        <EchartsYaxis :index="0" :position="Position.left"/>
        <EchartsYaxis :index="1" :position="Position.right"/>

        <!-- 设置X轴 -->
        <EchartsXaxis :value="echartData.xAxis"/>


        <!--数据-->
        <template v-for="(item, index) in echartData.legends" :key="index">
          <!--
            通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
            value: 数据
          -->
          <EchartsSeries :index="index" :color="item.color" :value="echartData.series[item.id]"/>
        </template>
      </Echarts>
    </div>
  </Spin>
</template>
