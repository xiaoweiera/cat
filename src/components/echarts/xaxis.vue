<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { EchartsOptionName, updateInject } from '~/logic/echarts/tool'

const props = defineProps({
  type: {
    type: String,
    default () {
      return 'category'
    },
  },
  boundaryGap: {
    type: [Boolean, Array],
    default() {
      return [20,20]
    }
  },
  value: {
    type: Array,
    required: true
  }
})

onBeforeMount(function() {
  const option = {
    type: props.type,
    boundaryGap: props.boundaryGap,
    data: props.value
  }
  updateInject(EchartsOptionName.xAxis, option, 0)
})

</script>

<template>
  <p>xAxis</p>
</template>
