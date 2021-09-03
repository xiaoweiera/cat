<script setup lang="ts">
import { defineProps, onBeforeMount, watch } from 'vue'
import { EchartsOptionName, setInject, initProps } from '~/logic/echarts/tool'
import { colors, seriesType, Position } from '~/logic/echarts/interface'
import safeSet from '@fengqiaogang/safe-set'


const props = defineProps({
  value: {
    type: String,
    required: true
  },
  // 图列对应的图形类型
  type: {
    type: String,
    default: () => seriesType.line
  },
  show: {
    type: Boolean,
    default: () => true
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  color: {
    type: String,
  },
  index: initProps.index(),
  position: initProps.position(),
})

const update = setInject(EchartsOptionName.legend)

const sync = function() {
  const index = props.index as number
  const data = {
    value: props.value,
    type: props.type,
    show: props.show,
    disabled: props.disabled,
    position: props.position,
    index,
  }
  if (props.color) {
    safeSet(data, 'itemStyle.color', props.color)
  } else {
    if (props.position !== Position.right) {
      // 给左侧数据，设置默认颜色
      safeSet(data, 'itemStyle.color', colors[index])
    }
  }
  update(data, index)
}

onBeforeMount(function() {
  sync()
  watch(props, sync)
})


</script>
<template>
</template>

