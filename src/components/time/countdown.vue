<script setup lang="ts">
  // 倒计时
  import dayjs from 'dayjs'
  import { ref, defineProps, watch } from 'vue'
  const format = 'YYYY MM DD HH:mm:ss'
  const props = defineProps({
    value: [String, Number],
  })
  const day = ref('0')
  const hour = ref('0')
  const minute = ref('0')
  const end = ref(0)
  watch(props.value, () => {
    const time = dayjs(props.value, format)
    end.value = time.valueOf()
  }, { immediate: true })
  const getDay = function(duration: number): string {
    const number = parseInt(duration / 1000 / 60 / 60 / 24, 10)
    return number < 10 ? `0${number}` : String(number)
  }
  const getHour = function(duration: number): string {
    const number = parseInt(duration / 1000 / 60 / 60 % 24, 10)
    return number < 10 ? `0${number}` : String(number)
  }
  const getMinute = function(duration: number): string {
    const number = parseInt(duration / 1000 / 60 % 60, 10)
    return number < 10 ? `0${number}` : String(number)
  }
  // 倒计时
  let intemout
  const timeout = () => {
    clearTimeout(intemout)
    // 当前时间
    const now = dayjs().valueOf()
    const duration = end.value - now
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
    const seconds = parseInt(duration / 1000 % 60, 10)
    if (seconds < 60) {
      intemout = setTimeout(timeout, 1000 * (60 - seconds))
    }
    else {
      intemout = setTimeout(timeout, 1000 * 60)
    }
  }
  timeout()
</script>

<template>
  <div class="flex text-center justify-between items-center">
    <p class="flex flex-col flex-wrap">
      <span>{{ day }}</span>
      <span>Days</span>
    </p>
    <p>:</p>
    <p class="flex flex-col flex-wrap">
      <span>{{ hour }}</span>
      <span>Hours</span>
    </p>
    <p>:</p>
    <p class="flex flex-col flex-wrap">
      <span>{{ minute }}</span>
      <span>Minutes</span>
    </p>
  </div>
</template>

<style scoped>

</style>
