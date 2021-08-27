<script setup lang="ts">
import { pick } from 'ramda'
import { onMounted, reactive, ref, toRaw, watch, onUnmounted } from 'vue'
import { compact, debounce, map, uuid } from '~/utils'
import { useProvide } from '~/utils/use/state'
import * as echarts from 'echarts'
import { EchartsOptionName } from '~/logic/echarts/tool'
import { Direction, XAxisItem, LegendDirection, LegendItem } from '~/logic/echarts/interface'
import * as config from '~/logic/echarts/config'
import * as logicToolTip from '~/logic/echarts/tooltip'
import * as resize from '~/utils/event/resize'
import safeSet from '@fengqiaogang/safe-set'

import { graphic, tooltips as makeTooltipOption, xAxis as makeXAxisOption } from '~/lib/chartOption'

const props = defineProps(config.getProps())

const echartsRef = ref<any>(null)
const compChar = reactive<any>({
  value: void 0,
})

const [ series ] = useProvide(EchartsOptionName.series)
const [ yAxis ] = useProvide(EchartsOptionName.yAxis)
const [ xAxis ] = useProvide(EchartsOptionName.xAxis)
const [ tooltip ] = useProvide(EchartsOptionName.tooltip)
const [ chartLegends ] = useProvide(EchartsOptionName.legend)

/**
 * 获取 ref 对象中的数据，并去除空值
 * @param data ref
 */
const getValue = function<T>(data: any): T[] {
  const value = toRaw(data.value)
  return compact<T>(value)
}

const chartId = ref<string>(uuid())

// hover 提示配置信息
const getToolTip = function() {
  const [tips] = getValue<any>(tooltip)
  const option = makeTooltipOption()
  const callback = function(data: any) {
    return logicToolTip.formatter(data, tips.formatter)
  }
  return Object.assign({}, option, tips, {
    formatter: callback,
  })
}

// 获取 X 轴配置数据
const getXAxis = function() {
  const [ option ] = makeXAxisOption()
  const list = getValue<XAxisItem>(xAxis)
  return map(function(item: any) {
    const opt = { ...option, ...item }
    // 判断是否是横向展示
    if (props.direction === Direction.vertical) {
      return pick(['type', 'data', 'axisTick', 'axisLine'], opt)
    }
    return opt
  }, list)
}

// 获取 Y 轴配置数据
const getYAxis = function() {
  const legends = getValue<LegendItem>(chartLegends)
  const seriesList = getValue<any>(series)
  const yAxisData = getValue<any>(yAxis)
  return config.getYAxis(yAxisData, legends, seriesList, props)
}

// 图列配置数据
const getLegend = function() {
  if (!props.legend || props.legend === LegendDirection.custom) {
    // 隐藏
    return { show: false }
  }
  const list = getValue<LegendItem>(chartLegends)
  const yAxisData = getValue<any>(yAxis)
  return config.getLegend(list, yAxisData, props)
}

// 获取 series 数据
const getSeries = function(yAxisOption: any[]) {
  const list = getValue<any>(series)
  const legends = getValue<LegendItem>(chartLegends)
  return config.getSeries(legends, list, yAxisOption, props)
}

const getChartDom = function(): HTMLCanvasElement {
  return toRaw(echartsRef).value
}

const getBasisOption = function() {
  const legend = getLegend()
  // @ts-ignore
  const gridOption = config.getGrid(props.legend, getChartDom(), legend)
  // 垂直方向
  if (Direction.vertical === props.direction) {
    safeSet(gridOption, 'left', '3%')
    safeSet(gridOption, 'right', 15)
  }
  return {
    graphic: graphic(30), // 背景
    grid: gridOption, // 容器配置
    backgroundColor: props.bgColor, // 背景颜色
  }
}

const getOption = function() {
  let xAxisOpt: any
  let yAxisOpt: any
  // 垂直方向
  if (Direction.vertical === props.direction) {
    xAxisOpt = getYAxis()
    yAxisOpt = getXAxis()
  } else {
    xAxisOpt = getXAxis()
    yAxisOpt = getYAxis()
  }
  return {
    legend: getLegend(), // 图例配置数据
    xAxis: xAxisOpt, // X 轴配置数据
    yAxis: yAxisOpt, // Y 轴配置数据
    tooltip: getToolTip(),
    series: getSeries(getYAxis()), // series 数据
    ...getBasisOption()
  }
}

// 刷新 chart 数据
const sync = debounce(async () => {
  try {
    if (compChar.value) {
      const char = compChar.value
      const option = getOption()
      char.clear()
      char.setOption(option, {
        notMerge: true,
        lazyUpdate: true,
        silent: true,
      })
    } else {
      const dom = getChartDom()
      const char = echarts.init(dom);
      compChar.value = char
      const option = getOption()
      char.setOption(option)
    }
  } catch (e) {
    console.log(e)
  }
}, 200)

const onResize = function() {
  const char: any = compChar.value
  if (char) {
    char.resize({
      silent: true,
      animation: {
        duration: 0
      }
    })
    setTimeout(function() {
      const legend = getLegend()
      const gridOption = config.getGrid(props.legend, getChartDom(), legend)
      char.setOption({
        grid: gridOption,
      })
    })
  }
}



onMounted(function() {
  sync()
  watch([series, chartLegends], sync)
  resize.bind(chartId.value, onResize)
})

onUnmounted(function() {
  resize.unbind(chartId.value)
})

</script>

<template>
  <!-- 自定义图例且未设置图表高度 -->
  <template v-if="legend === LegendDirection.custom && customClass === 'h-full'">
    <div class="w-full h-full">
      <div class="hidden">
        <slot></slot>
      </div>
      <el-container class="h-full">
        <el-header height="initial" class="p-0">
          <!-- 自定义图例 -->
          <EchartsCustom/>
        </el-header>
        <el-main class="p-0">
          <div :class="customClass" ref="echartsRef"></div>
        </el-main>
      </el-container>
    </div>
  </template>
  <!--自定义模式-->
  <template v-else-if="legend === LegendDirection.custom">
    <div class="w-full">
      <div class="hidden">
        <slot></slot>
      </div>
      <!-- 自定义图例 -->
      <EchartsCustom/>
      <div :class="customClass" ref="echartsRef"></div>
    </div>
  </template>
  <template v-else>
    <div class="w-full h-full" :class="customClass">
      <div class="hidden">
        <slot></slot>
      </div>
      <div class="h-full" ref="echartsRef"></div>
    </div>
  </template>
</template>
