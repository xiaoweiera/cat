<script setup lang="ts">
import { isNumber, sleep } from '~/utils'
import { useWatch } from '~/utils/use/state'
import { computed, defineProps, ref } from 'vue'
import { getItemData, createItemChartResult } from '~/logic/topic/item'

const props = defineProps({
  option: {
    type: Object,
    required: true,
  }
})

const loading = ref<boolean>(false)

// @ts-ignore
const shortcuts = computed(function() {
  const interval = props.option?.interval || 'd'
  const data: any = {}
  if (interval === 'd') {
    data['day'] = ['7', '30', '90', '365', 'custom']
  }
  if (interval === 'h') {
    data['hour'] = ['7', '30']
  }
  return data
})


// 定义数据对象
const result = createItemChartResult()

//@ts-ignore
const echartDetail = computed(function() {
  return result.detail ? result.detail : props.option
})

const onGetData = async function(timeData: number[]) {
  loading.value = true
  const [from_ts, to_ts] = timeData
  const option = props.option
  const query: any = {}
  // 开始时间
  if (from_ts && isNumber(from_ts)) {
    query['from_ts'] = Math.floor(from_ts / 1000)
  }
  // 结束时间
  if (to_ts && isNumber(to_ts)) {
    query['to_ts'] = Math.floor(to_ts / 1000)
  }
  //@ts-ignore
  const data = await getItemData(option, query)
  result.detail = data.detail
  result.legends = data.legends
  result.xAxis = data.xAxis
  result.uuid = data.uuid
  return sleep(function() {
    loading.value = false
  }, 300)
}

// 监听日期组件
useWatch('uiDate', function(data: number[][]) {
  const [ value ] = data
  onGetData(value)
})

</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0" >
      <TopicChartHead :data="echartDetail" :full="true">
        <template #time>
          <UiDate :shortcuts="shortcuts"/>
        </template>
      </TopicChartHead>
    </el-header>
    <el-main class="p-0">
      <div class="pt-3 h-full">
        <Spin :loading="loading">
          <template v-if="result.xAxis.length > 0">
            <TopicChartView :key="result.uuid" :data="result"/>
          </template>
        </Spin>
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
</template>
