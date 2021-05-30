<script setup lang="ts">
import { computed } from 'vue'
import { TimeStatus, getTimeStatus } from './task'
import I18n from '~/utils/i18n/index'

import Task from '~/logic/growthpad/task'
const store = Task()

// @ts-ignore
const title = computed((): string => {
  // return `${store.title.value} ${I18n.growthpad.growth}`
  const data = { project: store.title.value }
  const text = I18n.template(I18n.growthpad.growth, data)
  return text
})

const minReward = function(array: number[]): number {
  return Math.min.apply(null, array)
}
const maxReward = function(array: number[]): number {
  return Math.max.apply(null, array)
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
</script>

<template>
  <div class="pt-15 total">
    <div class="flex items-center pb-5 font-kdFang">
      <DotChar :img="store.icon.value" size="xl" />
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
    <div>
      <p class="description text-sm font-kdFang whitespace-pre-line">
        {{ store.dashboard.description }}
      </p>
    </div>
    <div class="pt-5">
      <ul class="flex">
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
        <li class="ml-3 md:ml-12 align-text-bottom">
          <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
            {{ I18n.growthpad.reward.value }}
          </h4>
          <p
            class="font-color-theme font-bold font-kdExp whitespace-nowrap"
            v-html="getPrice(store.dashboard.rewardCount)"
          ></p>
        </li>
        <li class="ml-3 md:ml-12 align-text-bottom">
          <h4 class="font-normal text-xs mb-1 whitespace-nowrap font-kdFang">
            {{ I18n.growthpad.reward.perPerson }}
          </h4>
          <p class="font-color-theme font-bold font-kdExp">
            <span class="text-2xl md:text-4xl whitespace-nowrap">
              <span>{{
                countComputed(minReward(store.dashboard.rewardLimit))
              }}</span>
              <span>-</span>
              <span>{{
                countComputed(maxReward(store.dashboard.rewardLimit))
              }}</span>
            </span>
            <span class="ml-1.5">{{ store.token }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
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
