<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, setInject } from '~/logic/echarts/tool'
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

const set = setInject(EchartsOptionName.tooltip)

onBeforeMount(function() {
  if (triggerType.none === props.trigger) {
    set({
      show: false
    })
  } else {
    const option = {
      trigger: props.trigger,
      formatter: props.formatter
    }
    set(option)
  }
})

</script>

<template>

</template>

