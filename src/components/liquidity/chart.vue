<script lang="ts" setup>
import { defineProps, onMounted, watch, toRefs,ref } from 'vue'
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
// 颗粒度天 时
const interval = '1h'
let myChart: any = null
const pp = toRefs(paramChart)
const props = defineProps({
  chartData: Object,
})
const draw = (xData: Array<string>, series: any, legend: Array<string>, minM: number, maxM: number, kminM: number, kmaxM: number) => {

  // @ts-ignore
  const chartOption = chartConfig(xData, series, minM, maxM, kminM, kmaxM, legend, yLabelFormat, getModel)
  console.log(chartOption)
  myChart.setOption(chartOption)
  // @ts-ignore
  // window.addEventListener('resize', myChart.resize)
}
const getChartData=()=>{
  const xData = getXData(props?.chartData.xaxis, interval)
  const legend = getLegendList(props?.chartData.yaxis, props.chartData.kyaxis)
  const [minM, maxM, kminM, kmaxM, series] = getSeries(
      props?.chartData.yaxis,
      props?.chartData.kyaxis,
  )
  draw(xData, series, legend, minM, maxM, kminM, kmaxM)
}
// watch(() => props.chartData, (n, o) => {
//   console.log('kkkk',o)
//   getChartData()
// })
onMounted(() => {
  const myChartDom = document.getElementById(props?.chartData.id)
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(myChartDom, 'light')
  console.log(props.chartData)
  getChartData()
})
</script>
<template>
  <div class="mt-4 w-full h-full">
    <div :id="props.chartData.id" class="chartCanvas w-full h-full"></div>
  </div>
</template>
