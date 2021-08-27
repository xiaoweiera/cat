<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject } from '~/logic/echarts/tool'
import { triggerType } from '~/logic/echarts/interface'

const props = defineProps({
  trigger: {
    type: String,
    default: () => triggerType.axis,
    validator (value: triggerType): boolean {
      const trigger = [triggerType.item, triggerType.axis, triggerType.none]
      return trigger.includes(value)
    }
  },
  formatter: {
    type: Function
  }
})

onBeforeMount(function() {
  const option = {
    trigger: props.trigger,
    formatter: props.formatter
  }
  updateInject(EchartsOptionName.tooltip, option)
})

</script>

<template>

</template>

