<script setup lang="ts">
import * as logicToolTip from '~/logic/echarts/tooltip'
import * as echarts from 'echarts'
import * as resize from '~/utils/event/resize'
import { compact, forEach, map, numberUint, uuid } from '~/utils/index'
import { ref, reactive, toRaw, defineProps, onMounted, onUnmounted } from 'vue'
import { EchartsOptionName, useProvide } from '~/logic/echarts/tool'
import { Position } from '~/logic/topic/item'
import { calcYAxis } from '~/logic/echarts/series'
import * as logicLegend from '~/logic/echarts/legend'

import {
  graphic,
  tooltips as makeTooltipOption,
  xAxis as makeXAxisOption,
  yAxisKline as makeYAxisOption
} from '~/lib/chartOption'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import { seriesType, LegendDirection } from '~/logic/echarts/interface'

const props = defineProps({
  log: {
    type: Boolean,
    default: () => false
  },
  stack: {
    type: Boolean,
    default: () => false
  },
  legend: {
    type: [String, Boolean],
    default(): string {
      return LegendDirection.bottom
    },
    validator (value: string | boolean): boolean {
      let status = false
      switch(value) {
        case LegendDirection.top:
        case LegendDirection.left:
        case LegendDirection.right:
        case LegendDirection.bottom:
          status = true
          break
      }
      if (value === false) {
        status = true
      }
      return status
    }
  }
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
    formatter: logicToolTip.formatter,
    textStyle: {
      // color: colors
    }
  })
}

const getLegendRow = function(): number {
  // @ts-ignore
  const echart = toRaw(echartsRef).value
  const list: any[] = getValue(legend)
  return logicLegend.clacLegendRows(list, echart)
}

const getLegend = function() {
  const data = map((item: any) => {
    if (item.show) {
      // @ts-ignore
      const code = logicLegend.source[item.type]
      // @ts-ignore
      const icon = `path://${code}`
      return {
        icon,
        name: item.value,
      }
    }
  }, getValue(legend))
  if (props.legend) {
    const option = { data: compact(data), itemWidth: 14, }
    if (props.legend === LegendDirection.top) {
      safeSet(option, 'top', 0)
    } else if (props.legend === LegendDirection.bottom) {
      safeSet(option, 'bottom', 0)
    } else if (props.legend === LegendDirection.left) {
      safeSet(option, 'left', 0)
      safeSet(option, 'top', 'auto')
      safeSet(option, 'orient', 'vertical')
    } else if (props.legend === LegendDirection.right) {
      safeSet(option, 'right', 0)
      safeSet(option, 'top', 'auto')
      safeSet(option, 'orient', 'vertical')
    }
    return option
  }
  // 隐藏
  return { show: false }
}

const getXAxis = function() {
  const [ option ] = makeXAxisOption()
  return map(function(item: any) {
    return Object.assign({}, option, item)
  }, getValue(xAxis))
}

const getYAxisData = function(position: Position) {
  const yAxisData = getValue(yAxis)
  for(let i = 0; i < yAxisData.length; i++) {
    const item: any = yAxisData[i]
    if (item?.position === position) {
      return item
    }
  }
}

// 计算 Y 轴刻度数据
const getYAxis = function(): any[] {
  const viewWidth = document.documentElement.clientWidth
  const legends = getValue(legend)
  const seriesList = getValue(series)
  const yaxis: any[] = []
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

  const app = function(data: any[], position: Position) {
    const value = calcYAxis(data, props.stack && position === Position.left, props.log)
    const yaxisData = getYAxisData(position)
    const [ option ] = makeYAxisOption(function(value: number) {
      const formatter = safeGet<any>(yaxisData, 'axisLabel.formatter')
      if (formatter) {
        return formatter(value)
      }
      return numberUint(value)
    })
    const temp = Object.assign({}, option, value, { position })
    const key = 'axisLabel.textStyle.color'
    const color = safeGet<string>(yaxisData, key)
    if (color) {
      safeSet(temp, key, color)
    }
    yaxis.push(temp)
  }

  if (leftData.length > 0) {
    app(leftData, Position.left)
  }
  if (rightData.length > 0) {
    app(rightData, Position.right)
  }
  if (viewWidth < 768) {
    return map(function(item: any) {
      safeSet(item, 'axisLabel.inside', true)
      return item
    }, yaxis)
  }
  return yaxis
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
    const option: any = Object.assign({
      name: data.value,
      type: data.type,
      connectNulls: true,
      yAxisIndex: data.index,
      label: {
        show: false,
      },
      symbol: 'none',
    }, item)
    if (data.type === seriesType.line) {
      // 线条平滑处理
      option.smooth = true;
      if (data.index !== 1) {
        option.areaStyle = {}
      }
    }
    if (data.type === seriesType.bar) {
      // 柱状图最大宽度
      option.barMaxWidth = 50
    }

    if (props.stack && data.position === Position.left) {
      // 开启堆积图
      option.stack = 'stack'
    }
    return option
  }, getValue(series))
}

const getGrid = function() {
  const row = getLegendRow()
  let height = 0
  if (row <= 1) {
    height = 35
  } else {
    height = row * 25
  }

  if (props.legend === LegendDirection.top) {
    return {
      top: height,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true,
    }
  } else if (props.legend === LegendDirection.bottom) {
    return {
      top: 15,
      left: 0,
      right: 0,
      bottom: height,
      containLabel: true,
    }
  } else if (props.legend === LegendDirection.left) {
    return {
      top: 15,
      right: 0,
      bottom: 0,
      containLabel: true,
    }
  } else if (props.legend === LegendDirection.right) {
    return {
      top: 15,
      left: 0,
      bottom: 0,
      containLabel: true,
    }
  }
  return {
    top: 15,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true,
  }
}

const getOption = function() {
  const data = {
    grid: getGrid(),
    graphic: graphic(30),
    tooltip: getToolTip(),
    legend: getLegend(),
    xAxis: getXAxis(),
    yAxis: getYAxis(),
    series: getSeries(),
    // color: colors
  }
  return data
}

const onResize = function() {
  const char: any = compChar.value
  char.resize({
    width: 'auto',
    height: 'auto',
    silent: true,
    animation: {
      duration: 0
    }
  })
  setTimeout(function() {
    char.setOption({
      grid: getGrid(),
    })
  })
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
