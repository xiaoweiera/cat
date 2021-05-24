<script lang="ts" setup>
import { defineProps, onMounted, watch, toRefs } from 'vue'
import * as echarts from 'echarts'
import { paramChart } from '~/store/liquidity/state'
import {
  getXData,
  getSeries,
  yLabelFormat,
  getModel,
  getLegendList,
} from '~/logic/liquidity/getChartData'
import { chartConfig } from '~/logic/liquidity/chartConfig'
interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  unit: string
}
const interval = '1h'
const pp = toRefs(paramChart)
const props = defineProps({
  chartData: Object,
})
watch(
  () => paramChart,
  (n, o) => {
    console.log(n)
  },
  { deep: true },
)
const draw = (
  xData: Array<string>,
  series: any,
  legend: Array<string>,
  minM: number,
  maxM: number,
  kminM: number,
  kmaxM: number,
) => {
  const myChartDom = document.getElementById(props?.chartData.id)
  // if (this.myChart) {
  //   this.myChart.dispose();
  // }
  // @ts-ignore
  const myChart = echarts.init(myChartDom, 'light')
  const chartOption = chartConfig(
    xData,
    series,
    minM,
    maxM,
    kminM,
    kmaxM,
    legend,
    yLabelFormat,
    getModel,
  )
  myChart.setOption(chartOption)
  // @ts-ignore
  window.addEventListener('resize', myChart.resize)
}
onMounted(() => {
  const xData = getXData(props?.chartData.xaxis, interval)
  const legend = getLegendList(props?.chartData.yaxis, props.chartData.kyaxis)
  const [minM, maxM, kminM, kmaxM, series] = getSeries(
    props?.chartData.yaxis,
    props?.chartData.kyaxis,
  )
  draw(xData, series, legend, minM, maxM, kminM, kmaxM)
})
</script>
<template>
  <div class="mt-4 w-full h-full">
    <div :id="props.chartData.id" class="chartCanvas w-full h-full"></div>
  </div>
</template>
