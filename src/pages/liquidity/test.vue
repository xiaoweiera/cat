<script setup lang='ts'>
import { onMounted, ref,reactive } from 'vue'
import * as echarts from 'echarts'
import * as R from 'ramda'
import { formatRulesNumber } from '~/lib/tool'
import {colors} from '~/logic/echarts/colors'
import {getConfig} from '~/logic/chartConfig/leftBar'
import { getBarChart } from '~/logic/apy2'
const data=ref({})
const param=reactive({
  symbol:'BUSD',
  from_ts:'0',
  to_ts:'0',
  interval:'1D'
})
const getChartData=async ()=>{
  data.value=await getBarChart(param)
}
const getYAxis=()=>{
  const yData =data.value.xAxis[0].data.map((item,i)=>{
    return {
      value:JSON.stringify({
        value:formatRulesNumber(data.value.series[0].data[i]),
        color:colors.length-1>=i?colors[i]:colors[0],
        ...item,
      }),
    }
  })
  return yData
}
const getSeries=()=>R.map(item=>formatRulesNumber(item),data.value.series[0].data)

let myChart: any = null

const getData=async ()=>{
  await getChartData()
  const yAxis=getYAxis()
  const series=getSeries()
  const chartOption=getConfig(yAxis,series)
  console.log(chartOption,'---')
  myChart.setOption(chartOption)
}
onMounted(()=>{
  const myChartDom = document.getElementById('chartBar')
  if (myChart) {
    myChart.dispose()
  }
  //@ts-ignore
  myChart = echarts.init(myChartDom, 'light')
  getData()
})

</script>
<template>

  <div class=' border-1 border-global-numGreen mx-auto my-30' style='width:628px;height:346px;'>
    <div  id="chartBar" class="w-full h-full"></div>
  </div>
</template>
<style  lang='scss'>

</style>
// @formatter:off
<route lang="yaml">
meta:
  layout: base
</route>
// @formatter:off
