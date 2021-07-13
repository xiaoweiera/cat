<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject } from '~/logic/echarts/tool'

const props = defineProps({
  trigger: {
    type: String,
    default: () => 'axis',
    validator (value: string): boolean {
      const trigger = ['item', 'axis', 'none']
      return trigger.includes(value)
    }
  }
})

onBeforeMount(function() {
  const option = {
    trigger: props.trigger,
  }
  updateInject(EchartsOptionName.tooltip, option)
})

</script>

<template>

</template>

