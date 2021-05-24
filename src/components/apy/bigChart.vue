<script setup lang="ts">
import * as echarts from 'echarts'
import { defineProps, onMounted, reactive, ref, watch } from 'vue'
import * as utils from '~/utils/index'
import { chartOption } from '~/lib/chartOptionBig'
import {
  getModel,
  getSerise,
  getUnit,
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
const chartDataFilter = reactive({ title: props.chartData.title })
// 请求参数
// @ts-ignore
const param = {
  chain: props.chainId,
  category: props.chartData.category,
  ...tableConfig[props.tableIndex].charts[props.chartIndex].param,
  from_ts: '',
  to_ts: '',
}
// 画图表
const draw = () => {
  myChart.setOption(
    chartOption(
      xChartData.value,
      getModel,
      serise.value,
      legendData.value,
      yLabelFormat,
      minY,
      maxY,
      unit.value,
    ),
    true,
  )
}
const changeTime = (beginTimeStr: string, endTimeStr: string) => {
  beginTime.value = beginTimeStr
  endTime.value = endTimeStr
}
onMounted(() => {
  // @ts-ignore
  myChart = echarts.init(document.getElementById(`${props.id}big`), 'light', {
    renderer: 'svg',
  })
  window.addEventListener('resize', myChart.resize)
})
// @ts-ignore 关闭弹框
const closeModel = () => {
  props.changeState(false)
}
const optionData = (
  xData,
  yData,
  min,
  max,
  tableIndex,
  chartIndex,
  selectUnitName,
) => {
  // @ts-ignore
  unit.value = getUnit(tableIndex, chartIndex, selectUnitName)
  xChartData.value = xData
  minY = min
  maxY = max
  serise.value = getSerise(yData)
  legendData.value = getLengent(yData)
  draw()
}
</script>
<template>
  <div class="dialogModel" @click="closeModel">
    <img
      class="closeButton hand"
      src="https://res.ikingdata.com/nav/apyBigClose.png"
      alt=""
      @click="closeModel"
    />
    <div class="dialogChart px-5 py-5.1" @click.stop="">
      <ApyDesBig
        :change-time="changeTime"
        :title="chartDataFilter.title"
        :selected="tags.selected"
        :table-index="props.tableIndex"
        :chart-index="props.chartIndex"
      />
      <!--      <ApyPlatBig :chartData="chartData" :chartIndex="chartIndex" :tags="tags"/>-->
      <div class="flex relative whNumber mt-5">
        <div :id="props.id + 'big'" class="whChartNumber"></div>
        <!--        分析器 下拉框-->
        <ApyFilterChart
          :begin-time="beginTime"
          :chart-data-filter="chartDataFilter"
          :tags="tags"
          :end-time="endTime"
          :option-data="optionData"
          :selected-tag="selected"
          :category="chartData.category"
          :chain-id="chainId"
          :chart-index="chartIndex"
        />
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.whNumber {
  width: 100%;
  height: 92%;
}
.whChartNumber {
  flex: 1;
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
