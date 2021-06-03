<script setup lang="ts">
import { computed, defineProps } from 'vue'
import dayjs from 'dayjs'
// @ts-ignore
import { TimeStatus, getTimeStatus, getMax, getMin } from './task'
import { Project } from '~/api/growtask'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'

defineProps({
  rewardValueTitle: {
    type: String,
    default() {
      return I18n.growthpad.reward.value
    },
  },
})

const store = Task()

const format = 'YYYY-MM-DD HH:mm:ss'

// @ts-ignore
const title = computed((): string => {
  // return `${store.title.value} ${I18n.growthpad.growth}`
  const data = { project: store.title.value }
  if (store.getNickName() === Project.growth) {
    return data.project
  }
  return I18n.template(I18n.growthpad.growth, data)
})

const minReward = function(array: number[]): number {
  return getMin(array)
}
const maxReward = function(array: number[]): number {
  return getMax(array)
}

const timeStatus = computed<string>((): string => {
  return getTimeStatus(store)
})

// @ts-ignore
const countComputed = function(number: number): string | number {
  let value: number = parseFloat(number as any)
  if (isNaN(value)) {
    value = 0
  }
  if (value > 1000) {
    value = value / 1000
    return `${value}K`
  }
  return value
}
// @ts-ignore
const bannerStyle = computed<string>((): string => {
  // @ts-ignore
  return `background-image: url(${store.dashboard.banner})`
})

// @ts-ignore
const getPrice = function(number: string | number): string | number {
  // @ts-ignore
  const price = parseFloat(store.price.value as any)
  let value = price * parseFloat(number as any)
  if (isNaN(value)) {
    value = 0
  }
  const none = '<span class="text-2xl md:text-4xl font-kdFang">$0</span>'
  const count
    = '<span class="ml-1.5 text-xs md:text-base font-kdFang">{about}</span><span class="text-2xl md:text-4xl font-kdFang">${value}</span>'
  return I18n.part(`${none} | ${count}`, value, {
    value: countComputed(value),
    about: I18n.growthpad.reward.about,
  })
}

// @ts-ignore
const timeCountdownValue = computed<string>((): string => {
  // 当前时间
  const now = dayjs().valueOf()
  // @ts-ignore
  const time = dayjs(store.dashboard.begin, format)
  const duration = time.valueOf() - now
  if (duration > 0) {
    // @ts-ignore
    return store.dashboard.begin
  } else {
    // @ts-ignore
    return store.dashboard.end
  }
})
</script>

<template>
  <div class="relative pt-5">
    <div class="equal-width-height banner-box mb-4.5 md:mb-11">
      <div class="equal-content">
        <div class="w-full h-full banner-item" :style="bannerStyle"></div>
        <DotChar
          class="logo left-6 absolute hidden md:block"
          :img="store.icon.value"
          size="xl-10"
        />
        <DotChar
          class="logo left-4 absolute block md:hidden"
          :img="store.icon.value"
          size="xl-8"
        />
      </div>
    </div>

    <div class="px-4 md:px-6">
      <div class="pb-5 md:flex md:justify-between md:items-end">
        <!-- 定时器 -->
        <div class="text-right md:order-2">
          <div class="inline-block pb-3">
            <div
              v-if="timeStatus !== TimeStatus.closure"
              class="hidden md:inline-block"
            >
              <TimeCountdown :value="timeCountdownValue"></TimeCountdown>
            </div>
          </div>
        </div>
        <!-- 项目名称与状态 -->
        <div class="flex items-center font-kdFang mt-2 md:mt-0 md:order-1">
          <span class="text-2xl mx-2">{{ title }}</span>
          <span
            v-if="timeStatus === TimeStatus.wait"
            class="wait py-1.5 px-3 rounded text-sm"
          >
            <b class="font-medium">⏱</b>
            <b class="font-medium ml-3">{{ I18n.growthpad.status.wait }}</b>
          </span>
          <span
            v-else-if="timeStatus === TimeStatus.ing"
            class="ing py-1.5 px-3 rounded text-sm"
          >
            <b class="font-medium">🔥</b>
            <b class="font-medium ml-3">{{ I18n.growthpad.status.ing }}</b>
          </span>
          <span
            v-else-if="timeStatus === TimeStatus.closure"
            class="closure py-1.5 px-3 rounded text-sm"
          >
            <b class="font-medium">🚫</b>
            <b class="font-medium ml-3">{{ I18n.growthpad.status.closure }}</b>
          </span>
        </div>
      </div>
      <div>
        <p class="description text-sm font-kdFang whitespace-pre-line">
          {{ store.dashboard.description }}
        </p>
      </div>
      <div class="pt-5">
        <ul class="flex font-kdFang">
          <li class="align-text-bottom">
            <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
              {{ I18n.growthpad.reward.count }}
            </h4>
            <p class="font-color-theme font-bold font-kdExp">
              <span class="text-2xl md:text-4xl">{{
                countComputed(store.dashboard.rewardCount)
              }}</span>
              <span class="ml-1.5 text-xs md:text-base">{{ store.token }}</span>
            </p>
          </li>
          <!--
          <li class="ml-3 md:ml-12 align-text-bottom">
            <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
              {{ rewardValueTitle }}
            </h4>
            <p
              class="font-color-theme font-bold font-kdExp whitespace-nowrap"
              v-html="getPrice(store.dashboard.rewardCount)"
            ></p>
          </li>
          -->
          <li class="ml-3 md:ml-12 align-text-bottom">
            <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
              {{ I18n.growthpad.reward.perPerson }}
            </h4>
            <p class="font-color-theme font-bold font-kdExp">
              <span class="text-2xl md:text-4xl whitespace-nowrap">
                <template
                  v-if="
                    minReward(store.dashboard.rewardLimit) ===
                      maxReward(store.dashboard.rewardLimit)
                  "
                >
                  <span>{{
                    countComputed(maxReward(store.dashboard.rewardLimit))
                  }}</span>
                </template>
                <template v-else>
                  <span>{{
                    countComputed(minReward(store.dashboard.rewardLimit))
                  }}</span>
                  <span>~</span>
                  <span>{{
                    countComputed(maxReward(store.dashboard.rewardLimit))
                  }}</span>
                </template>
              </span>
              <span class="ml-1.5">{{ store.token }}</span>
            </p>
          </li>
        </ul>
      </div>
      <div
        v-if="timeStatus !== TimeStatus.closure"
        class="pt-5 block md:hidden"
      >
        <template v-if="timeStatus === TimeStatus.wait">
          <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
            {{ I18n.growthpad.countdown.title }}
          </h4>
        </template>
        <template v-else-if="timeStatus === TimeStatus.ing">
          <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
            {{ I18n.growthpad.countdown.endTitle }}
          </h4>
        </template>
        <TimeCountdown :value="timeCountdownValue"></TimeCountdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner-box {
  &:before {
    margin-top: 23.58%;
  }
  .banner-item {
    border-radius: 2px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.logo {
  bottom: 0;
  transform: translate(0, 50%);
  border: 4px solid #fff;
}
.wait {
  color: #2083f4;
  background: rgba(43, 141, 254, 0.1);
}
.ing {
  background: rgba(248, 137, 35, 0.14);
  color: #e9592d;
}
.closure {
  background: rgba(37, 62, 111, 0.1);
  color: rgba(37, 62, 111, 0.65);
}
h4 {
  color: rgba(37, 62, 111, 0.65);
}
.description {
  color: rgba(37, 62, 111, 0.85);
}
</style>
