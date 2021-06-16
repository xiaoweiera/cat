<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { toNumber } from '~/utils/index'
import dayjs from 'dayjs'

const props = defineProps({
  // 时间戳
  time: {
    type: [Number, String],
    default () {
      return '2021-06-11'
    }
  },
  // 日期范围，默认 7 天
  date: {
    type: Number,
    default () {
      return 7
    }
  }
})

const format = 'YYYY-MM-DD'
const transformTime = function(value: number | string): number {
  if (/^[0-9]+$/g.test(value as string)) {
    value = `${toNumber(value, 0)}`
    if (value.length === 10) {
      return toNumber(value) * 1000
    }
    return toNumber(value)
  }
  const time = dayjs(value, format).valueOf() as any
  if (time) {
    return time
  }
  return 0
}

// @ts-ignore
const isShow = computed<boolean>((): boolean => {
  if (props.time) {
    // 将服务器时间戳（秒）转为毫秒
    const time = transformTime(props.time)
    if (time) {
      // 获取时间差范围
      const days = toNumber(props.date, 0)
      // 项目时间
      const projectDate = dayjs(time).add(days, 'day')
      // 当前时间
      const today = dayjs()
      if (today.isBefore(projectDate, 'day')) {
        return true
      }
      if (today.isSame(projectDate, 'day')) {
        return true
      }
    }
  }
  return false
})
</script>
<template>
  <IconFont v-if="isShow" type="new"></IconFont>
</template>

