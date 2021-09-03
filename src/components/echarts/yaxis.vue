<script setup lang="ts">
import { isNumber } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import { defineProps, onBeforeMount } from 'vue'
import { setInject } from '~/utils/use/state'
import { EchartsOptionName, initProps } from '~/logic/echarts/tool'
import { layout } from '~/logic/echarts/colors'
import { Position } from '~/logic/echarts/interface'

const props = defineProps({
  type: {
    type: String,
    default: () => 'value'
  },
  formatter: {
    type: Function,
  },
  index: {
    default: () => 0,
    ...initProps.index(),
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  unit: {
    type: String,
    default: () => '',
  },
  // 根据 position 设置默认值
  color: {
    type: String,
  },
  // 展示位置
  position: initProps.position(),
})

const update = setInject(EchartsOptionName.yAxis)

onBeforeMount(function() {
  const option = {
    type: props.type,
    position: props.position,
    axisLabel: {
      formatter: function(value: string | number, option: object = {}) {
        const res = `${value}${props.unit || ''}`
        if (props.formatter) {
          return props.formatter({ ...option, value: res })
        }
        return res
      }
    }
  }
  if (isNumber(props.min)) {
    safeSet(option, 'min', props.min)
  }
  if (isNumber(props.max)) {
    safeSet(option, 'max', props.max)
  }

  const colorKey = 'axisLabel.textStyle.color'
  if (props.color) {
    safeSet(option, colorKey, props.color)
  } else if (props.position === Position.left){
    safeSet(option, colorKey, layout.leftColor)
  } else if (props.position === Position.right) {
    safeSet(option, colorKey, layout.rightColor)
  }
  update(option, props.index)
})


</script>

<template>
  <p>yAxis</p>
</template>

