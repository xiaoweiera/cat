<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import dataEventName, { getDateValue } from '~/components/ui/date/eventname'
import { getPoolDiff } from '~/logic/apy2/table'
import { watchState } from '~/utils/use/state'
// @ts-ignore
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: () => 'loan',
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  },
  symbol: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})

const echartData = reactive<EchartData>(new EchartData())

const upData = async function(date: any) {
  const times = getDateValue(date)
  console.log('times : ', times)
  const query = {
    ...times,
    type: props.type,
    symbol: props.symbol
  }
  const result = await getPoolDiff(query)
  if (result) {
    echartData.key = result.key
    echartData.legends = result.legends
    echartData.xAxis = result.xAxis
    echartData.series = result.series
  }
}

watchState(dataEventName.value, upData)
</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0">
      <div class="flex justify-between items-center">
        <div>
          <span>{{ title }}</span>
          <span>更新时间：1分钟前</span>
        </div>
        <div class="flex items-center">
          <slot></slot>
          <EchartsDownload class="ml-3"/>
        </div>
      </div>
    </el-header>
    <el-main class="p-0">
      <template v-if="echartData.xAxis && echartData.xAxis.length > 0">
        <Echarts :key="echartData.key">
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
      </template>
    </el-main>
  </el-container>
</template>


