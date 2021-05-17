<script setup lang="ts">
// @ts-ignore
import * as echarts from 'echarts'
import { defineProps, onMounted, reactive, ref, watch } from 'vue'
import * as utils from '~/utils/index'
import { chartOption } from '~/lib/chartOptionBig'
import {
  getModel,
  getPlat,
  getSerise,
  getUnit,
  getTimeData,
  yLabelFormat,
  getLengent,
} from '~/logic/apy/formatChart'
import { tableConfig } from '~/logic/apy/config'

const props = defineProps({
  id: { type: String },
  state: { type: Boolean },
  chartData: { type: Object },
  tableIndex: { type: Number },
  chartIndex: { type: Number },
  chainId: { type: String },
  changeState: { type: Function },
  title: { type: String },
  selected: { type: String },
  bigOption: { type: Object },
})
const unit = ref('')
const xChartData = ref([])
const serise = ref([])
const legendData = ref([])
const tags = reactive({ platforms: [], selected: '' })
let myChart: any = null
let minY = 0
let maxY = 0
const beginTime = ref('')
const endTime = ref('')
// 请求参数
// @ts-ignore
const param = {
  chain: props.chainId,
  category: props.chartData.category,
  ...tableConfig[props.tableIndex].charts[props.chartIndex].param,
  from_ts: '',
  to_ts: '',
}
const isChangeChain = ref(true)
// 画图
const draw = () => {
  myChart.setOption(chartOption(
    xChartData.value,
    getModel,
    serise.value,
    legendData.value,
    yLabelFormat,
    minY,
    maxY,
    unit.value,
  ), true)
}

const reRenderChart = utils.debounce(async() => {
  // @ts-ignore
  let param = {
    chain: props.chainId,
    category: props.chartData.category,
    ...tableConfig[props.tableIndex].charts[props.chartIndex].param,
  }
  if (beginTime.value) {
    param = {
      ...param,
      from_ts: beginTime.value,
      to_ts: endTime.value,
    }
  }
  // @ts-ignore
  const {
    xData,
    yData,
    min,
    max,
  } = await getTimeData(tableConfig[props.tableIndex].charts[props.chartIndex].requestData, param, props.tableIndex, props.chartIndex, tags.selected)
  // @ts-ignore
  unit.value = getUnit(props.tableIndex, props.chartIndex, tags.selected)
  xChartData.value = xData
  minY = min
  maxY = max
  serise.value = getSerise(yData)
  legendData.value = getLengent(yData)
  draw()
}, 600)

const changeTime = (beginTimeStr: string, endTimeStr: string) => {
  beginTime.value = beginTimeStr
  endTime.value = endTimeStr
  reRenderChart()
}

watch(() => props.chartData?.option, (newOptions, oldOptions) => {
  // @ts-ignore
  if (!newOptions?.data) {
    return
  }
  // @ts-ignore
  if (!oldOptions?.data || isChangeChain.value) {
    // @ts-ignore
    tags.platforms = getPlat(newOptions, props.tableIndex, props.chartIndex)
    tags.selected = tags.platforms.length > 0 ? tags.platforms[0] : ''
  }
  isChangeChain.value = false
  reRenderChart()
})
watch(() => tags.selected, () => {
  reRenderChart()
})
onMounted(() => {
  // @ts-ignore
  myChart = echarts.init(document.getElementById(`${props.id}big`), 'light')
  window.addEventListener('resize', myChart.resize)
  const newOptions = props.chartData?.option
  if (!newOptions?.data) {
    return
  }
  // @ts-ignore
  tags.platforms = getPlat(newOptions, props.tableIndex, props.chartIndex)
  if (isChangeChain.value) {
    // @ts-ignore
    tags.selected = props.selected
  }
  isChangeChain.value = false
  reRenderChart()
})
// @ts-ignore
const closeModel = () => {
  props.changeState(false)
}
</script>
<template>
  <div class="dialogModel" @click="closeModel">
    <img class="closeButton hand" src="https://res.ikingdata.com/nav/apyBigClose.png" alt="" @click="closeModel">
    <div class="dialogChart  px-5 py-5.1" @click.stop="">
      <ApyDesBig
        :change-time="changeTime"
        :title="props.chartData.title"
        :selected="tags.selected"
        :table-index="props.tableIndex"
        :chart-index="props.chartIndex"
      />
      <ApyPlatBig :chart-data="chartData" :chart-index="chartIndex" :tags="tags" />
      <div class="flex relative whNumber">
        <div :id="props.id+'big'" class="whChartNumber">
        </div>
        <!--        分析器 下拉框-->
        <ApyFilterChart :chart-index="chartIndex" />
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.whNumber {
  width: 100%;
  height: 92%
}
.whChartNumber{
  flex:1;
  height: 100%;
}
.dialogModel {
  width: 100%;
  position: fixed;
  height: 100%;
  z-index: 10;
  background: rgba(68, 90, 132, 0.4);
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  margin: 0 auto;
}

.dialogChart {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 80%;
  height: 83%;
}

.closeButton {
  width: 16.97px;
  height: 16.97px;
  position: absolute;
  right: 7%;
  top: 4.5%;
}
</style>
