<script setup lang="ts">
import { defineProps, onMounted, reactive, ref,watch } from 'vue'
import * as echarts from 'echarts'
import * as R from 'ramda'
import { formatRulesNumber } from '~/lib/tool'
import {colors} from '~/logic/echarts/colors'
import {getConfig} from '~/logic/chartConfig/leftBar'
import { getBarChart } from '~/logic/apy2'
import { watchState } from '~/utils/use/state'
import { getTop5 } from '~/logic/apy2/table'
const props = defineProps({
  chartData: {
    type: Object,
  },
})
const getYAxis=()=>{
  //@ts-ignore
  const yData =props?.chartData?.xAxis[0].data.map((item,i)=>{
    return {
      value:JSON.stringify({
        value:formatRulesNumber(props?.chartData?.series[0].data[i]),
        color:colors.length-1>=i?colors[i]:colors[0],
        ...item,
      }),
    }
  })
  return yData
}
const getSeries=()=>R.map(item=>formatRulesNumber(item),props?.chartData?.series[0].data)

let myChart: any = null
const getData=async ()=>{
  const myChartDom = document.getElementById('chartBar')
  if (myChart) {
    myChart.dispose()
  }
  //@ts-ignore
  myChart = echarts.init(myChartDom, 'light')
  window.addEventListener('resize', myChart.resize)
  const yAxis=getYAxis()
  const series=getSeries()
  const chartOption=getConfig(yAxis,series)
  myChart.setOption(chartOption,{silent: true})
}
watch(()=>props.chartData,()=>getData())
</script>
<template>
      <div  id="chartBar" class="w-full h-full"></div>
</template>



