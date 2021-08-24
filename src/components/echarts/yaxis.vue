<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject, initProps } from '~/logic/echarts/tool'
import { isNumber } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'

const props = defineProps({
  type: {
    type: String,
    default () {
      return 'value'
    }
  },
  formatter: {
    type: Function,
  },
  index: initProps.index(),
  // 展示位置
  position: initProps.position(),
  min: {
    type: Number
  },
  max: {
    type: Number
  }
})


onBeforeMount(function() {
  const option = {
    type: props.type,
    position: props.position,
    axisLabel: {
      formatter: props.formatter
    }
  }
  if (isNumber(props.min)) {
    // @ts-ignore
    safeSet(option, 'min', props.min)
  }
  if (isNumber(props.max)) {
    // @ts-ignore
    safeSet(option, 'max', props.max)
  }
  updateInject(EchartsOptionName.yAxis, option, props.index)
})


</script>

<template>
  <p>yAxis</p>
</template>

