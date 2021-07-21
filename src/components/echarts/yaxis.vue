<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject, initProps } from '~/logic/echarts/tool'

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
})


onBeforeMount(function() {
  const option = {
    type: props.type,
    position: props.position,
    axisLabel: {
      formatter: props.formatter
    }
  }
  updateInject(EchartsOptionName.yAxis, option, props.index)
})


</script>

<template>
  <p>yAxis</p>
</template>

