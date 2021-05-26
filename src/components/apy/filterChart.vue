<script setup lang="ts">
import { toRefs, watch, defineProps, onMounted } from 'vue'
import { getInfo } from '~/logic/apy/chartOption'
import { tableConfig, tableIndex } from '~/logic/apy/config'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  chainId: String,
  chartDataFilter: Object,
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
const { title } = toRefs(props.chartDataFilter)
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
  filterName = filterName === I18n.apy.tagAll ? '' : filterName
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
  const unitSelect = isChartIndex === 2 ? plats.select : marks.select
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
  // isChartIndex 当前是第几种chart 当第一个图表更改的时候select是plat
  if (isChartIndex.value === 0 && props.chartIndex !== 2) {
    selected.value = plats.select
  } else if (isChartIndex.value === 1 && props.chartIndex !== 2) {
    selected.value = coins.select
  } else {
    // 当设置标题的时候如果是机枪池就带上选择的marks指标，因为只有机枪池有分类
    if (types.select === 'machine_gun_pool_single') {
      selected.value = marks.select
    } else {
      selected.value = ''
    }
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
    if (plats.select === I18n.apy.tagAll) {
      if (coins.data.includes(I18n.apy.tagAll)) {
        coins.data.shift()
      }
    } else {
      if (!coins.data.includes(I18n.apy.tagAll)) {
        coins.data.unshift(I18n.apy.tagAll)
      }
    }
  },
)
watch(
  () => plats.data,
  () => {
    if (coins.select === I18n.apy.tagAll) {
      if (plats.data.includes(I18n.apy.tagAll)) {
        plats.data.shift()
      }
    } else {
      if (!plats.data.includes(I18n.apy.tagAll)) {
        plats.data.unshift(I18n.apy.tagAll)
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
    if (n === I18n.apy.tagAll) {
      if (coins.data.includes(n)) {
        coins.data.shift()
      }
    } else {
      if (!coins.data.includes(I18n.apy.tagAll)) {
        coins.data.unshift(I18n.apy.tagAll)
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
      if (coins.select === I18n.apy.tagAll) {
        if (plats.data.includes(I18n.apy.tagAll)) {
          plats.data.shift()
        }
      } else {
        if (!plats.data.includes(I18n.apy.tagAll)) {
          plats.data.unshift(I18n.apy.tagAll)
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
