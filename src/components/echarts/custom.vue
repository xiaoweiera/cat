<script setup lang="ts">
import { toRaw } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { tailwind } from '~/logic/echarts/colors'
import { compact } from '~/utils'
import { getInject, setInject } from '~/utils/use/state'
import { EchartsOptionName } from '~/logic/echarts/tool'
import { LegendItem, iconFontName } from '~/logic/echarts/interface'

/**
 * 获取 ref 对象中的数据，并去除空值
 * @param data ref
 */
const getValue = function(data: any) {
  const value = toRaw(data.value)
  return compact(value)
}

const series = getInject(EchartsOptionName.series)
const chartLegends = getInject(EchartsOptionName.legend)
const setChartLegends = setInject(EchartsOptionName.legend)

// 获取 legend 主题颜色
const getLegendTheme = function(item: any, index: number): string {
  if (item.show) {
    const data = getValue(series)
    const color = safeGet(data, `[${index}].itemStyle.color`)
    if (color) {
      const keys = Object.keys(tailwind)
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]
        // @ts-ignore
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
const onRemoveLegend = function(item: any) {
  const data = toRaw(item)
  console.log('remove : ', data)
  // emitEvent('removeLegend', data)
}
// 修改 legend 状态
const onChangeLegend = function(item: any, index: number) {
  const array = getValue(chartLegends)
  const temp = safeGet<LegendItem>(array, `${index}`)
  const data = Object.assign({}, temp, {
    show: !safeGet(temp, 'show')
  })
  setChartLegends(data, index)
}

</script>

<template>
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
  .item {
    padding-top: 3px; padding-bottom: 3px;
    width: fit-content;
    @apply block px-2.5 rounded-md border border-solid my-1.5 select-none;
    @screen md {
      @apply inline-block mr-1;
      &:last-child {
        @apply mr-0;
      }
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
