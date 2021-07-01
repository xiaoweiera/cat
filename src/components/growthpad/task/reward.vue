<script setup lang="ts">
import { computed, defineProps } from 'vue'
// @ts-ignore
import { getMin, getMax } from './task'
import I18n from '~/utils/i18n/index'
// @ts-ignore
import TaskType from '~/logic/growthpad/tasktype'
import { MissionStatus } from '~/store/growthpad/props'
import Task from '~/logic/growthpad/task'
import { ProjectKey } from '~/logic/growthpad/config'
import { toNumber } from '~/utils/index'

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
  const name: ProjectKey = store.projectName
  if (store.getNickName() === ProjectKey.growth) {
    return I18n.common.symbol.divide
  }
  return I18n.common.symbol.plus
})
// @ts-ignore
const tokenValue = computed<string>((): string => {
  // 项目名称
  const name = store.getNickName()
  if (name === ProjectKey.growth) {
    return 'U'
  }
  return store.token
})

interface ItemTask {
  type: TaskType
  reward: number[]
  [key: string]: any
}

const isSuccess = function(value: MissionStatus, option?: any): boolean {
  if (value === MissionStatus.success) {
    return true
  }
  // 如果配置项中该任务默认为暂停状态，则默认为完成状态
  if (option && option.suspend) {
    return true
  }
  return false
}

const isEmpty = function(value: MissionStatus, option?: any): boolean {
  const status = isSuccess(value, option)
  if (status || value === MissionStatus.loading) {
    return false
  }
  return true
}

const clacRewardCount = function(list: Array<ItemTask>): number {
  let count = 0
  for (let i = 0, len = list.length; i < len; i++) {
    const item: ItemTask = list[i]
    if (item.reward) {
      if (item.type === TaskType.telegram && isSuccess(store.mission.telegram_group)) {
        count += getMin(item.reward)
      }
      if (item.type === TaskType.retwitter && isSuccess(store.mission.retweet)) {
        count += getMin(item.reward)
      }
      if (item.type === TaskType.twitter && isSuccess(store.mission.follow_twitter)) {
        count += getMin(item.reward)
      }
      if (item.type === TaskType.sina && isSuccess(store.mission.follow_weibo)) {
        count += getMin(item.reward)
      }
    }
  }
  return count
}

const childrenRewardStatus = function(data: any): number {
  const children: any[] = [...data?.children || []]
  let flag: boolean = true
  for(let i = 0, len = children.length; i < len; i++) {
    const item = children[i]
    // 会员或者邀请一定人数
    if (item.type === TaskType.vip) {
      if (isSuccess(store.mission.invited, item)) {
        continue
      } else {
        flag = false
        break
      }
    }
    // 电报群
    if (item.type === TaskType.telegram) {
      if (isSuccess(store.mission.telegram_group, item)) {
        continue
      } else {
        flag = false
        break
      }
    }
    // 关注 twitter
    if (item.type === TaskType.twitter) {
      if (isSuccess(store.mission.follow_twitter, item)) {
        continue
      } else {
        flag = false
        break
      }
    }

    // 转发 twitter
    if (item.type === TaskType.retwitter) {
      if (isSuccess(store.mission.retweet, item)) {
        continue
      } else {
        flag = false
        break
      }
    }
    // 关注 sina 微博
    if (item.type === TaskType.sina) {
      if (isSuccess(store.mission.follow_weibo, item)) {
        continue
      } else {
        flag = false
        break
      }
    }
  }
  if (flag) {
    return getMin(data.reward)
  }
  return 0
}


// 计算奖励
// @ts-ignore
const rewardValue = computed<number>((): number => {
  // 微博文章任务
  if (props.data.type === TaskType.weibo) {
    const number = toNumber(store.article_reward.value, 0)
    return number
  }
  // @ts-ignore
  const children = props.data.children
  // Vip 任务
  // @ts-ignore
  if (props.data.type === TaskType.vip) {
    // 使用新的计算奖励规则
    return childrenRewardStatus(props.data)
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
      // 使用新的计算奖励规则
      return childrenRewardStatus(props.data)
    }
  }

  // Cream 任务
  // @ts-ignore
  if (props.data.type === TaskType.cream) {
    if (isSuccess(store.mission.cream)) {
      // 使用新的计算奖励规则
      return childrenRewardStatus(props.data)
    }
  }

  // compound 任务
  // @ts-ignore
  if (props.data.type === TaskType.compound) {
    if (isSuccess(store.mission.compound)) {
      // 使用新的计算奖励规则
      return childrenRewardStatus(props.data)
    }
  }
  // chainwallet 任务
  if (props.data.type === TaskType.chainwallet) {
    if (isSuccess(store.mission.chainwallet)) {
      return toNumber(store.info.chainwallet_reward)
    }
    // 任务结果验证中
    if (!isEmpty(store.mission.chainwallet)) {
      return getMax(props.data.reward)
    }
  }

  // twiiter 任务
  if (props.data.type === TaskType.twitter) {
    // 任务完成
    if (!isEmpty(store.mission.follow_twitter)) {
      return getMin(props.data.reward)
    }
  }

  // 转发 twiiter 任务
  if (props.data.type === TaskType.retwitter) {
    if (!isEmpty(store.mission.retweet)) {
      return getMin(props.data.reward)
    }
  }

  // 关注电报任务
  if (props.data.type === TaskType.telegram) {
    if (!isEmpty(store.mission.telegram_group)) {
      return getMin(props.data.reward)
    }
  }

  // 关注新浪微博任务
  if (props.data.type === TaskType.sina) {
    if (!isEmpty(store.mission.follow_weibo)) {
      return getMin(props.data.reward)
    }
  }
  return 0
})




</script>
<template>
  <template v-if="rewardValue">
    <span class="font-bold font-kdExp inline-block whitespace-nowrap">
      <span class="reward bonus block md:inline-block">
        <span class="min-w-16 inline-block text-right">
          <span class="text-xs">{{ I18n.common.message.get }}</span>
          <span class="count">{{ rewardValue }}</span>
        </span>
        <span class="ml-1">{{ tokenValue }}</span>
      </span>
      <span class="block md:inline-block text-right md:text-left">
        <slot></slot>
      </span>
    </span>
  </template>
  <template v-else>
    <span class="font-bold font-kdExp inline-block whitespace-nowrap">
      <span class="reward block md:inline-block">
        <template v-if="isWeibo">
          <span class="count">{{ symbolValue }}{{ getMin(data.reward) }}~{{getMax(data.reward) }}</span>
        </template>
        <template v-else>
          <span class="count inline-block min-w-16 text-right">{{ symbolValue }}{{ getMax(data.reward) }}</span>
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
