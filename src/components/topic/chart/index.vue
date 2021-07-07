<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { getChartList } from '~/logic/topic/chart'

// @ts-ignore
const props = defineProps({
  menu: {
    type: Object
  }
})

const page = ref<number>(1)
const limit = ref<number>(10)
const list = ref<any[]>([])

const getData = async function() {
  const menu = props?.menu
  const id = menu?.topicID || menu?.id
  const data = await getChartList(id, page.value, limit.value)
  list.value = data
}

// 计算图表宽度
const getRowColWidth = function(width: number): string {
  const className = ['w-full']
  if (width > 50) {
    return className
  }
  className.push('md:w-1/2')
  return className
}

onMounted(getData)

</script>

<template>
  <div class="p-2.5 flex flex-wrap">
    <template v-for="(data, index) in list" :key="index">
      <div v-if="index === 1" class="p-2.5" :class="getRowColWidth(data.width)">
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

