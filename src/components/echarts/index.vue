<script setup lang="ts">
import { includes } from 'ramda'
import * as echarts from 'echarts'
import { compact, map } from '~/utils/index'
import { ref, reactive, computed, toRaw, onMounted } from 'vue'
import { EchartsOptionName, useProvide } from '~/logic/echarts/tool'
import {
  grid,
  graphic,
  tooltips as makeTooltipOption,
  xAxis as makeXAxisOption,
  yAxisKline as makeYAxisOption
} from '~/lib/chartOption'


const echartsRef = ref<any>(null)
const compChar = reactive<any>({
  value: void 0,
})

const [ series ] = useProvide(EchartsOptionName.series)
const [ yAxis ] = useProvide(EchartsOptionName.yAxis)
const [ xAxis ] = useProvide(EchartsOptionName.xAxis)
const [ legend ] = useProvide(EchartsOptionName.legend)
const [ tooltip ] = useProvide(EchartsOptionName.tooltip)


/**
 * 获取 ref 对象中的数据，并去除空值
 * @param data ref
 */
const getValue = function(data: any) {
  const value = toRaw(data.value)
  return compact(value)
}

const getToolTip = function() {
  const array = getValue(tooltip)
  const option = makeTooltipOption()
  return Object.assign({}, option, array[0])
}

const getLegend = function() {
  const array = getValue(legend)
  const data = map((item: any) => {
    if (item.show) {
      return item.value
    }
  }, array)
  return { data: compact(data), bottom: 0 }
}

const getXAxis = function() {
  const [ option ] = makeXAxisOption()
  return map(function(item) {
    return Object.assign({}, option, item)
  }, getValue(xAxis))
}

const getYAxis = function() {
  const [ option ] = makeYAxisOption()
  return map(function(item) {
    return Object.assign({}, option, item)
  }, getValue(yAxis))
}

const getYindex = function(yaxis: any[]) {
  return function(value: string): number {
    let index: number = 0
    for(let i = 0, len = yaxis.length; i < len; i++) {
      const item = yaxis[i]
      if (item.position === 'left') {
        index = i
      }
      const list = compact(toRaw(item.legend))
      const status = includes(value, list)
      if (status) {
        index = i
        break
      }
    }
    return index
  }
}

const getSeries = function() {
  const result: any[] = getValue(series)
  const app = getYindex(getYAxis())
  // @ts-ignore
  return map((item: any, index: number) => {
    return {
      name: item.value,
      type: item.type,
      connectNulls: true,
      yAxisIndex: app(item.value),
      data: compact(result[index]),
    }
  }, getValue(legend))
}


const getOption = function() {
  return {
    grid: Object.assign({}, grid(), {
      top: 15,
      left: 15,
      bottom: 35,
    }),
    graphic: graphic(30),
    legend: getLegend(),
    xAxis: getXAxis(),
    yAxis: getYAxis(),
    series: getSeries(),
    tooltip: getToolTip(),
  }
}

// @ts-ignore
const echartOption = computed(getOption)

onMounted(function() {
  const echart = toRaw(echartsRef).value
  const char = echarts.init(echart);
  compChar.value = char
  try {
    const option = getOption()
    console.log(option)
    char.setOption(option)
  } catch (e) {
    console.log(e)
  }
})


</script>

<template>
  <div class="w-full h-full">
    <div class="hidden">
      <slot></slot>
    </div>
    <div class="relative w-full h-full" ref="echartsRef">
    </div>
  </div>
</template>
