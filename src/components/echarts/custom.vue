<script setup lang="ts">
import { toRaw } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { tailwind } from '~/logic/echarts/colors'
import { compact, toBoolean } from '~/utils'
import { getInject, setInject } from '~/utils/use/state'
import { EchartsOptionName } from '~/logic/echarts/tool'
import { LegendItem, iconFontName } from '~/logic/echarts/interface'

/**
 * 获取 ref 对象中的数据，并去除空值
 * @param data ref
 */
const getValue = function<T>(data: any): T[] {
  const value = toRaw(data.value)
  return compact(value)
}

const series = getInject(EchartsOptionName.series)
const chartLegends = getInject(EchartsOptionName.legend)
const setChartLegends = setInject(EchartsOptionName.legend)

// 获取 legend 主题颜色
const getLegendTheme = function(item: any): string | undefined {
  if (item.show) {
    return void 0
  }
  return 'disabled'
}


// 删除 legend
const onRemoveLegend = function(item: any) {
  const data = toRaw(item)
  console.log('remove : ', data)
  // emitEvent('removeLegend', data)
}
// 修改 legend 状态
const onChangeLegend = function(item: LegendItem) {
  const index = item.index
  const show = toBoolean(safeGet(item, 'show'))
  const data = { ...item, show: !show}
  setChartLegends(data, index)
}

function colorHexToRGBA(sHex: string, alpha: number = 1) {
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  } else {
    return sColor
  }
}

const makeCss = function(item: LegendItem) {
  const color = item.itemStyle ? item.itemStyle.color : ''
  const data = [
    `--custom-style-bg: ${colorHexToRGBA(color, 0.12)};`,
    `--custom-style-border: ${colorHexToRGBA(color, 0.12)};`,
    `--custom-style-text: ${colorHexToRGBA(color)};`
  ]
  return data.join('')
}

</script>

<template>
  <div class="custom-legend text-kdFang pt-3">
    <template v-for="(item, index) in chartLegends" :key="`${item.value}-${index}`">
      <div class="legend-box" :style="makeCss(item)">
        <div class="item cursor-pointer" :class="getLegendTheme(item)" @click="onChangeLegend(item)">
          <div class="flex items-center">
            <IconFont class="flex mr-1" :type="iconFontName[item.type]" size="base"></IconFont>
            <span class="text-xs font-medium">{{ item.value }}</span>
            <span class="inline-block ml-1">
            <IconFont class="flex" type="icon-x" size="xs" @click.stop.prevent="onRemoveLegend(item)"></IconFont>
          </span>
          </div>
        </div>
      </div>
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
  @apply py-1.5;
  .legend-box {
    @apply block;
    @screen md {
      @apply inline-block mr-1;
      &:last-child {
        @apply mr-0;
      }
    }
  }
  .item {
    width: fit-content;
    padding-top: 3px; padding-bottom: 3px;
    transition: all 0.3s;
    @apply block px-2.5 rounded-md border border-solid my-1.5 select-none;
    &:not(.disabled) {
      background-color: var(--custom-style-bg);
      border-color: var(--custom-style-border);
      color: var(--custom-style-text);
    }
    &.disabled {
      @include theme(unquote("disabled"));
    }
  }
}
</style>
