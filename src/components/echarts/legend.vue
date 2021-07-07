<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject, initProps } from '~/logic/echarts/tool'
const props = defineProps({
  value: {
    type: String,
    required: true
  },
  // 图列对应的图形类型
  type: {
    type: String,
    default() {
      return 'line'
    }
  },
  show: {
    type: Boolean,
    default() {
      return true
    }
  },
  index: initProps.index(),
})

onBeforeMount(function() {
  const data = {
    value: props.value,
    type: props.type,
    show: props.show,
  }
  updateInject(EchartsOptionName.legend, data, props.index)
})

</script>
<template>
</template>

