<script setup lang="ts">
// 倒计时
import dayjs from 'dayjs'
import { ref, defineProps, watch } from 'vue'
const format = 'YYYY-MM-DD HH:mm:ss'
const props = defineProps({
  value: [String, Number],
})
const day = ref('0')
const hour = ref('0')
const minute = ref('0')
const end = ref(0)
// 监听传入进来的时间值
watch(
  props.value as any,
  () => {
    const time = dayjs(props.value, format)
    end.value = time.valueOf()
  },
  { immediate: true },
)
// 计算倒计时 - 天
const getDay = function(duration: number): string {
  const number = parseInt((duration / 1000 / 60 / 60 / 24) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 计算倒计时 - 时
const getHour = function(duration: number): string {
  const number = parseInt(((duration / 1000 / 60 / 60) % 24) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 计算倒计时 - 分
const getMinute = function(duration: number): string {
  const number = parseInt(((duration / 1000 / 60) % 60) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 倒计时
let intemout: any
const timeout = () => {
  clearTimeout(intemout)
  // 当前时间
  const now = dayjs().valueOf()
  const duration = end.value - now
  // 结束倒计时
  if (duration < 0) {
    day.value = '00'
    hour.value = '00'
    minute.value = '00'
    return
  }
  // 计算倒计时剩余天
  day.value = getDay(duration)
  // 计算倒计时剩余时
  hour.value = getHour(duration)
  // 计算倒计时剩余分
  minute.value = getMinute(duration)
  // 计算倒计时剩余秒
  const seconds = parseInt(((duration / 1000) % 60) as any, 10)
  if (seconds < 60) {
    intemout = setTimeout(timeout, 1000 * (60 - seconds))
  } else {
    intemout = setTimeout(timeout, 1000 * 60)
  }
}
timeout()
</script>

<template>
  <div
    class="flex text-center md:justify-between items-baseline md:items-center"
  >
    <p class="flex flex-col flex-wrap text-center">
      <span class="font-bold text-2xl md:text-4xl font-kdExp mt-1">{{
        day
      }}</span>
      <span class="text-sm font-kdFang hidden md:inline-block">Days</span>
    </p>
    <p>
      <span class="font-bold text-2xl hidden md:inline-block">:</span>
      <span class="font-semibold text-xs md:hidden">天</span>
    </p>
    <p class="flex flex-col flex-wrap text-center ml-3 md:ml-0">
      <span class="font-bold text-2xl md:text-4xl font-kdExp mt-1">{{
        hour
      }}</span>
      <span class="text-sm font-kdFang hidden md:inline-block">Hours</span>
    </p>
    <p>
      <span class="font-bold text-2xl hidden md:inline-block">:</span>
      <span class="font-semibold text-xs md:hidden">小时</span>
    </p>
    <p class="flex flex-col flex-wrap text-center ml-3 md:ml-0">
      <span class="font-bold text-2xl md:text-4xl font-kdExp mt-1">{{
        minute
      }}</span>
      <span class="text-sm font-kdFang hidden md:inline-block">Minutes</span>
    </p>
    <p>
      <span class="font-semibold text-xs md:hidden">分钟</span>
    </p>
  </div>
</template>

<style scoped>
.md\:text-4xl {
  font-size: 42px;
}
.font-bold,
.font-semibold {
  color: #2b8dfe;
}
.text-sm {
  color: rgba(37, 62, 111, 0.65);
}
</style>
