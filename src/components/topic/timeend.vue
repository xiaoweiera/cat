<script setup lang="ts">
// @ts-ignore
import { computed, defineProps } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { dateDiff, dateTime } from '~/utils'
import * as time from '~/utils/time'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  xzxis: {
    type: Array,
    default() {
      return []
    }
  },
})

const timeEnd = computed(function() {
  const data = props.data
  const last = safeGet<number>(data, 'last')
  if (last) {
    const value = dateTime(last)
    const day = time.dateDiffDay(value)
    if (day > 0) {
      return `${day}天前`
    }
    const hour = time.dateDiffHour(value)
    if (hour > 0) {
      return `${hour}小时前`
    }
    const minute = time.dateDiffMinute(value)
    if (minute > 0) {
      return `${minute}分钟前`
    }
    return '1分钟'
  } else {
    if (props.xzxis?.length > 0) {
      const [ data ]: any[] = props.xzxis.slice(-1)
      const { time } = data
      return `${dateDiff(time)}前`
    }
  }
  return ''
})
</script>

<template>
  <span class="text-global-time">{{ timeEnd }}</span>
</template>
