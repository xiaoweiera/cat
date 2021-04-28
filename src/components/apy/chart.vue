<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, ref, onMounted, watch, reactive, onUnmounted} from 'vue'
import {getXY_data, getSerise, getModel, yLabelFormat, getPlat,getUnit} from '~/logic/apy/formatChart'
import {chartOption} from '~/lib/chartOption'

const props = defineProps({
  id: {type: String},
  chartData: {type: Object},
  tableIndex: {type: Number},
  chartIndex: {type: Number},
  chainId:{type:String},

})
const unit=ref('')
const xChartData = ref([])
const serise = ref([])
const tags = reactive({platforms: [], selected: ''})
let myChart: any = null
let minY=0
let maxY=0
const isChangeChain=ref(true)
//画图
const draw = () => {
  myChart.setOption(chartOption(
      xChartData.value,
      getModel,
      serise.value,
      yLabelFormat,
      minY,
      maxY,
      unit.value
  ), true);
}

onMounted(() => {
  //@ts-ignore
  myChart = echarts.init(document.getElementById(props.id), "light");
  window.addEventListener("resize", myChart.resize);
})
onUnmounted(() => window.removeEventListener('resize', myChart.resize))
const reRenderChart = (newVal: string) => {
  //@ts-ignore  props.chartData.option  接口返回过来的数据
  const {xData, yData,min,max} = getXY_data(props.chartData.option, props.tableIndex, props.chartIndex, newVal)
  //@ts-ignore
   unit.value =getUnit(props.tableIndex, props.chartIndex,newVal)
  xChartData.value = xData
  minY=min
  maxY=max
  serise.value = getSerise(yData)
  draw()
}
watch(()=>props.chainId,()=>isChangeChain.value=true)
watch(() => props.chartData?.option, (newOptions, oldOptions) => {
  //@ts-ignore
  if (!newOptions?.data) {
    return
  }
  //@ts-ignore
  tags.platforms = getPlat(newOptions, props.tableIndex, props.chartIndex)
  if (!oldOptions?.data || isChangeChain.value) {
    tags.selected = tags.platforms.length > 0 ? tags.platforms[0] : ''
  }
  isChangeChain.value=false
  reRenderChart(tags.selected)
})
watch(() => tags.selected, (newVal) => reRenderChart(newVal))
</script>
<template>
  <div class="mt-5 relative">
    <ApyDes :title="props.chartData.title"  :tableIndex="props.tableIndex" :chartIndex="props.chartIndex"
            :selected="tags.selected "/>
    <!--          平台列表-->
    <ApyPlat   :chartData="chartData" :chartIndex="chartIndex" :tags="tags"/>
    <!--          图表-->
    <div class="mt-1.5 md:mt-3 font-kdFang relative ">
      <div class=" h-35 w-full  h-full" :id="props.id">
      </div>
    </div>
    <div v-if="chartIndex>0" class="xshidden absolute border-1 h-full top-0  -left-6 "></div>
  </div>
</template>
