<script setup lang="ts">
import * as echarts from 'echarts'
import {defineProps, ref, onMounted} from 'vue'
import {ElSwitch} from 'element-plus'

const props = defineProps({
  id: {
    type: String,
  },
  line: {type: String},
  chartType:{type:String}
})


const draw = () => {
  let myChartDom = document.getElementById(props.id);
  let myChart = echarts.init(myChartDom, "light");
  let chartOptionObj = {
    tooltip: {
      trigger: 'axis'
    },

    grid: {
      bottom: 0,
      left: 0,
      right: 15,
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '搜索引擎6',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }, {
        name: '搜索引擎5',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }, {
        name: '搜索引擎4',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }, {
        name: '搜索引擎3',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }, {
        name: '搜索引擎2',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  myChart.setOption(chartOptionObj);
  window.addEventListener("resize", myChart.resize);
}
onMounted(async () => {
  draw();
})
</script>
<template>
  <div class="mt-1.5 md:mt-3 font-kdFang relative ">
    <div class=" h-35 w-full  h-full" :id="id">
    </div>
  </div>
</template>