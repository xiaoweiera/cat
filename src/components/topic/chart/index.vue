<script setup lang="ts">
import { defineProps, onMounted, ref, onUnmounted } from 'vue'
import { getChartList } from '~/logic/topic/chart'
import { toNumber } from '~/utils/index'
import * as scroll from '~/utils/event/scroll'

// @ts-ignore
const props = defineProps({
  menu: {
    type: Object
  }
})

const namespace = 'topic'
let loading = false

let page = 1
let limit = 10
let count = page * limit
const list = ref<any[]>([])


const getData = async function() {
  if (!loading && (page * limit - limit) <= count) {
    loading = true
    const menu = props?.menu
    const id = menu?.topicID || menu?.id
    const { list: array, count: size } = await getChartList(id, page, limit)
    list.value = [].concat(list.value, array)
    count = toNumber(size, 0)
    loading = false
    page += 1
  }
}

// 计算图表宽度
// @ts-ignore
const getRowColWidth = function(width: number): string[] {
  const className = ['w-full']
  if (width > 50) {
    return className
  }
  className.push('md:w-1/2')
  return className
}

const onScroll = function() {
  if (!loading) {
    const top = scroll.scrollTop()
    const viewHieght = scroll.viewHieght()
    const bodyHeight = scroll.bodyHeight()

    const number = top + viewHieght
    if (number + 200 > bodyHeight) {
      getData()
    }
  }
}

onMounted(function() {
  getData()
  scroll.bind(namespace, onScroll)
})
onUnmounted(function() {
  scroll.unbind(namespace)
})

</script>

<template>
  <div class="p-2.5 flex flex-wrap">
    <template v-for="(data, index) in list" :key="index">
      <!-- v-if="data.chartId === 621"  -->
      <div class="p-2.5" :class="getRowColWidth(data.width)">
        <div class="chart-item rounded p-3 bg-white">
          <TopicChartItem :option="data"></TopicChartItem>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
  .chart-item {
    box-shadow: 0 0 12px rgba(44, 140, 248, 0.12);
  }
</style>

