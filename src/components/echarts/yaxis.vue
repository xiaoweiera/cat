<script setup lang="ts">
import { compact } from '~/utils/index'
import { defineProps, onBeforeMount, toRaw } from 'vue'
import { EchartsOptionName, updateInject, initProps } from '~/logic/echarts/tool'
const props = defineProps({
  type: {
    type: String,
    default () {
      return 'value'
    }
  },
  index: initProps.index(),
  // 展示位置
  position: initProps.position(),
})


onBeforeMount(function() {
  const option = {
    type: props.type,
    position: props.position,
    legend: props.legend ? compact(toRaw(props.legend)) : [],
  }
  updateInject(EchartsOptionName.yAxis, option, props.index)
})


</script>

<template>
  <p>yAxis</p>
</template>

