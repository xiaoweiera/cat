<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import I18n from '~/utils/i18n/index'

import Task from '~/logic/growthpad/task'
const store = Task()

// @ts-ignore
const title = computed((): string => {
  return `${store.title.value} ${I18n.growthpad.growth}`
})

const minReward = function(array: number[]): number {
  return Math.min.apply(null, array)
}
const maxReward = function(array: number[]): number {
  return Math.max.apply(null, array)
}

const beginTime = computed<string>((): string => {
  if (store.dashboard?.begin) {
    const time = dayjs(store.dashboard.begin, 'YYYY-MM-DD HH:mm:ss').format(
      'YYYY年MM月DD日HH:mm',
    )
    return `活动开启时间：${time}（UTC+8）`
  }
  return ''
})
</script>

<template>
  <div class="py-15 total">
    <div class="flex items-center pb-5">
      <DotChar :img="store.icon" size="xl" />
      <span class="text-2xl ml-2">{{ title }}</span>
      <span class="ml-4 hot py-1.5 px-3 rounded text-sm">
        <b class="font-medium">⏱ </b>
        <b class="font-medium ml-3">{{ beginTime }}</b>
      </span>
    </div>
    <div>
      <p class="description text-sm">{{ store.dashboard.description }}</p>
    </div>
    <div class="pt-5">
      <ul class="flex">
        <li>
          <h4 class="font-normal text-xs mb-1">
            {{ I18n.growthpad.examples.dashboard.rewards }}
          </h4>
          <p class="font-color-theme font-kdFang font-bold flex items-end">
            <span class="text-4xl">{{ store.dashboard.rewardCount }}</span>
            <span class="ml-1.5">MDX</span>
          </p>
        </li>
        <li class="ml-12">
          <h4 class="font-normal text-xs mb-1">
            {{ I18n.growthpad.examples.dashboard.value }}
          </h4>
          <p class="font-color-theme font-kdFang font-bold">
            <span class="text-4xl">${{ 0 }}</span>
          </p>
        </li>
        <li class="ml-12">
          <h4 class="font-normal text-xs mb-1">
            {{ I18n.growthpad.examples.dashboard.perPerson }}
          </h4>
          <p class="font-color-theme font-kdFang font-bold flex items-end">
            <span class="text-4xl">
              <span>{{ minReward(store.dashboard.rewardLimit) }}</span>
              <span>-</span>
              <span>{{ maxReward(store.dashboard.rewardLimit) }}</span>
            </span>
            <span class="ml-1.5">MDX</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.total {
  min-height: 310px;
}
.hot {
  color: #2083f4;
  background: rgba(43, 141, 254, 0.1);
}
h4 {
  color: rgba(37, 62, 111, 0.65);
}
.description {
  color: rgba(37, 62, 111, 0.85);
}
</style>
