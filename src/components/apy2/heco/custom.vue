<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import { defineProps, reactive, ref, onMounted } from 'vue'
import { getHecoNodeTrends } from '~/logic/apy2/heco'
import { dateYMDHmFormat, uuid, debounce } from '~/utils'
import { EchartData, Position } from '~/logic/echarts/interface'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const echartKey = ref<string>(uuid())

const updateTime = ref<string>('')
const active = ref<string>('apy')

const chartData = reactive<EchartData>(new EchartData())

// @ts-ignore
const tabs = [
  { label: 'APY', key: 'apy' },
  { label: I18n.apy.heco.head.voters, key: 'votes' },
  { label: I18n.apy.heco.head.percent, key: 'percent' },
  { label: I18n.apy.heco.head.participants, key: 'voters' },
]

// 图表数据
const updateTrendsData = debounce<any>(async () => {
  const result = await getHecoNodeTrends({
    column: active.value,
    node_name: props.name
  })
  const trends = result.trends ? result.trends : new EchartData()
  chartData.legends = trends.legends
  chartData.xAxis = trends.xAxis
  chartData.series = trends.series
  // 最后更新时间
  updateTime.value = dateYMDHmFormat(result.update_time)
  echartKey.value = uuid()
})

const onChangeActive = function(value: string) {
  active.value = value
  return updateTrendsData()
}

onMounted(updateTrendsData)


</script>

<template>
  <div>
    <div class="flex justify-between items-center pb-3">
      <div class="text-global-highTitle text-opacity-65 text-sm font-medium">
        <div class="tabs">
          <template v-for="item in tabs" :key="item.key">
            <span :class="{'active': item.key === active}" @click="onChangeActive(item.key)">{{ item.label }}</span>
          </template>
        </div>
      </div>
      <div class="flex items-center text-global-highTitle text-opacity-45">
        <span class="text-xs mr-4">更新时间: {{ updateTime }}</span>
        <EchartsDownload title="下载"/>
      </div>
    </div>
    <div class="h-52.5" :key="echartKey" v-if="chartData.xAxis && chartData.xAxis.length > 0">
      <Echarts bg-color="#F8FBFD" :legend="false">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis" />

        <template v-for="(item, index) in chartData.legends" :key="index">
          <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
        </template>

        <EchartsYaxis :index="0"/>

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
