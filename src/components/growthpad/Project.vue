<script setup lang="ts">
// 倒计时
import dayjs from 'dayjs'
import { ref, defineProps, watch } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
const props = defineProps({
  status: String,
  project: Object,
  value: [String, Number],
})

const format = 'YYYY-MM-DD HH:mm:ss'

const day = ref<string>('00')
const hour = ref<string>('00')
const minute = ref<string>('00')
const second = ref<string>('00')
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
// 计算倒计时 - 秒
const getSecond = function(duration: number): string {
  const number = parseInt(((duration / 1000) % 60) as any, 10)
  return number < 10 ? `0${number}` : String(number)
}
// 倒计时
let intemout: any
const timeout = () => {
  clearTimeout(intemout)
  // 当前时间
  const now = dayjs().valueOf()
  const duration = Math.abs(end.value - now)
  // 结束倒计时
  if (duration < 0) {
    day.value = '00'
    hour.value = '00'
    minute.value = '00'
    second.value = '00'
    return
  }
  // 计算倒计时剩余天
  day.value = getDay(duration)
  // 计算倒计时剩余时
  hour.value = getHour(duration)
  // 计算倒计时剩余分
  minute.value = getMinute(duration)
  // 计算倒计时剩余秒
  second.value = getSecond(duration)
  intemout = setTimeout(timeout, 1000)
}
timeout()
</script>
<template>
  <div class="project reative font-kdFang relative">
    <div class="relative z-2">
      <div class="flex items-center">
        <img :src="props.project.icon" class="w-10.5" alt="" />
        <div class="text-kd24px36px ml-2 font-medium">
          {{ props.project.title }}
        </div>
        <div
          v-if="props.status !== 'closure'"
          :class="props.status === 'wait' ? 'statusTxtWait' : 'statusTxtIng'"
        >
          <span
            v-if="props.status === 'wait'"
          >⏱ <span class="ml-1">{{ I18n.growthpadShow.coming }}</span>
          </span>
          <span v-else>🔥 {{ I18n.growthpadShow.ongoing }}</span>
        </div>
      </div>
      <div class="overDes">
        <div :class="props.status === 'closure' ? 'max-w-43' : ''">
          {{ props.project.dashboard.description }}
        </div>
        <img
          v-if="props.status === 'closure'"
          class="w-30 absolute top-4 right-0"
          src="https://res.ikingdata.com/nav/grothpadOver.png"
          alt=""
        />
      </div>
      <div class="flex mt-6 items-center font-normal">
        <p class="desc">{{ I18n.growthpadShow.reward }}</p>
        <p class="projectNum">
          {{ props.project.dashboard.reward.count }} {{ props.project.coin }}
        </p>
      </div>
      <div class="flex blockItem">
        <p class="desc">{{ I18n.growthpadShow.values }}</p>
        <p class="projectNum">${{ props.project.dashboard.reward.cost }}</p>
      </div>
      <div class="flex blockItem">
        <p class="desc">{{ I18n.growthpadShow.perPersion }}</p>
        <p class="projectNum">
          {{ props.project.dashboard.reward.limits[0] }}
          {{ props.project.coin }}
        </p>
      </div>
      <div class="flex mt-3 items-end font-normal">
        <div class="desc">
          <span v-show="props.status !== 'closure'">{{
            I18n.growthpadShow.timeLeft
          }}</span>
        </div>
        <div v-if="props.status !== 'closure'" class="itemTxt">
          <div class="flex items-end">
            <div class="tiemNum">{{ day }}</div>
            <div class="times">
              {{ I18n.growthpadShow.day }}
            </div>
          </div>
          <div class="flex ml-2 items-end">
            <div class="tiemNum">{{ hour }}</div>
            <div class="times">
              {{ I18n.growthpadShow.hour }}
            </div>
          </div>
          <div class="flex ml-2 items-end">
            <div class="tiemNum">{{ minute }}</div>
            <div class="times">
              {{ I18n.growthpadShow.minute }}
            </div>
          </div>
        </div>
        <!--        保持格式-->
        <div v-else class="mt-6.3"></div>
      </div>
      <GrowthpadIndexProjectButton
        :url="props.project.url"
        :status="props.status"
      />
    </div>
    <img
      v-if="props.status !== 'closure'"
      class="w-46 absolute top-4 right-0"
      src="https://res.ikingdata.com/nav/growthpaNoOverTip.png"
      alt=""
    />
  </div>
</template>

<style scoped>
.itemTxt {
  @apply ml-8 flex text-left items-center justify-center text-global-primary;
}
.projectNum {
  @apply ml-8 text-kd14px18px font-kdExp text-global-default;
}
.overDes {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @apply mt-2 text-kd14px20px text-global-default opacity-65;
}
.noOverDes {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  @apply m-2 text-kd14px20px text-global-default opacity-65;
}
.statusTxtWait {
  padding: 6px 12px;
  background: rgba(43, 141, 254, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 50px;
  @apply text-kd14px18px text-global-primary font-kdFang font-medium  ml-4;
}
.statusTxtIng {
  padding: 6px 12px;
  background: rgba(30, 209, 130, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  color: rgba(0, 180, 100, 1);
  border-radius: 50px;
  @apply text-kd14px18px  font-kdFang font-medium  ml-4;
}
.tiemNum {
  @apply text-kd24px110 font-bold font-kdExp;
}
.times {
  @apply ml-1 text-kd12px18px i8n-font-inter font-normal;
}
.project {
  background: linear-gradient(180deg, #f6f7ff 0%, #ddeafd 100%);
  box-shadow: 0px 12px 42px -12px rgba(43, 141, 255, 0.26),
    inset 0px -3px 66px rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  @apply relative p-6  w-full;
}

.shadows {
  filter: drop-shadow(0px 0px 20px rgba(43, 141, 254, 0.16));
}

.time {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 50px;
}

.desc {
  width: 70px;
  color: rgba(37, 62, 111, 0.65);
  font-family: i8n-font-inter !important;
  @apply text-kd14px18px;
}

.goButton {
  border-radius: 44px;
}

.right-logo {
  @apply h-32;
}

.blockItem {
  @apply items-center mt-3 font-normal;
}

.project-default-btn {
  @apply mx-auto w-full text-center flex items-center justify-center rounded-large cursor-pointer;
}
</style>
