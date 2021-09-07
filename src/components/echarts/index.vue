<script setup lang="ts">
import { pick } from 'ramda'
import { onMounted, reactive, ref, toRaw, watch, onUnmounted } from 'vue'
import { compact, debounce, map, toBoolean, uuid } from '~/utils'
import { useProvide } from '~/utils/use/state'
import * as echarts from 'echarts'
import { EchartsOptionName } from '~/logic/echarts/tool'
import { Direction, XAxisItem, LegendDirection, LegendItem } from '~/logic/echarts/interface'
import * as config from '~/logic/echarts/config'
import * as logicToolTip from '~/logic/echarts/tooltip'
import * as resize from '~/utils/event/resize'
import safeSet from '@fengqiaogang/safe-set'

import { graphic, tooltips as makeTooltipOption, xAxis as makeXAxisOption } from '~/lib/chartOption'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'

const props = defineProps(config.getProps())

const compChar = reactive<any>({
  value: void 0,
})

const [ series ] = useProvide(EchartsOptionName.series)
const [ yAxis ] = useProvide(EchartsOptionName.yAxis)
const [ xAxis ] = useProvide(EchartsOptionName.xAxis)
const [ tooltip ] = useProvide(EchartsOptionName.tooltip)
const [ chartLegends, setChartLegends ] = useProvide(EchartsOptionName.legend)

/**
 * 获取 ref 对象中的数据，并去除空值
 * @param data ref
 */
const getValue = function<T>(data: any): T[] {
  const value = toRaw(data.value)
  return compact<T>(value)
}

const onChangeLegendsDisabled = function(name: string, disabled: boolean) {
  const list = getValue<LegendItem>(chartLegends)
  for(let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.value === name) {
      const index = item.index
      const data = { ...item, disabled: !disabled }
      setChartLegends(data, index)
      break
    }
  }
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
  const id = chartId.value
  return document.getElementById(`j-${id}`) as any
}

const getBasisOption = function() {
  const legend = getLegend()
  // @ts-ignore
  const gridOption = config.getGrid(props.legend, getChartDom(), legend.data)
  // 垂直方向
  if (Direction.vertical === props.direction) {
    safeSet(gridOption, 'left', '3%')
    safeSet(gridOption, 'right', 35)
  }
  return {
    graphic: graphic(30), // 背景
    grid: gridOption, // 容器配置
    backgroundColor: props.bgColor, // 背景颜色
  }
}

const getOption = function() {
  const yData = getYAxis()
  const opt = {
    legend: getLegend(), // 图例配置数据
    tooltip: getToolTip(),
    series: getSeries(yData), // series 数据
    ...getBasisOption()
  }
  // 垂直方向
  if (Direction.vertical === props.direction) {
    safeSet(opt, 'xAxis', yData)
    safeSet(opt, 'yAxis', getXAxis())
  } else {
    safeSet(opt, 'xAxis', getXAxis())
    safeSet(opt, 'yAxis', yData)
  }
  return opt
}

const getChar = function() {
  if (compChar.value) {
    return compChar.value
  }
  const dom = getChartDom()
  if (dom) {
    const char = echarts.init(dom)
    // 监听图例的开关
    char.on('legendselectchanged', function(data: object) {
      const name = safeGet<string>(data, 'name')
      if (name) {
        const status = toBoolean(safeGet<boolean>(data, `selected.${name}`))
        onChangeLegendsDisabled(name, status)
      }
    })
    compChar.value = char
    return char
  }
}

let onload = false

// 刷新 chart 数据
const sync = debounce<any>( function () {
  const char = getChar();
  if (char) {
    const option = getOption()
    char.setOption(option, {
      silent: true,
      // notMerge: true
      replaceMerge: ['series', 'legend', 'yAxis', 'xAxis']
    })
    onload = true
  }
}, 300)

const onResize = function() {
  if (onload) {
    const char = getChar();
    if (char) {
      char.resize({
        silent: true,
        animation: {
          duration: 0
        }
      })
      setTimeout(function() {
        char.setOption(getBasisOption(), {
          replaceMerge: 'grid'
        })
      })
    }
  }
}

onMounted(function() {
  const dom = getChartDom()
  if (dom) {
    setTimeout(sync)
    watch([series, chartLegends], function() {
      const char = getChar();
      if (char) {
        char.clear()
        compChar.value = null
        sync()
      }
    })
    resize.bind(chartId.value, onResize)
  }
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
          <div :class="customClass">
            <div class="h-full chart-box">
              <div class="chart-fit" :style="`background-color: ${bgColor}`" :id="`j-${chartId}`"></div>
            </div>
          </div>
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
      <div :class="customClass">
        <div class="h-full chart-box">
          <div class="chart-fit" :style="`background-color: ${bgColor}`" :id="`j-${chartId}`"></div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full h-full" :class="customClass">
      <div class="hidden">
        <slot></slot>
      </div>
      <div class="h-full chart-box">
        <div class="chart-fit" :style="`background-color: ${bgColor}`" :id="`j-${chartId}`"></div>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.chart-box {
  @apply relative;
  .chart-fit {
    @apply absolute left-0 right-0 top-0 bottom-0;
  }
}
</style>
