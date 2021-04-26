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
  chartIndex: {type: Number},
  timer: {type: Object}
})
const xData = ref([])
const serise = ref([])
const tagList = reactive({platforms: [], selected: ''})

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

const initChart = (newVal: string) => {
  //@ts-ignore
  const {x_data, y_data} = getXY_data(props.chartData.option, props.tableIndex, props.chartIndex, newVal)
  xData.value = x_data.value
  serise.value = getSerise(y_data.value)
}

watch(() => props.chartData?.option, async () => {
  //@ts-ignore
  tagList.platforms = getChartTag(props.chartData.option, props.tableIndex, props.chartIndex).value
  tagList.selected = tagList.platforms.length > 0 ? tagList.platforms[0] : ''
  initChart(tagList.selected)
  draw()
})

watch(() => tagList.selected, (newVal) => {
  initChart(newVal)
  draw()
})
</script>
<template>
  <div class="mt-5 relative">
    <ApyDes :tableIndex="props.tableIndex" :chartIndex="props.chartIndex" :selected="tagList.selected "/>
    <!--          平台列表-->
    <ApyPlat :chartIndex="chartIndex" :tagList="tagList"/>
    <!--          图表-->
    <div class="mt-1.5 md:mt-3 font-kdFang relative ">
      <div class=" h-35 w-full  h-full" :id="props.id">
      </div>

    </div>
    <div v-if="chartIndex>0" class="xshidden absolute border-1 h-full top-0  -left-6 "></div>
  </div>
</template>
