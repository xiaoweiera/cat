<script setup="setup" lang="ts">
import { defineProps, computed } from 'vue'
import bignumber from 'bignumber.js'
// @ts-ignore
import { toNumber, isNumber } from '~/utils'
// @ts-ignore
import { valueFormatter } from '~/logic/echarts/tool'
import { Unit } from '~/logic/echarts/interface'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

// @ts-ignore
const convertNumber = function(value: number | string, zoom: number = 1) {
  const number = new bignumber(value)
  const data = number.multipliedBy(zoom)
  return toNumber(data as any)
}

// @ts-ignore
const rateValue = computed<number>(function() {
  return toNumber(props.data?.rateValue)
})
// @ts-ignore
const rateChange = computed<number>(function() {
  return convertNumber(props.data?.rateChange, 100)
})

// @ts-ignore 处理数字
const rateFormatter = function(value: number, unit: string) {
  return valueFormatter({ value, unit })
}
// @ts-ignore
const rateClassName = function(value: number, unit: string) {
  // 判断是否是金额
  switch (unit) {
  case Unit.a:
  case Unit.a1:
  case Unit.a2:
  case Unit.a3:
    return 'text-global-numRed'
  }
  if (value >= 0) {
    return 'text-global-numGreen'
  }
  return 'text-global-numRed'
}

</script>

<template>
  <span class="flex items-end">
    <span v-if="isNumber(data.rateValue)" class="text-2xl mr-2">
      <span :class="rateClassName(rateValue, data.rateUnit)">{{ rateFormatter(rateValue, data.rateUnit) }}</span>
    </span>
    <span v-if="isNumber(data.rateChange)" class="text-sm">
      <template v-if="rateChange >= 0">
        <span class="text-global-numGreen">{{rateChange}}%</span>
        <IconFont type="https://res.ikingdata.com/nav/topicUp.svg" size="xs"></IconFont>
      </template>
      <template v-else>
        <span class="text-global-numRed mr-1">{{rateChange}}%</span>
        <IconFont type="https://res.ikingdata.com/nav/topicDown.svg" size="xs"></IconFont>
      </template>
    </span>
  </span>
</template>
