<script lang="ts" setup>
import { defineProps, onMounted, toRefs } from 'vue'
import * as R from 'ramda'
import * as echarts from 'echarts'
import { paramChart,priceData} from '~/store/liquidity/state'
import {getXData, getSeries, yLabelFormat, getModel, getLegendList} from '~/logic/liquidity/getChartData'
import { chartConfig } from '~/logic/liquidity/chartConfig'
import {kData} from '/mock/liquidity'
interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  unit: string
}
// 颗粒度天 时
const interval = paramChart.interval
let myChart: any = null
const pp = toRefs(paramChart)
const props = defineProps({
  chartData: Object,
  chartId:Number
})
const draw = (xData: Array<string>, series: any, legend: Array<string>, minM: number, maxM: number, kminM: number, kmaxM: number) => {
  // @ts-ignore
  const chartOption = chartConfig(xData, series, minM, maxM, kminM, kmaxM, legend, yLabelFormat, getModel)
  myChart.setOption(chartOption)
  // @ts-ignore
  window.addEventListener('resize', myChart.resize)
}
const getChartData=()=>{
  const allXaxis=R.sortBy((item) => item, R.uniq(R.concat(props?.chartData.xaxis,priceData.value.xaxis)))
  const xData = getXData(allXaxis, interval)
  const legend = getLegendList(props?.chartData.yaxis,priceData.value.yaxis[0])
  const [minM, maxM, kminM, kmaxM, series] = getSeries(
      props?.chartData.xaxis,priceData.value.xaxis,
      props?.chartData.yaxis, priceData.value.yaxis[0],
      allXaxis
  )
  draw(xData, series, legend, minM, maxM, kminM, kmaxM)
}
onMounted(() => {
  const myChartDom = document.getElementById(props?.chartData.id)
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(myChartDom, 'light')
  getChartData()
})
</script>
<template>
  <div class="mt-4 w-full h-full">
    <div :id="props.chartData.id" class="chartCanvas w-full h-full"></div>
  </div>
</template>
