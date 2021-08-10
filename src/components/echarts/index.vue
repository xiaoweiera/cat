<script setup lang="ts">
import * as logicToolTip from '~/logic/echarts/tooltip'
import * as echarts from 'echarts'
import * as resize from '~/utils/event/resize'
import { compact, forEach, map, numberUint, toBoolean, toNumber, uuid } from '~/utils/index'
import { defineProps, onMounted, onUnmounted, reactive, ref, toRaw } from 'vue'
import { EchartsOptionName, useProvide } from '~/logic/echarts/tool'
import { Position } from '~/logic/echarts/interface'
import { calcYAxis } from '~/logic/echarts/series'
import * as logicLegend from '~/logic/echarts/legend'

import {
  graphic,
  tooltips as makeTooltipOption,
  xAxis as makeXAxisOption,
  yAxisKline as makeYAxisOption,
} from '~/lib/chartOption'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import { viewWidth } from '~/utils/event/scroll'
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
  },
  rightColor: {
    type: String,
    default: () => '#F88923'
  },
  leftColor: {
    type: String,
    default: () => '#2B8DFE'
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
      const { itemStyle } = item
      const opt = { icon, name: item.value}
      if (itemStyle) {
        Object.assign(opt, { itemStyle })
      }
      if (item.position === Position.right) {
        safeSet(opt, 'itemStyle.color', props.rightColor)
      }
      return opt
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
      if (props.log) {
        if (value === 0) {
          return 0
        }
        return numberUint(Math.pow(10, value))
      }
      return numberUint(value)
    })
    return Object.assign({}, option, value, { position })
  }

  const colorKey = 'axisLabel.textStyle.color'
  if (leftData.length > 0) {
    const opt = app(leftData, Position.left)
    safeSet(opt, colorKey, props.leftColor)
    yaxis.push(opt)
  }
  if (rightData.length > 0) {
    const opt = app(rightData, Position.right)
    safeSet(opt, colorKey, props.rightColor)
    yaxis.push(opt)
  }
  if (viewWidth() < 768) {
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
  const seriesList = map((item: any, index: number) => {
    const data = app(index)
    if (!toBoolean(data.show)) {
      return void 0
    }
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
      if (data.index === 1) {
        // 右侧价格线删除渐变色
        safeSet(option, 'areaStyle', null)
      }
      safeSet(option, 'itemStyle.borderWidth', 1)
    } else {
      // 取消阴影部分设置
      safeSet(option, 'areaStyle', null)
    }
    // 右侧价格线使用指定颜色
    if (data.index === 1) {
      safeSet(option, 'itemStyle.color', props.rightColor)
    }
    if (data.type === seriesType.bar) {
      // 柱状图最大宽度
      option.barMaxWidth = 50
      const color = safeGet(option, 'itemStyle.color')
      if (color) {
        safeSet(option, 'itemStyle.color', function(d: any) {
          // 负数时强制设置为红色
          if (d.value < 0) {
            return 'rgba(255, 140, 128, 1)'
          }
          return color
        })
      }
    }
    if (props.stack && data.position === Position.left) {
      // 开启堆积图
      option.stack = 'stack'
    }
    if (props.log) {
      option.data = map(function(item: any) {
        const value: number = item.value
        if (value || value === 0) {
          // @ts-ignore
          let num: number
          const origin = value
          if (value > 0) {
            num = Math.log10(value)
          } else {
            num = Math.abs(toNumber(value))
            num = Math.log10(num) * -1
          }
          return Object.assign({}, item, { value: num, origin })
        }
        return item
      }, option.data)
    }
    return option
  }, getValue(series))
  return compact(seriesList)
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
    backgroundColor: '#fff',
  }
  console.log(data)
  return data
}

const onResize = function() {
  const char: any = compChar.value
  char.resize({
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
  try {
    const option = getOption()
    setTimeout(function() {
      const char = echarts.init(echart);
      compChar.value = char
      char.setOption(option)
    })
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
    <div class="w-full h-full" ref="echartsRef">
    </div>
  </div>
</template>
