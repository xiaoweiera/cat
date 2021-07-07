<script setup lang="ts">
// @ts-ignore
import { toNumber, map, forEach, compact, dateDiff } from '~/utils/index'
import bignumber from 'bignumber.js'
import { reactive, toRaw, defineProps, onMounted } from 'vue'
import { getChartDetail, getChartTrends } from '~/logic/topic/chart'
import safeGet from '@fengqiaogang/safe-get'
import { convertDate } from '~/logic/echarts/series'

export interface ChartDetail {
  default_chart?: string // 图形类型
  interval?: number // 更新时间频率
  last?: number // 最后更新时间（秒）
  relation_unit?: string // 价格单位
  value?: number // 涨浮数(不需要计算百分比)
  change?: number // 涨浮（需要计算百分比）
  width?: number
  height?: number
}
const detail = reactive<ChartDetail>({})
const chart = reactive<any>({
  yaxis: [],
  xaxis: [],
  legend: [],
  series: []
})

const props = defineProps({
  /*
    图表宽度: width
    图表高度: height
    图表名称: name
    图表描述: desc
    是否关注: followed
    图表ID: chartId
    数据ID集合: seriesIds
  */
  option: {
    type: Object,
    required: true,
  }
})

const getData = async function() {
  const option = props.option
  // @ts-ignore
  const ids = [].concat(toRaw(option.seriesIds))
  // @ts-ignore
  const [ data, trends ] = await Promise.all([
    getChartDetail(option.multiple, option.chartId),
    getChartTrends(option.multiple, ids)
  ])

  forEach(function(value: any, key: string) {
    // @ts-ignore
    detail[key] = value
  }, data)

  const yaxis: any[] = []
  const type = safeGet<string>(trends, 'default_chart') || 'line'
  // @ts-ignore
  const legend: any[] = map(function(item: any, index: number) {
    yaxis.push({
      position: index === 0 ? 'left' : 'right',
      legend: [item.title]
    })
    return {
      type: type,
      value: item.title
    }
  }, safeGet<any[]>(trends, 'legend'))

  const series = safeGet(trends, 'series')
  if (series) {
    const option = convertDate(series)
    chart.series = option.series
    chart.xaxis = option.xAxis
  }

  chart.yaxis = yaxis
  chart.legend = legend
}


// @ts-ignore
const convertNumber = function(value: number | string, zoom: 1) {
  const number = new bignumber(value)
  const data = number.multipliedBy(zoom)
  return toNumber(data as any)
}

onMounted(getData)


</script>

<template>
  <div class="text-kdFang">
    <div class="flex justify-between">
      <h4 class="font-bold text-global-highTitle">{{ option.name }}</h4>
      <div class="text-global-time text-xs">
        <span v-if="detail.last">
          <span>更新时间:</span>
          <span class="ml-1">{{ dateDiff(detail.last) }}前</span>
        </span>
        <div class="ml-3 inline-block">
          <el-button type="primary" round size="small">
            <IconFont type="icon-plus" class="text-white"></IconFont>
            <span class="ml-1">关注</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-1.5">
      <span class="text-global-numRed inline-block">
        <span class="text-3xl mr-2" v-if="detail.value">{{ convertNumber(detail.value) }}%</span>
        <span class="text-sm" v-if="detail.change">{{ convertNumber(detail.change, 100) }}%</span>
      </span>
      <span class="cursor-pointer">
        <IconFont type="icon-zoom" class="text-white"></IconFont>
      </span>
    </div>
    <div :style="{ 'height': `${option.height}px` }">
      <Echarts v-if="chart.legend.length > 0">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis" />
        <!--图例-->
        <template v-for="(item, index) in chart.legend" :key="`legend-${index}`">
          <!--
            value: 图例名称
            type: 图例对应的图形类型(通过 index 与 series 数据匹配)
            show: 是否显示
          -->
          <EchartsLegend :index="index" :value="item.value" :type="item.type"/>
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
        <template v-for="(value, index) in chart.series" :key="index">
          <!--
            通过 index 与 legend 对应
            value: 数据
          -->
          <EchartsSeries :index="index" :value="value"/>
        </template>
      </Echarts>
    </div>
  </div>
</template>

<style scoped>

</style>
