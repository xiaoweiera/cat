<script setup lang="ts">
import { onBeforeMount, defineProps, toRaw } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'
const props = defineProps({
  value: {
    type: Array,
    default () {
      return []
    },
  },
  stack: {
    type: Boolean,
    default () {
      return false
    }
  },
  index: initProps.index(),
})

const set = setInject(EchartsOptionName.series)

onBeforeMount(() => {
  const option = {
    data: toRaw(props.value),
    stack: props.stack,
  }
  if (props.stack) {
    option.areaStyle = {}
  }
  set(option, props.index)
})

</script>

<template>
  <p>series</p>
</template>
