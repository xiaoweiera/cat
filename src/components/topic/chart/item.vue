<script setup lang="ts">
import { reactive, toRaw, defineProps, computed, onMounted } from 'vue'
import { getChartDetail, getChartTrends } from '~/logic/topic/chart'
export interface ChartDetail {
  id?: number
  name?: string // 图表名称
  desc?: string // 描述
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

const props = defineProps({
  multiple: {
    type: Boolean
  },
  id: {
    type: Array,
    required: true
  },
  option: {
    type: Object,
    default () {
      return {}
    }
  }
})

const getData = async function() {
  const ids = [].concat(toRaw(props.id))
  const [ data, trends ] = await Promise.all([
    getChartDetail(props.multiple, ids),
    getChartTrends(props.multiple, ids)
  ])
  const keys = Object.keys(data)
  for(const key of keys) {
    detail[key] = data[key]
  }
  console.log(trends)
}


onMounted(() => {
  return getData()
})

</script>

<template>
  <div>
    <p>name = {{ detail.name }}</p>
    <p>width = {{ option.width }}</p>
    <p>height = {{ option.height }}</p>
    <p>multiple = {{ multiple }}</p>
    <p>id = {{ id }}</p>
    <div>
      <Echarts :height="option.height"></Echarts>
    </div>
  </div>
</template>

<style scoped>

</style>
