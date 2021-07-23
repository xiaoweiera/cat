<script setup lang="ts">
/**
 * @file series 数据
 * @author svon.me@gmail.com
 */
import safeSet from '@fengqiaogang/safe-set'
import { onBeforeMount, defineProps, toRaw } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  color: {
    type: String,
  },
  area: {
    type: Boolean,
    default: () => false
  },
  index: initProps.index(),
})

const set = setInject(EchartsOptionName.series)

onBeforeMount(() => {
  // 将 props 数据传入到
  const option = {
    data: toRaw(props.value),
    itemStyle: {
      color: props.color
    }
  }
  // 处理阴影渐变色
  if (props.area) {
    let areaColor = 'rgba(43, 141, 255, 0.2)'
    if (props.color) {
      areaColor = props.color
    }
    safeSet(option, 'areaStyle.normal.color', {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      globalCoord: false,
      colorStops: [
        { offset: 0, color: areaColor },
        { offset: 1, color: '#fff' },
      ],
    })
  }
  // 设置边框色
  if (props.color) {
    safeSet(option, 'itemStyle.color', props.color)
  }
  set(option, props.index)
})

</script>

<template>
  <p>series</p>
</template>
