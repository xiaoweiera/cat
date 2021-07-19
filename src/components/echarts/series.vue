<script setup lang="ts">
/**
 * @file series 数据
 * @author svon.me@gmail.com
 */
import { onBeforeMount, defineProps, toRaw } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  index: initProps.index(),
})

const set = setInject(EchartsOptionName.series)

onBeforeMount(() => {
  // 将 props 数据传入到
  const option = {
    data: toRaw(props.value),
  }
  set(option, props.index)
})

</script>

<template>
  <p>series</p>
</template>
