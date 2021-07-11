<script setup lang="ts">
import { toNumber, map, dateDiff, max, forEach, toBoolean, uuid } from '~/utils/index'
import bignumber from 'bignumber.js'
import { reactive, toRaw, defineProps, onMounted, computed, ref } from 'vue'
import { getChartTrends } from '~/logic/topic/chart'
import { convertDate } from '~/logic/echarts/series'
import safeGet from '@fengqiaogang/safe-get'

const echartKey = ref<string>(uuid)

interface ChartDetail {
  default_chart?: string // 图形类型
  interval?: number // 更新时间频率
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
  const legend = toRaw(option.legends)
  // @ts-ignore
  const ids = [].concat(toRaw(option.seriesIds))
  const result = await getChartTrends(option.multiple, ids)
  if (result?.series) {
    const { series, xAxis, right } = convertDate(result.series, result.detail, option.rightYAxis)
    chart.xaxis = xAxis
    const array: any[] = []
    // 多图
    if (option.multiple) {
      const map = new Map<any, boolean>()
      forEach(function(item: any) {
        const id = safeGet<number>(item, 'id')
        if (!map.has(id)) {
          array.push({
            data: series[id],
            stack: option.stack,
          })
          map.set(id, true)
        }
      }, legend)
    } else {
      for (let i = 0, len = legend.length - 1; i < len; i++) {
        const id = safeGet<number>(legend[i], 'id')
        array.push({
          data: series[id],
          stack: option.stack,
        })
      }
    }
    // 添加价格线
    if (right && right.length > 0) {
      array.push({
        data: right
      })
    }
    chart.series = array
  }
  if (result?.detail) {
    forEach(function(value: any, key: string) {
      // @ts-ignore
      detail[key] = value
    }, result.detail)
  }

  chart.legend = legend
  // 根据图例数据生成 Y 轴数据
  if (option.multiple) {
    chart.yaxis = [{}]
    if (option.rightYAxis) {
      forEach(function(item: any) {
        if (item.position === 'right') {
          chart.yaxis.push({
            legend: [item.name],
            position: item.position
          })
        }
      }, legend)
    }
  } else {
    chart.yaxis = map(function(item: any){
      return {
        legend: [item.name],
        position: item.position ? item.position : 'left', // 默认左刻度
      }
    }, chart.legend)
  }
}

// 最后更新时间
// @ts-ignore
const updateLast = computed<number | undefined>(function() {
  const xaxis = toRaw(chart.xaxis)
  if (xaxis.length > 0) {
    const list = map((item: any) => item.date, xaxis)
    const value = max(list)
    if (value) {
      return dateDiff(value)
    }
  }
  return ''
})


// @ts-ignore
const convertNumber = function(value: number | string, zoom: 1) {
  const number = new bignumber(value)
  const data = number.multipliedBy(zoom)
  return toNumber(data as any)
}

const followed = ref<boolean>(false)

const onChangeZoom = function() {
  echartKey.value = uuid()
}

onMounted(function() {
  followed.value = toBoolean(props.option.followed)
  // 获取图表详情
  getData()
})




</script>

<template>
  <FullScreen>
    <div class="text-kdFang">
      <div class="flex justify-between">
        <h4 class="font-bold text-global-highTitle">{{ option.name }}</h4>
        <div class="text-global-time text-xs">
        <span v-if="updateLast">
          <span>更新时间:</span>
          <span class="ml-1">{{ updateLast }}前</span>
        </span>
          <div class="inline-block">
            <TopicFollow :id="option.chartId" v-model:status="followed"/>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-1.5 h-9">
      <span class="flex items-baseline">
        <span class="text-3xl mr-2  block" v-if="detail.value">
          <span v-if="detail.value > 0" class="text-global-numGreen">{{ toNumber(detail.value) }}%</span>
          <span v-else class="text-global-numRed">{{ toNumber(detail.value) }}%</span>
        </span>
        <span class="text-sm block" v-if="detail.change">
          <span v-if="detail.change > 0" class="text-global-numGreen flex items-center">
            <span>+{{ convertNumber(detail.change, 100) }}%</span>
            <IconFont class="ml-1" size="8" type="https://res.ikingdata.com/nav/topicUp.svg"/>
          </span>
          <span v-else class="text-global-numRed flex items-center">
            <span>{{ convertNumber(detail.change, 100) }}%</span>
            <IconFont class="ml-1" size="8" type="https://res.ikingdata.com/nav/topicDown.svg"/>
          </span>
        </span>
      </span>
        <FullZoom @change="onChangeZoom"/> <!-- 缩放按钮 -->
      </div>
      <div :style="{ 'height': `${option.height}px` }" :key="echartKey">
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
            <EchartsLegend :index="index" :value="item.name" :type="item.type"/>
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
          <template v-for="(item, index) in chart.series" :key="index">
            <!--
              通过 index 与 legend 对应
              value: 数据
            -->
            <EchartsSeries :index="index" :value="item.data" :stack="item.stack"/>
          </template>
        </Echarts>
      </div>
    </div>
  </FullScreen>
</template>

