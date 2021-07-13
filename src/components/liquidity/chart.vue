<script lang="ts" setup>
import { defineProps, onMounted, toRefs,watch } from 'vue'
import * as R from 'ramda'
import * as echarts from 'echarts'
import { paramChart,pairStore} from '~/store/liquidity/state'
import {getXData,getGroupSeries, yLabelFormat, getModel, getLegendList} from '~/logic/liquidity/getChartData'
import { chartConfig } from '~/logic/liquidity/chartConfig'
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
const pp = toRefs(paramChart)
const props = defineProps({
  priceData:Object,
  chartData: Object,
  chartId:Number,
  coinType:Object
})
const draw = (xData: Array<string>, series: any, legend: Array<string>, allYAxis:any) => {
  // @ts-ignore
  const chartOption = chartConfig(xData, series,allYAxis, legend, yLabelFormat, getModel,paramChart.interval)
  myChart.setOption(chartOption)
  // @ts-ignore

  window.addEventListener('resize', myChart.resize)
}

const getChartData=()=>{
  const allXaxis=R.sortBy((item) => item, R.uniq(R.concat(props?.chartData?.xaxis,props.priceData.value.xaxis)))
  const xData = getXData(allXaxis, paramChart.interval)
  const legend = getLegendList(props?.chartData.yaxis,props.priceData.value.yaxis[0],props.coinType.value)
  const [series,allYAxis] = getGroupSeries(
      props?.chartData.xaxis,props.priceData.value.xaxis,
      props?.chartData.yaxis, props.priceData.value.yaxis[0],
      allXaxis,
      paramChart.interval,
      pairStore.id,
      props.coinType.value
  )
  draw(xData, series, legend,allYAxis)
}
onMounted(() => {
  const myChartDom = document.getElementById(props.chartId)
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(myChartDom, 'light')

  // myChart.on('legendselectchanged', function(params) {
  //   console.log('kkkkk')
  //   const option = this.getOption();
  //   const select_key = Object.keys(params.selected);
  //   const select_value = Object.values(params.selected);
  //   let n = 0;
  //   select_value.map(res => {
  //     if(!res){
  //       n++;
  //     }
  //   });
  //   // this.setOption(option)
  //   console.log('n',n,select_value,option)
  //   console.log(option.legend)
  //   console.log(params.name)
  // })
  getChartData()
})
</script>
<template>
  <div class="mt-4 w-full h-77.5">
    <div :id="props.chartId" class="chartCanvas w-full h-77.5"></div>
  </div>
</template>
