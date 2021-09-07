<script setup lang="ts">
/**
 * @file series 数据
 * @author svon.me@gmail.com
 */
import safeSet from '@fengqiaogang/safe-set'
import { onBeforeMount, defineProps, toRaw, watch } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  area: {
    type: Boolean,
    default: () => false
  },
  index: initProps.index(),
})

const setSeriesData = setInject(EchartsOptionName.series)

const sync = function() {
  // 将 props 数据传入到
  const option = {
    data: toRaw(props.value),
  }
  // // 处理阴影渐变色
  // if (props.area) {
  //   let areaColor = 'rgba(43, 141, 255, 0.2)'
  //   if (props.color) {
  //     areaColor = props.color
  //   }
  //   safeSet(option, 'areaStyle.normal.color', {
  //     type: 'linear',
  //     x: 0,
  //     y: 0,
  //     x2: 0,
  //     y2: 1,
  //     globalCoord: false,
  //     colorStops: [
  //       { offset: 0, color: areaColor },
  //       { offset: 1, color: '#fff' },
  //     ],
  //   })
  // }
  // // 设置边框色
  // if (props.color) {
  //   safeSet(option, 'itemStyle.color', props.color)
  // }
  setSeriesData(option, props.index)
}

onBeforeMount(function() {
  sync()
  watch(props, sync)
})


</script>

<template>
  <p>series</p>
</template>
