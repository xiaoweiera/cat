<script setup lang="ts">
import { defineProps, onMounted, ref, onUnmounted } from 'vue'
import { getChartList } from '~/logic/topic/chart'
import { arrayConcat, toNumber } from '~/utils/index'
import * as scroll from '~/utils/event/scroll'

// @ts-ignore
const props = defineProps({
  menu: {
    type: Object
  },
  query: {
    type: String,
    default () {
      return ''
    }
  }
})

const namespace = 'topicList'
let loading = ref<boolean>(false)

let page = ref<number>(1)
let limit = ref<number>(10)
let count = ref<number>(page.value * limit.value)
const list = ref<any[]>([])

const getNextStatus = function(): boolean {
  const size = page.value * limit.value - limit.value
  return size <= count.value
}


// 计算图表宽度
// @ts-ignore
const getRowColWidth = function(width: number): string[] {
  const className = ['w-full']
  if (width > 50) {
    return className
  }
  className.push('lg:w-1/2')
  return className
}

const onScroll = function() {
  if (!loading.value) {
    const top = scroll.scrollTop()
    const viewHieght = scroll.viewHieght()
    const bodyHeight = scroll.bodyHeight()

    const number = top + viewHieght
    if (number + 200 > bodyHeight) {
      getData()
    }
  }
}

const getData = async function() {
  if (!loading.value && getNextStatus()) {
    loading.value = true
    // 请求列表
    const menu = props?.menu
    const id = menu?.topicID || menu?.id
    const { list: array, count: size } = await getChartList(id, page.value, limit.value, props.query)
    // 处理数据
    list.value = arrayConcat(list.value, array)
    count.value = toNumber(size, 0)
    page.value = page.value + 1
    // 判断是否有下一页数据
    if (getNextStatus()) {
      loading.value = false
      /**
       * 添加滚动条事件
       * 内部做好唯一性处理，不会重复绑定事件
       */
      scroll.bind(namespace, onScroll)
    } else {
      // 删除事件
      scroll.unbind(namespace)
    }
  }
}

onMounted(getData)

onUnmounted(function() {
  scroll.unbind(namespace)
})

</script>

<template>
  <div class="p-2.5 flex flex-wrap" v-if="list.length > 0">
    <template v-for="(data, index) in list" :key="index">
      <!-- v-if="data.chartId === 621"  -->
      <div class="p-2.5" :class="getRowColWidth(data.width)">
        <div class="chart-item rounded p-3 bg-white">
          <TopicChartItem :option="data"></TopicChartItem>
        </div>
      </div>
    </template>
  </div>
  <div v-else>
    <empty desc="暂无图表"/>
  </div>
</template>

<style>
  .chart-item {
    box-shadow: 0 0 12px rgba(44, 140, 248, 0.12);
  }
</style>

