<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { createItemChartResult, getItemData } from '~/logic/topic/item'

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

// 定义数据对象
const result = createItemChartResult()

//@ts-ignore
const echartDetail = computed(function() {
  return result.detail ? result.detail : props.option
})
// 大屏数据
// @ts-ignore
const fullEchartDetail = computed(function() {
  const interval = result?.detail?.interval || '1d'
  return Object.assign({}, props.option, { interval })
})

//@ts-ignore
const echartHeight = computed(function() {
  const data = result.detail
  if (data) {
    return data.height
  }
  return 200
})

// @ts-ignore
const onLoad = async function() {
  const option = props.option
  //@ts-ignore
  const data = await getItemData(option)

  result.detail = data.detail
  result.legends = data.legends
  result.xAxis = data.xAxis
  result.uuid = data.uuid
}


</script>

<template>
  <FullScreen>
    <template #default="scope">
      <!-- 全屏 -->
      <div v-if="scope.status" class="h-full">
        <TopicChartFull :option="fullEchartDetail"/>
      </div>
      <template v-else>
        <TopicChartHead :data="echartDetail" :full="scope.status">
          <template #timeEnd>
            <TopicTimeend :data="echartDetail" :xzxis="result.xAxis"></TopicTimeend>
          </template>
        </TopicChartHead>
        <div class="text-kdFang" :style="{ 'height': `${echartHeight}px` }">
          <Winshow class="h-full" @onload="onLoad">
            <template v-if="result.xAxis.length > 0">
              <TopicChartView :key="result.uuid" :data="result"/>
            </template>
          </Winshow>
        </div>
      </template>
    </template>
  </FullScreen>
</template>

