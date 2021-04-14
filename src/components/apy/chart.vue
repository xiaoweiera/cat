<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
const draw=()=>{
  let myChartDom = document.getElementById('chart');
  let myChart = echarts.init(myChartDom, "light");
  let chartOptionObj = {
    title: {
      text: '折线图堆叠'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      height:'1%',
      bottom:'0',
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎','搜索引擎2','搜索引擎3','搜索引擎4','搜索引擎5','搜索引擎6']
    },
    grid: {
      height:'60%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
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
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎6',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },      {
        name: '搜索引擎5',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },      {
        name: '搜索引擎4',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },      {
        name: '搜索引擎3',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },      {
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
onMounted(async ()=>{
  draw();
})
</script>
<template>
  <div class="w-92 h-35.5">
    <div class="w-full h-full border-1 mt-10 " id="chart">

    </div>
  </div>
</template>