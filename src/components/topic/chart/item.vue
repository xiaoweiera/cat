<script setup lang="ts">
import { toNumber, map, dateDiff, max, forEach } from '~/utils/index'
import bignumber from 'bignumber.js'
import { reactive, toRaw, defineProps, onMounted, computed } from 'vue'
import { getChartTrends } from '~/logic/topic/chart'
import { convertDate } from '~/logic/echarts/series'
import safeGet from '@fengqiaogang/safe-get'

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

onMounted(getData)

</script>

<template>
  <FullScreen>
    <template #default="scope">
      <!-- 全屏 -->
      <el-container v-if="scope.status" class="h-full">
        <el-header height="initial" class="p-0">
          <TopicChartHead :data="option" :full="scope.status"/>
        </el-header>
        <el-main class="p-0">
          <div class="pt-3 h-full">
            <TopicChartView v-if="chart.legend.length > 0" :chart="chart"/>
          </div>
        </el-main>
      </el-container>
      <template v-else>
        <TopicChartHead :data="option" :full="scope.status"/>
        <div class="text-kdFang" :style="{ 'height': `${option.height}px` }">
          <TopicChartView v-if="chart.legend.length > 0" :chart="chart"/>
        </div>
      </template>
    </template>
  </FullScreen>
</template>

