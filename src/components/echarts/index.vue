<script setup lang="ts">
import { pick } from 'ramda'
import * as logicToolTip from '~/logic/echarts/tooltip'
import * as echarts from 'echarts'
import * as resize from '~/utils/event/resize'
import { compact, forEach, map, numberUint, toBoolean, toNumber, uuid } from '~/utils/index'
import { defineEmit, defineProps, onMounted, onUnmounted, reactive, ref, toRaw } from 'vue'
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
import { tailwind } from '~/logic/echarts/colors'
import { seriesType, LegendDirection, Direction, iconFontName } from '~/logic/echarts/interface'

const emitEvent = defineEmit(['removeLegend'])

const props = defineProps({
  // 是否开启log效果
  log: {
    type: Boolean,
    default: () => false
  },
  // 是否开启堆积
  stack: {
    type: Boolean,
    default: () => false
  },
  // 图形位置
  direction: {
    type: String,
    default: () => Direction.horizontal,
    validator: (value: string) => {
      return value === Direction.horizontal || value === Direction.vertical;
    }
  },
  // 图列位置及是否显示
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
        case LegendDirection.custom:
          status = true
          break
      }
      if (value === false) {
        status = true
      }
      return status
    }
  },
  // 右侧刻度颜色
  rightColor: {
    type: String,
    default: () => '#F88923'
  },
  // 左侧刻度颜色
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

/**
 * 获取 ref 对象中的数据，并去除空值
 * @param data ref
 */
const getValue = function(data: any) {
  const value = toRaw(data.value)
  return compact(value)
}

const [ series ] = useProvide(EchartsOptionName.series)
const [ yAxis ] = useProvide(EchartsOptionName.yAxis)
const [ xAxis ] = useProvide(EchartsOptionName.xAxis)
const [ chartLegends, setChartLegends ] = useProvide(EchartsOptionName.legend)
const [ tooltip ] = useProvide(EchartsOptionName.tooltip)

// 获取 legend 主题颜色
// @ts-ignore
const getLegendTheme = function(item: any, index: number): string {
  if (item.show) {
    const data = getValue(series)
    const color = safeGet(data, `[${index}].itemStyle.color`)
    if (color) {
      const keys = Object.keys(tailwind)
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]
        const value = tailwind[key]
        if (value === color) {
          return key
        }
      }
    }
    return `chat${index}`
  }
  return 'disabled'
}

// 删除 legend
// @ts-ignore
const onRemoveLegend = function(item: any) {
  const data = toRaw(item)
  emitEvent('removeLegend', data)
}
// 修改 legend 状态
// @ts-ignore
const onChangeLegend = function(item: any, index: number) {
  const array = getValue(chartLegends)
  const temp = safeGet(array, `${index}`)
  const data = Object.assign({}, temp, {
    show: !safeGet(temp, 'show')
  })
  setChartLegends(data, index)
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
  const list: any[] = getValue(chartLegends)
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
  }, getValue(chartLegends))
  if (props.legend && props.legend !== LegendDirection.custom) {
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
    const opt = Object.assign({}, option, item)
    if (props.direction === Direction.vertical) {
      return pick(['type', 'data', 'axisTick', 'axisLine'], opt)
    }
    return opt
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
  const legends = getValue(chartLegends)
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
  const list: any[] = getValue(chartLegends)
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
      left: 6,
      bottom: 6,
      containLabel: true,
    }
  } else if (props.legend === LegendDirection.custom) {
    return {
      top: 6,
      left: 15,
      right: 15,
      bottom: 6,
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
  const gridOpt = getGrid()
  let xAxisOpt
  let yAxisOpt
  // 垂直方向
  if (Direction.vertical === props.direction) {
    safeSet(gridOpt, 'left', '3%')
    safeSet(gridOpt, 'right', 15)
    xAxisOpt = getYAxis()
    yAxisOpt = getXAxis()
  } else {
    xAxisOpt = getXAxis()
    yAxisOpt = getYAxis()
  }

  const data = {
    grid: gridOpt,
    graphic: graphic(30),
    tooltip: getToolTip(),
    legend: getLegend(),
    xAxis: xAxisOpt,
    yAxis: yAxisOpt,
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
    console.log(option)
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
    <template v-if="legend === LegendDirection.custom">
      <el-container class="h-full">
        <el-header height="initial" class="p-0">
          <div class="custom-legend text-kdFang pt-3">
            <template v-for="(item, index) in chartLegends" :key="`${item.value}-${index}`">
              <div class="item cursor-pointer" :class="getLegendTheme(item, index)" @click="onChangeLegend(item, index)">
                <div class="flex items-center">
                  <IconFont class="flex mr-1" :type="iconFontName[item.type]" size="base"></IconFont>
                  <span class="text-xs font-medium">{{ item.value }}</span>
                  <span class="inline-block ml-1">
                  <IconFont class="flex" type="icon-x" size="xs" @click.stop.prevent="onRemoveLegend(item)"></IconFont>
                </span>
                </div>
              </div>
            </template>
          </div>
        </el-header>
        <el-main class="p-0">
          <div class="w-full h-full" ref="echartsRef"></div>
        </el-main>
      </el-container>
    </template>
    <template v-else>
      <div class="w-full h-full" ref="echartsRef"></div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@mixin theme($name) {
  &.#{$name} {
    @apply bg-global-#{$name} bg-opacity-12;
    @apply border-global-#{$name} border-opacity-12;
    @apply text-global-#{$name};
  }
}
.custom-legend {
  .item {
    padding-top: 3px; padding-bottom: 3px;
    @apply inline-block px-2.5 rounded-md border border-solid mr-1 my-3 select-none;
    &:last-child {
      @apply mr-0;
    }
    @for $index from 0 through 10 {
      $name: "chat#{$index}";
      @include theme(unquote($name));
    }
    &.disabled {
      @include theme(unquote("disabled"));
    }
  }
}
</style>
