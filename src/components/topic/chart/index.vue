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
onMounted(getData)

</script>

<template>
  <div class="p-2.5 flex flex-wrap">
    <template v-for="(data, index) in list" :key="index">
      <div v-if="index < 1" :style="{'width': `${data.width}%`}" class="p-2.5">
        <div class="chart-item rounded w-full h-full p-3 bg-white">
          <TopicChartItem :option="data" :multiple="data.multiple" :id="data.id"></TopicChartItem>
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

