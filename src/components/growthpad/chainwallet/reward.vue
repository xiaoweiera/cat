<script setup lang="ts">
import { computed } from 'vue'
import { toUpper } from 'ramda'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { toNumber } from '~/utils/index'
import { MissionStatus } from '~/store/growthpad/props'
import { getValueStatus } from '../task/sub/value'
import { getMax } from '../task/task'
import TaskType from '~/logic/growthpad/tasktype'

const store = Task()

// @ts-ignore
const total_reward = computed<string>((): string => {
  const data = {
    // @ts-ignore
    reward: toNumber(store.grand_total_reward.value),
    token: toUpper(store.token)
  }
  return I18n.template(I18n.growthpad.address.total_reward, data)
})

// @ts-ignore
const week_reward = computed<string>((): string => {
  const data = {
    // @ts-ignore
    reward: toNumber(store.week_expected_reward.value),
    token: toUpper(store.token)
  }

  for(const task of store.taskList.value) {
    if (task.type !== TaskType.weibo) {
      const status = getValueStatus(task.type, store)
      if (status === MissionStatus.loading) {
        const value = getMax(task.reward)
        data.reward += value
      }
    }
  }

  return I18n.template(I18n.growthpad.address.week_reward, data)
})


</script>

<template>
  <span class="block text-lg week-reward" v-html="week_reward"></span>
  <span class="block text-lg total-reward" v-html="total_reward"></span>
</template>

<style scoped lang="scss">
  @mixin font($color) {
    ::v-deep(i) {
      font-style: normal;
      color: $color;
    }
  }
  .week-reward {
    @include font(#00B464);
  }
  .total-reward {
    @include font(#2B8DFE);
  }
</style>
