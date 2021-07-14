<script setup lang="ts">
import { toNumber } from '~/utils/index'
import bignumber from 'bignumber.js'
import { reactive, defineProps, onMounted, computed } from 'vue'
import { getItemData } from '~/logic/topic/item'

interface ChartDetail {
  default_chart?: string // 图形类型
  interval?: number // 更新时间频率
  relation_unit?: string // 价格单位
  value?: number // 涨浮数(不需要计算百分比)
  change?: number // 涨浮（需要计算百分比）
  width?: number
  height?: number
}

const props = defineProps({
  /*
    图表宽度: width
    图表高度: height
    图表名称: name
    图表描述: desc
    是否关注: followed
    图表ID: chartId
    数据ID集合: seriesIds
    multiple: 单图或多图
  */
  option: {
    type: Object,
    required: true,
  }
})

interface Result {
  detail?: ChartDetail
  legends: Array<any>
  xAxis: Array<any>
  // yAxis: Array<any>
}

const result = reactive<Result>({
  detail: void 0,
  legends: [],
  xAxis: [],
})

// @ts-ignore
const convertNumber = function(value: number | string, zoom: 1) {
  const number = new bignumber(value)
  const data = number.multipliedBy(zoom)
  return toNumber(data as any)
}
//@ts-ignore
const echartDetail = computed(function() {
  return result.detail ? result.detail : props.option
})
//@ts-ignore
const echartHeight = computed(function() {
  const data = result.detail
  if (data) {
    return data.height
  }
  return 200
})

const init = async function() {
  const option = props.option
  //@ts-ignore
  const data: Result = await getItemData(option)

  result.detail = data.detail
  result.legends = data.legends
  result.xAxis = data.xAxis

}

onMounted(init)

</script>

<template>
  <FullScreen>
    <template #default="scope">
      <!-- 全屏 -->
      <el-container v-if="scope.status" class="h-full">
        <el-header height="initial" class="p-0" >
          <TopicChartHead :data="echartDetail" :full="scope.status"/>
        </el-header>
        <el-main class="p-0">
          <div class="pt-3 h-full">
            <template v-if="result.xAxis.length > 0">
              <TopicChartView :data="result"/>
            </template>
          </div>
        </el-main>
        <el-footer height="initial" class="p-0">
          <TopicChartFooter :data="echartDetail">
            <template #timeEnd>
              <TopicTimeend :data="echartDetail" :xzxis="result.xAxis"></TopicTimeend>
            </template>
          </TopicChartFooter>
        </el-footer>
      </el-container>

      <template v-else>
        <TopicChartHead :data="echartDetail" :full="scope.status">
          <template #timeEnd>
            <TopicTimeend :data="echartDetail" :xzxis="result.xAxis"></TopicTimeend>
          </template>
        </TopicChartHead>
        <div class="text-kdFang" :style="{ 'height': `${echartHeight}px` }">
          <template v-if="result.xAxis.length > 0">
            <TopicChartView :data="result"/>
          </template>
        </div>
      </template>
    </template>
  </FullScreen>
</template>

