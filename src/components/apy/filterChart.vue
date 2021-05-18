<script setup lang="ts">
import { toRefs, watch, defineProps, onMounted } from 'vue'
import { getInfo } from '~/logic/apy/chartOption'
import { tableConfig, tableIndex } from '~/logic/apy/config'

const props = defineProps({
  chainId: String,
  chartData: Object,
  category: String,
  chartIndex: Number,
  selectedTag: String,
  tags: Object,
  optionData: Function,
  beginTime: Number,
  endTime: Number,
})

interface dataSetModel {
  chain: string
  category: string
  chartIndex: number
  selectedTag: string
}

const typeName = 'type'
const { selected } = toRefs(props.tags)
const { title } = toRefs(props.chartData)
let param: dataSetModel = {
  chain: props.chainId,
  chartIndex: props.chartIndex,
  category: props.category,
  selectedTag: props.selectedTag,
}
const {
  chains,
  types,
  plats,
  coins,
  marks,
  getData,
  changeTypes,
  changePlats,
  requestFilterData,
  isChartIndex,
} = getInfo(param, props.chartIndex)

// 重新绘制
const newDraw = async(filterName) => {
  filterName = filterName === '全部'
    ? ''
    : filterName
  if (props.beginTime) {
    param = {
      ...param,
      from_ts: props.beginTime,
      to_ts: props.endTime,
    }
  }
  const { xData, yData, min, max } = await requestFilterData(
    param,
    filterName,
    props.chartIndex,
  )
  const unitSelect = isChartIndex === 2
    ? plats.select
    : marks.select
  props.optionData(
    xData,
    yData,
    min,
    max,
    tableIndex[types.select],
    isChartIndex.value,
    unitSelect,
  )
}

// 改变弹框左上角的描述信息
const setDes = () => {
  // 得到标题
  title.value
    = tableConfig[tableIndex[types.select]].charts[isChartIndex.value].title
  // siChartIndex 当前是第几种chart
  if (isChartIndex.value === 0) {
    selected.value = plats.select
  } else if (isChartIndex.value === 1) {
    selected.value = coins.select
  } else {
    selected.value = marks.select
  }
}

// 监听时间
watch(
  () => props.beginTime,
  () => {
    newDraw()
  },
)
watch(
  () => props.endTime,
  () => {
    newDraw()
  },
)
// 监听链
watch(
  () => chains.select,
  (n, o) => {
    param.chain = n.toLowerCase()
    param.selectedTag = ''
    getData(param)
    newDraw()
  },
)

// 监听类型
watch(
  () => types.select,
  async(n, o) => {
    param.category = n
    changeTypes(param)
    newDraw()
    setDes()
  },
)
// 由于有的时候平台变，币种不变，所以也要监听data，进行去全部操作
watch(
  () => coins.data,
  () => {
    if (plats.select === '全部') {
      if (coins.data.includes('全部')) {
        coins.data.shift()
      }
    } else {
      if (!coins.data.includes('全部')) {
        coins.data.unshift('全部')
      }
    }
  },
)
watch(
  () => plats.data,
  () => {
    if (coins.select === '全部') {
      if (plats.data.includes('全部')) {
        plats.data.shift()
      }
    } else {
      if (!plats.data.includes('全部')) {
        plats.data.unshift('全部')
      }
    }
  },
)
// 监听平台
watch(
  () => plats.select,
  async(n, o) => {
    changePlats(param, props.chartIndex)
    newDraw(coins.select)
    setDes()
    // 如果平台是全部，币种就不要全部
    if (n === '全部') {
      if (coins.data.includes(n)) {
        coins.data.shift()
      }
    } else {
      if (!coins.data.includes('全部')) {
        coins.data.unshift('全部')
      }
    }
  },
)
// 监听币种
watch(
  () => coins.select,
  (n, o) => {
    if (props.chartIndex !== 2) {
      newDraw(n)
      setDes()
      if (coins.select === '全部') {
        if (plats.data.includes('全部')) {
          plats.data.shift()
        }
      } else {
        if (!plats.data.includes('全部')) {
          plats.data.unshift('全部')
        }
      }
    }
  },
)

// 监听指标
watch(
  () => marks.select,
  (n, o) => {
    if (props.chartIndex === 2) {
      param.selectedTag = marks.select
      newDraw(plats.select)
      setDes()
    }
  },
)
onMounted(() => {
  getData(param)
})
</script>
<template>
  <div class="w-56 ml-5">
    <!-- 所在链-->
    <div class="items-center justify-between w-full h-10 h-7.5 mb-6">
      <ApyChartFilter :data-list="chains" />
      <ApyChartFilter :type-name="typeName" :data-list="types" />
      <ApyChartFilter :data-list="plats" />
      <ApyChartFilter v-if="props.chartIndex !== 2" :data-list="coins" />
      <ApyChartFilter :data-list="marks" />
    </div>
  </div>
</template>
<style scoped>
::v-deep(.el-input__suffix) {
  margin-top: -5px;
}

::v-deep(.el-input__inner) {
  height: 30px;
}

.selectDes {
  color: rgba(37, 62, 111, 0.65);
  @apply text-kd14px18px;
}
</style>
