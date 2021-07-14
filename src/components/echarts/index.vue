<script setup lang="ts">
import * as logicToolTip from '~/logic/echarts/tooltip'
import * as echarts from 'echarts'
import * as resize from '~/utils/event/resize'
import { compact, forEach, map, numberUint, uuid } from '~/utils/index'
import { ref, reactive, computed, toRaw, defineProps, onMounted, onUnmounted } from 'vue'
import { EchartsOptionName, useProvide } from '~/logic/echarts/tool'
import { Position } from '~/logic/topic/item'
import { calcYAxis } from '~/logic/echarts/series'
import * as logicLegend from '~/logic/echarts/legend'

import {
  grid,
  graphic,
  tooltips as makeTooltipOption,
  xAxis as makeXAxisOption,
  yAxisKline as makeYAxisOption
} from '~/lib/chartOption'
import safeGet from '@fengqiaogang/safe-get'

const props = defineProps({
  stack: {
    type: Boolean,
    default () {
      return false
    }
  },
})

const echartId = ref<string>(uuid())

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
  return Object.assign({}, option, array[0], {
    formatter: logicToolTip.formatter
  })
}

const getLegend = function() {
  const data = map((item: any) => {
    if (item.show) {
      const icon = `path://${logicLegend.source[item.type]}`
      return {
        icon,
        name: item.value,
      }
    }
  }, getValue(legend))
  return { data: compact(data), bottom: 0, itemWidth: 14, }
}

const getXAxis = function() {
  const [ option ] = makeXAxisOption()
  return map(function(item: any) {
    return Object.assign({}, option, item)
  }, getValue(xAxis))
}

// 计算 Y 轴刻度数据
const getYAxis = function(): any[] {
  const [ option ] = makeYAxisOption(function(value: number) {
    return numberUint(value)
  })

  const legends = getValue(legend)
  const seriesList = getValue(series)
  const yAxis = []

  const leftData: any[] = []
  const rightData: any[] = []
  forEach(function(item: any, index: number) {
    const value = safeGet<any[]>(seriesList, `[${index}].data`)
    if (item.position === Position.right) {
      rightData.push(value)
    } else {
      leftData.push(value)
    }
  }, legends)

  if (leftData.length > 0) {
    const value = calcYAxis(leftData, props.stack)
    yAxis.push(Object.assign({}, option, value, {
      position: Position.left
    }))
  }
  if (rightData.length > 0) {
    const value = calcYAxis(rightData, props.stack)
    yAxis.push(Object.assign({}, option, value, {
      position: Position.right
    }))
  }
  return yAxis
}

const getYindex = function(): any {
  const list: any[] = getValue(legend)
  return function(i: number): number {
    const item = list[i]
    let index = 0
    if (item.position === Position.right) {
      index = 1
    }
    return Object.assign({ index }, item)
  }
}

const getSeries = function() {
  const app = getYindex()
  return map((item: any, index: number) => {
    const data = app(index)
    const option = Object.assign({
      name: data.value,
      type: data.type,
      connectNulls: true,
      yAxisIndex: data.index,
      label: {
        show: false,
      },
      symbol: 'none',
    }, item)
    if (props.stack && data.position === Position.left) {
      // 开启堆积图
      option.stack = 'stack'
    }
    return option
  }, getValue(series))
}


const getOption = function() {
  const data = {
    grid: Object.assign({}, grid(), {
      top: 15,
      left: 0,
      right: 0,
      bottom: 55,
      containLabel: true,
    }),
    graphic: graphic(30),
    tooltip: getToolTip(),
    legend: getLegend(),
    xAxis: getXAxis(),
    yAxis: getYAxis(),
    series: getSeries(),
  }

  return data
}

// @ts-ignore
const echartOption = computed(getOption)

const onResize = function() {
  const char: any = compChar.value
  char.resize()
}


onMounted(function() {
  const echart = toRaw(echartsRef).value
  const char = echarts.init(echart);
  compChar.value = char
  try {
    const option = getOption()
    char.setOption(option)
  } catch (e) {
    console.log(e)
  }
  finally {
    resize.bind(echartId.value, onResize)
  }
})

onUnmounted(function() {
  resize.unbind(echartId.value)
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
