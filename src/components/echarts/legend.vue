<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject, initProps } from '~/logic/echarts/tool'
import { seriesType } from '~/logic/echarts/interface'

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
  updateInject(EchartsOptionName.legend, data, props.index)
})

</script>
<template>
</template>

