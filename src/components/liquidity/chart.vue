<script lang="ts" setup>
import { defineProps, onMounted, toRefs,ref,toRaw } from 'vue'
import * as R from 'ramda'
import * as echarts from 'echarts'
import { paramChart,pairStore} from '~/store/liquidity/state'
import {getXData,getGroupSeries, yLabelFormat, getModel, getLegendList} from '~/logic/liquidity/getChartData'
import { chartConfig,getLegendRow } from '~/logic/liquidity/chartConfig'
import {kData,groupData} from '/mock/liquidity'
interface yModel {
  color: string
  data: Array<number>
  name: string
  type: string
  unit: string
}
// 颗粒度天 时
let myChart: any = null
const props = defineProps({
  full:Boolean,
  priceData:Object,
  chartData: Object,
  chartId:String,
  coinType:Object
})
const draw = (xData: Array<string>, series: any, legend: Array<string>,selected:Array<object>, allYAxis:any,row:number) => {
  // @ts-ignore
  const chartOption = chartConfig(xData, series,allYAxis, legend,selected, yLabelFormat, getModel,paramChart.interval,props.full,row)
  myChart.setOption(chartOption)
  // @ts-ignore

  window.addEventListener('resize', myChart.resize)
}
const echartsRef = ref<any>(null)
const getChartData=()=>{
  const allXaxis=R.sortBy((item) => item, R.uniq(R.concat(props?.chartData?.xaxis,props.priceData.value.xaxis)))
  const xData = getXData(allXaxis, paramChart.interval)
  const [legend,selected] = getLegendList(props?.chartData.yaxis,props.priceData.value.yaxis[0],props.coinType.value)
  const row=getLegendRow(toRaw(echartsRef).value,legend)
  const [series,allYAxis] = getGroupSeries(
      props?.chartData.xaxis,props.priceData.value.xaxis,
      props?.chartData.yaxis, props.priceData.value.yaxis[0],
      allXaxis,
      paramChart.interval,
      pairStore.id,
      props.coinType.value
  )
  draw(xData, series, legend,selected,allYAxis,row)
}

onMounted(() => {
  const myChartDom = document.getElementById(props.chartId)
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(myChartDom, 'light')
  getChartData()
})
</script>
<template>
  <div class=" w-full h-full" :class="props.full?'':'mt-4'">
    <div ref="echartsRef" :id="props.chartId" class="chartCanvas w-full h-full"></div>
  </div>
</template>
