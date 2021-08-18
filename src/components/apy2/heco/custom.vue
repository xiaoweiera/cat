<script setup lang="ts">
import { defineProps } from 'vue'
import { colors } from '~/logic/echarts/interface'
import dayjs from 'dayjs'
import { dateYMDFormat } from '~/utils'

defineProps({
  id: {
    type: [String, Number],
  }
})

const randomSeriesValue = function() {
  const array: Array<any> = []
  for(let i = 1; i <= 90; i++) {
    const value = parseInt(Math.random() * 100 as any)
    array.push({ value: value + i })
  }
  return array
}

const xAxis: string[] = []
const today = dayjs()
for(let i = 90; i > 0; i--) {
  const date = today.subtract(i, 'd')
  const value = dateYMDFormat(date)
  xAxis.push(value)
}
// @ts-ignore
const chartData = {
  xAxis,
  legend: {
    name: 'APY',
    unit: '',
    type: 'line',
    color: colors[0]
  },
  series: randomSeriesValue()
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center pb-3">
      <div class="text-global-highTitle text-opacity-65 text-sm font-medium">
        <div class="tabs">
          <span class="active">APY</span>
          <span>得票数</span>
          <span>得票占比</span>
          <span>参与人数</span>
        </div>
      </div>
      <div class="flex items-center text-global-highTitle text-opacity-45">
        <span class="text-xs mr-4">更新时间: 1分钟前</span>
        <EchartsDownload title="下载"/>
      </div>
    </div>
    <div class="h-52.5">
      <Echarts bg-color="#F8FBFD">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis" />

        <EchartsLegend :index="0" :value="chartData.legend.name" :type="chartData.legend.type"/>

        <EchartsYaxis :index="0"/>

        <!-- 设置X轴 -->
        <EchartsXaxis :value="chartData.xAxis"/>

        <EchartsSeries :index="0" :color="chartData.legend.color" :value="chartData.series"/>
      </Echarts>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  @apply flex items-center;
  span {
    @apply mr-3.5 px-2 py-1 inline-block rounded-md cursor-pointer;
    &:last-child {
      @apply mr-0;
    }

    &.active {
      @apply text-global-primary text-sm;
      @apply bg-global-primary bg-opacity-8;
      @apply border-global-primary border-opacity-8;
    }
  }
}
</style>
