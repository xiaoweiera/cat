<script lang="ts" setup>
import { defineProps, onMounted, toRefs,ref,toRaw } from 'vue'
import * as R from 'ramda'
import * as echarts from 'echarts'
import I18n from '~/utils/i18n/index'
import { paramChart,pairStore,selectX} from '~/store/liquidity/state'
import {getXData,getGroupSeries, yLabelFormat, getModel, getLegendList,getXAreaColorList} from '~/logic/liquidity/getChartData'
import { chartConfig,getLegendRow } from '~/logic/liquidity/chartConfig'
import {kData,groupData} from '/mock/liquidity'
import { setInject } from '~/utils/use/state'

import FullEventName from '~/components/full/eventname'

// 获取外层的变量，修改数据用于控制 fullScreen 打开全屏或者取消全屏
const onTriggerFull = setInject(FullEventName.triggerFullEvent)
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
const setTs=setInject('ts') //设置点选图表后的时间戳
const draw = (xData: Array<string>, series: any, legend: Array<string>,selected:Array<object>, allYAxis:any,row:number,areaColorList:Array<string>) => {
  // @ts-ignore
  const chartOption = chartConfig(xData, series,allYAxis, legend,selected, yLabelFormat, getModel,paramChart.interval,props.full,row,areaColorList)
  myChart.setOption(chartOption)
  // @ts-ignore
  window.addEventListener('resize', myChart.resize)
}
const allXaxis=ref()
const echartsRef = ref<any>(null)
const getChartData=()=>{
  console.log('11')
   allXaxis.value=R.sortBy((item) => item, R.uniq(R.concat(props?.chartData?.xaxis,props.priceData.value.xaxis)))
  const xData = getXData(allXaxis.value, paramChart.interval)
  const [legend,selected] = getLegendList(props?.chartData.yaxis,props.priceData.value.yaxis[0],props.coinType.value)
  const row=getLegendRow(toRaw(echartsRef).value,legend)
  console.log('222')
  const [series,allYAxis] = getGroupSeries(
      props?.chartData.xaxis,props.priceData.value.xaxis,
      props?.chartData.yaxis, props.priceData.value.yaxis[0],
      allXaxis.value,
      paramChart.interval,
      pairStore.id,
      props.coinType.value,
      selectX.index
  )
  console.log('333')
  console.log(selectX)
  const areaColorList=getXAreaColorList(allXaxis.value,selectX.index,props.full)
  draw(xData, series, legend,selected,allYAxis,row,areaColorList)
}

onMounted(() => {
  const myChartDom = document.getElementById(props.chartId)
  if (myChart) {
    myChart.dispose();
  }
  myChart = echarts.init(myChartDom, 'light')
  getChartData()
  myChart.getZr().on('click',params=>{
    const pointInPixel= [params.offsetX, params.offsetY];
    if (myChart.containPixel('grid',pointInPixel)) {
      let index=myChart.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];
      selectX.index=index
      selectX.ts=allXaxis.value[index]
      if(!props.full){
        //改变放大full状态
        onTriggerFull(true)
      }else{
        getChartData()
      }
    }
  });

})
</script>
<template>
  <div class=" w-full h-full relative" :class="props.full?'':'mt-4'">
    <div v-if="full" class="absolute z-2  right-20 top-1 text-global-default text-opacity-35 text-kdFang text-kd12px16px">* {{I18n.liquidity.down.chartTipTwo}}</div>
    <div ref="echartsRef" :id="props.chartId" class="chartCanvas w-full h-full"></div>
  </div>
</template>
