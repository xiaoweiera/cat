<script setup lang="ts">
import { onBeforeMount, defineProps } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'
const props = defineProps({
  value: {
    type: Array,
    default () {
      return []
    },
  },
  index: initProps.index(),
})

const set = setInject(EchartsOptionName.series)

onBeforeMount(() => {
  set(props.value, props.index)
})

</script>

<template>
  <p>series</p>
</template>
