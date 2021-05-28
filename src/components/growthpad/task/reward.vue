<script setup lang="ts">
import { computed, defineProps } from 'vue'
// @ts-ignore
import { getMin, getMax } from './task'
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'
const store = Task()
const props = defineProps({
  data: {
    type: Object,
  },
})
// @ts-ignore
const isWeibo = computed((): boolean => {
  return props.data?.type === TaskType.weibo
})

const getBase = function(): boolean {
  if (store.mission.telegram_group) {
    if (store.mission.retweet) {
      if (store.mission.follow_twitter) {
        return true
      }
    }
  }
  return false
}

const rewardValue = computed<number>((): number => {
  // 第一个任务
  if (props.data.type === TaskType.vip) {
    if (userData.is_vip && getBase()) {
      return getMin(props.data.reward)
    }
  }
  // 第二个任务
  if (props.data.type === TaskType.pancake) {
    if (store.user.pancake_token && getBase()) {
      return getMin(props.data.reward)
    }
  }
  // 第三个任务
  if (props.data.type === TaskType.uniswap) {
    if (store.user.uniswap_token && getBase()) {
      return getMin(props.data.reward)
    }
  }

  // 第四个任务
  if (props.data.type === TaskType.sushiswap) {
    if (store.user.sushiswap_token && getBase()) {
      return getMin(props.data.reward)
    }
  }
  return 0
})
</script>
<template>
  <template v-if="rewardValue">
    <span class="font-bold font-kdExp inline-block">
      <span class="reward bonus block md:inline-block">
        <span class="text-xs">已得</span>
        <span class="count">{{ rewardValue }}</span>
        <span class="ml-1">{{ store.token }}</span>
      </span>
      <span class="block md:inline-block text-right md:text-left">
        <slot></slot>
      </span>
    </span>
  </template>
  <template v-else>
    <span class="font-bold font-kdExp inline-block">
      <span class="reward block md:inline-block">
        <template v-if="isWeibo">
          <span
            class="count"
          >{{ getMin(data.reward) }}~{{ getMax(data.reward) }}</span>
        </template>
        <template v-else>
          <span class="count">+{{ getMax(data.reward) }}</span>
        </template>
        <span class="ml-1">{{ store.token }}</span>
      </span>
      <span class="block md:inline-block text-right md:text-left">
        <slot></slot>
      </span>
    </span>
  </template>
</template>

<style scoped lang="scss">
.reward {
  user-select: none;
  color: #2b8dfe;
  &.bonus {
    color: #00b464;
  }
  .count {
    font-size: 26px;
  }
}
</style>
