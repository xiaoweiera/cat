<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { getMin, getMax } from './task'
import I18n from '~/utils/i18n/index'
// @ts-ignore
import TaskType from '~/logic/growthpad/tasktype'
import { MissionStatus } from '~/store/growthpad/props'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'
import { Project } from '~/api/growtask'
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

const symbolValue = computed<string>((): string => {
  // 项目名称
  // @ts-ignore
  const name: Project = store.projectName
  if (name === Project.growth) {
    return I18n.common.symbol.divide
  }
  return I18n.common.symbol.plus
})
const tokenValue = computed<string>((): string => {
  // 项目名称
  // @ts-ignore
  const name: Project = store.projectName
  if (name === Project.growth) {
    return 'U'
  }
  return store.token
})

interface ItemTask {
  type: TaskType
  reward: number[]
  [key: string]: any
}

const isSuccess = function(value: MissionStatus): boolean {
  if (value === MissionStatus.success) {
    return true
  }
  return false
}

const clacRewardCount = function(list: Array<ItemTask>): number {
  let count = 0
  for (let i = 0, len = list.length; i < len; i++) {
    const item: ItemTask = list[i]
    if (item.reward) {
      if (
        item.type === TaskType.telegram
        && isSuccess(store.mission.telegram_group)
      ) {
        count += getMin(item.reward)
      }
      if (
        item.type === TaskType.retwitter
        && isSuccess(store.mission.retweet)
      ) {
        count += getMin(item.reward)
      }
      if (
        item.type === TaskType.twitter
        && isSuccess(store.mission.follow_twitter)
      ) {
        count += getMin(item.reward)
      }
      if (
        item.type === TaskType.sina
        && isSuccess(store.mission.follow_weibo)
      ) {
        count += getMin(item.reward)
      }
    }
  }
  return count
}

// 计算奖励
// @ts-ignore
const rewardValue = computed<number>((): number => {
  if (props.data.type === TaskType.weibo) {
    const number = parseInt(store.article_reward.value)
    if (isNaN(number)) {
      return 0
    }
    return number
  }
  // @ts-ignore
  const children = props.data.children
  // Vip 任务
  // @ts-ignore
  if (props.data.type === TaskType.vip) {
    // 验证是否为 Vip
    if (isSuccess(store.mission.invited)) {
      // 验证是否完成任务
      if (
        isSuccess(store.mission.telegram_group)
        && isSuccess(store.mission.retweet)
        && isSuccess(store.mission.follow_twitter)
      ) {
        // 返回奖励
        // @ts-ignore
        return getMin(props.data.reward)
      }
    }
  }
  // PanCake Swap 任务
  // @ts-ignore
  if (props.data.type === TaskType.pancake) {
    // 验证 pancake token 地址是否已填写
    if (isSuccess(store.mission.pancake)) {
      return clacRewardCount(children)
    }
  }
  // Uniswap 任务
  // @ts-ignore
  if (props.data.type === TaskType.uniswap) {
    if (isSuccess(store.mission.uniswap)) {
      return clacRewardCount(children)
    }
  }

  // Bunny 任务
  // @ts-ignore
  if (props.data.type === TaskType.bunny) {
    if (isSuccess(store.mission.bunny)) {
      return clacRewardCount(children)
    }
  }

  // Sushiswap 任务
  // @ts-ignore
  if (props.data.type === TaskType.sushiswap) {
    if (isSuccess(store.mission.sushiswap)) {
      return clacRewardCount(children)
    }
  }

  // autofarm 任务
  // @ts-ignore
  if (props.data.type === TaskType.autofarm) {
    if (isSuccess(store.mission.autofarm)) {
      return clacRewardCount(children)
    }
  }

  // beltfit 任务
  // @ts-ignore
  if (props.data.type === TaskType.beltfit) {
    if (isSuccess(store.mission.belt)) {
      return clacRewardCount(children)
    }
  }

  // venus 任务
  // @ts-ignore
  if (props.data.type === TaskType.venus) {
    if (isSuccess(store.mission.venus)) {
      // 验证是否完成任务
      if (
        isSuccess(store.mission.telegram_group)
        && isSuccess(store.mission.follow_weibo)
        && isSuccess(store.mission.follow_twitter)
      ) {
        // 返回奖励
        // @ts-ignore
        return getMin(props.data.reward)
      }
    }
  }

  // Cream 任务
  // @ts-ignore
  if (props.data.type === TaskType.cream) {
    if (isSuccess(store.mission.cream)) {
      // 验证是否完成任务
      if (
        isSuccess(store.mission.telegram_group)
        && isSuccess(store.mission.follow_weibo)
        && isSuccess(store.mission.follow_twitter)
      ) {
        // 返回奖励
        // @ts-ignore
        return getMin(props.data.reward)
      }
    }
  }

  // compound 任务
  // @ts-ignore
  if (props.data.type === TaskType.compound) {
    if (isSuccess(store.mission.compound)) {
      // 验证是否完成任务
      if (
        isSuccess(store.mission.telegram_group)
        && isSuccess(store.mission.follow_weibo)
        && isSuccess(store.mission.follow_twitter)
      ) {
        // 返回奖励
        // @ts-ignore
        return getMin(props.data.reward)
      }
    }
  }
  return 0
})
</script>
<template>
  <template v-if="rewardValue">
    <span class="font-bold font-kdExp inline-block">
      <span class="reward bonus block md:inline-block">
        <span class="text-xs">{{ I18n.common.message.get }}</span>
        <span class="count">{{ rewardValue }}</span>
        <span class="ml-1">{{ tokenValue }}</span>
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
          >{{ symbolValue }}{{ getMin(data.reward) }}~{{
            getMax(data.reward)
          }}</span>
        </template>
        <template v-else>
          <span class="count">{{ symbolValue }}{{ getMax(data.reward) }}</span>
        </template>
        <span class="ml-1">{{ tokenValue }}</span>
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
