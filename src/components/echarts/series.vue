<script setup lang="ts">
/**
 * @file series 数据
 * @author svon.me@gmail.com
 */
import { onBeforeMount, defineProps, toRaw } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  color: {
    type: String,
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
  if (props.color) {
    safeSet(option, 'itemStyle.color', props.color)
  }
  set(option, props.index)
})

</script>

<template>
  <p>series</p>
</template>
