<script setup="setup" lang="ts">
import { defineProps, computed } from 'vue'
import bignumber from 'bignumber.js'
import { toNumber, isNumber } from '~/utils'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

// @ts-ignore
const convertNumber = function(value: number | string, zoom: 1) {
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

</script>

<template>
  <span class="flex items-end">
    <span v-if="isNumber(data.rateValue)" class="text-2xl mr-2">
      <span class="text-global-numGreen " v-if="rateValue >= 0">{{rateValue}}{{ data.rateUnit }}</span>
      <span class="text-global-numRed" v-else>{{rateValue}}{{ data.rateUnit }}</span>
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
