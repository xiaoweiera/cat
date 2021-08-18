<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject, initProps } from '~/logic/echarts/tool'
import { seriesType } from '~/logic/echarts/interface'
import safeSet from '@fengqiaogang/safe-set'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  // 图列对应的图形类型
  type: {
    type: String,
    default: () => seriesType.line
  },
  show: {
    type: Boolean,
    default: () => true
  },
  color: {
    type: String,
  },
  index: initProps.index(),
  position: initProps.position(),
})

onBeforeMount(function() {
  const data = {
    value: props.value,
    type: props.type,
    show: props.show,
    position: props.position,
  }
  if (props.color) {
    safeSet(data, 'itemStyle.color', props.color)
  }
  updateInject(EchartsOptionName.legend, data, props.index)
})

</script>
<template>
</template>

