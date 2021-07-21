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

// @ts-ignore
const timeEnd = computed(function() {
  const data = props.data
  let last = safeGet<number>(data, 'last')
  if (!last) {
    if (props.xzxis?.length > 0) {
      const [ temp ]: any[] = props.xzxis.slice(-1)
      const { time } = temp
      last = time
    }
  }
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
  return '1分钟内'
})
</script>

<template>
  <span class="text-global-time">
    <span>更新时间</span>
    <span class="ml-1">{{ timeEnd }}</span>
  </span>
</template>
