<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { getMin, getMax } from './task'
import I18n from '~/utils/i18n/index'
// @ts-ignore
import TaskType from '~/logic/growthpad/tasktype'
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

interface ItemTask {
  type: TaskType
  reward: number[]
  [key: string]: any
}

const clacRewardCount = function(list: Array<ItemTask>): number {
  let count = 0
  for (let i = 0, len = list.length; i < len; i++) {
    const item: ItemTask = list[i]
    if (item.reward) {
      if (item.type === TaskType.telegram && store.mission.telegram_group) {
        count += getMin(item.reward)
      }
      if (item.type === TaskType.retwitter && store.mission.retweet) {
        count += getMin(item.reward)
      }
      if (item.type === TaskType.twitter && store.mission.follow_twitter) {
        count += getMin(item.reward)
      }
      if (item.type === TaskType.sina && store.mission.follow_weibo) {
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
    if (userData.is_vip) {
      // 验证是否完成任务
      if (
        store.mission.telegram_group
        && store.mission.retweet
        && store.mission.follow_twitter
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
    if (store.mission.pancake) {
      return clacRewardCount(children)
    }
  }
  // Uniswap 任务
  // @ts-ignore
  if (props.data.type === TaskType.uniswap) {
    if (store.mission.uniswap) {
      return clacRewardCount(children)
    }
  }

  // Bunny 任务
  // @ts-ignore
  if (props.data.type === TaskType.bunny) {
    if (store.mission.bunny) {
      return clacRewardCount(children)
    }
  }

  // Sushiswap 任务
  // @ts-ignore
  if (props.data.type === TaskType.sushiswap) {
    if (store.mission.sushiswap) {
      return clacRewardCount(children)
    }
  }

  // autofarm 任务
  // @ts-ignore
  if (props.data.type === TaskType.autofarm) {
    if (store.mission.autofarm) {
      return clacRewardCount(children)
    }
  }

  // beltfit 任务
  // @ts-ignore
  if (props.data.type === TaskType.beltfit) {
    if (store.mission.belt) {
      return clacRewardCount(children)
    }
  }

  // venus 任务
  // @ts-ignore
  if (props.data.type === TaskType.venus) {
    if (store.mission.venus) {
      // 验证是否完成任务
      if (
        store.mission.telegram_group
        && store.mission.follow_weibo
        && store.mission.follow_twitter
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
    if (store.mission.cream) {
      // 验证是否完成任务
      if (
        store.mission.telegram_group
        && store.mission.follow_weibo
        && store.mission.follow_twitter
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
    if (store.mission.compound) {
      // 验证是否完成任务
      if (
        store.mission.telegram_group
        && store.mission.follow_weibo
        && store.mission.follow_twitter
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
          >+{{ getMin(data.reward) }}~{{ getMax(data.reward) }}</span>
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
