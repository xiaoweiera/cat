<script lang='ts' setup>
import { defineProps, onMounted, watch, ref, reactive } from 'vue'
import { getChart } from '../../logic/topRank/dapp'
import { EchartData, Position } from '~/logic/echarts/interface'
import { echartTransform } from '~/lib/common'
import {chartConfig} from '~/logic/topRank/chartConfig'
import { uuid } from '~/utils'
import * as echarts from 'echarts'
const props = defineProps({
  chartData:Object,
  loading:Boolean
})
const loading=ref(true)
const chartKey = ref<string>(uuid())
let myChart: any = null
watch(props, () => {
  chartKey.value = uuid()
})

const getData=async ()=>{
  const data=await getChart('j')
  console.log(data,'佳洁士冬季赛多久啊就')
  draw(data.xAxis,data.series)
}
const draw = (xData: Array<string>, series: any) => {
  console.log('sssss',series)
  // @ts-ignore
  const chartOption = chartConfig(xData, series)
  console.log('斤斤计较',chartOption)
  myChart.setOption(chartOption)
  // @ts-ignore
  window.addEventListener('resize', myChart.resize)
}
onMounted(()=>{
  const myChartDom = document.getElementById('rankChart')
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(myChartDom, 'light')
  getData()
})
</script>
<template>
  <div  class="w-full h-full  relative">
    <div class='flex justify-between items-center'>
      <div class='text-kd14px18px text-global-highTitle txt45'>所有公链总 TVL</div>
      <div class='flex items-center'>
        <span class='text-kd26px26px font-bold exp mr-1.5'>$23914.12</span>
        <span class='text-kd14px18px text-global-numGreen exp h-5.5 w-5.5  flex items-center justify-center text-center mr-1.5 bg-global-numGreen bg-opacity-16 rounded-kd4px'>7D</span>
        <span class='text-kd14px18px flex items-center text-global-numGreen exp mr-0.5'>
          +130%
        <IconFont size='14' class='text-global-numGreen' type='icon-up'/>
        </span>
      </div>
    </div>
    <div class=" w-full h-full  md:h-50 mt-3  relative">
      <div  id="rankChart" class="chartCanvas w-full h-full"></div>
    </div>
<!--    <UiLoading v-if="loading"/>-->
  </div>

</template>