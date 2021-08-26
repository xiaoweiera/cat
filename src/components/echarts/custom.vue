<script setup lang="ts">
import { toRaw } from 'vue'
import { toBoolean } from '~/utils'
import { colorHexToRGBA } from '~/lib/tool'
import safeGet from '@fengqiaogang/safe-get'
import { getInject, setInject } from '~/utils/use/state'
import { EchartsOptionName } from '~/logic/echarts/tool'
import { LegendItem, iconFontName } from '~/logic/echarts/interface'

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
  const index = item.index
  const data = { ...item, hidden: true} // 隐藏
  setChartLegends(data, index)
}
// 修改 legend 状态
const onChangeLegend = function(item: LegendItem) {
  const index = item.index
  const show = toBoolean(safeGet(item, 'show'))
  const data = { ...item, show: !show}
  setChartLegends(data, index)
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
      <div v-if="item" class="legend-box" :class="{'hidden': item.hidden}" :style="makeCss(item)">
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
    &:not(.hidden) {
      @screen md {
        @apply inline-block mr-1;
        &:last-child {
          @apply mr-0;
        }
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
