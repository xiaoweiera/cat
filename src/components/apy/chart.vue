<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, ref, onMounted, watch, reactive, onUnmounted} from 'vue'
import {getXY_data, getSerise, getModel, yLabelFormat, getChartTag} from '~/logic/apy/formatChart'
import {chartOption} from '~/lib/chartOption'

const props = defineProps({
  id: {type: String},
  chartData: {type: Object},
  tableIndex: {type: Number},
  chartIndex: {type: Number}
})
const xData = ref([])
const serise = ref([])
const tags = reactive({platforms: [], selected: ''})
let myChart: any = null
//画图
const draw = () => {
  const opts = chartOption(
      xData.value,
      getModel,
      serise.value,
      yLabelFormat
  );
  myChart.setOption(opts);
}
onMounted(() => {
  //@ts-ignore
  myChart = echarts.init(document.getElementById(props.id), "light");
  window.addEventListener("resize", myChart.resize);
})
onUnmounted(() => {
  window.removeEventListener('resize', myChart.resize)
})
const reRenderChart = (newVal: string) => {
  //@ts-ignore  props.chartData.option  接口返回过来的数据
  const {x_data, y_data} = getXY_data(props.chartData.option, props.tableIndex, props.chartIndex, newVal)
  xData.value = x_data
  serise.value = getSerise(y_data)
}
watch(() => props.chartData?.option, async () => {
  //@ts-ignore
  tags.platforms = getChartTag(props.chartData.option, props.tableIndex, props.chartIndex).value
  tags.selected = tags.platforms.length > 0 ? tags.platforms[0] : ''
  reRenderChart(tags.selected)
  draw()
})
watch(() => tags.selected, (newVal) => {
  reRenderChart(newVal)
  draw()
})
</script>
<template>
  <div class="mt-5 relative">
    <ApyDes :tableIndex="props.tableIndex" :chartIndex="props.chartIndex" :selected="tags.selected "/>
    <!--          平台列表-->
    <ApyPlat :chartIndex="chartIndex" :tags="tags"/>
    <!--          图表-->
    <div class="mt-1.5 md:mt-3 font-kdFang relative ">
      <div class=" h-35 w-full  h-full" :id="props.id">
      </div>

    </div>
    <div v-if="chartIndex>0" class="xshidden absolute border-1 h-full top-0  -left-6 "></div>
  </div>
</template>
