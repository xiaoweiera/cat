<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { getMax } from './task'
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'

const store = Task()

const props = defineProps({
  data: {
    type: Object,
  },
})

const showReward = computed<boolean>((): boolean => {
  if (props?.data?.reward) {
    const value = getMax([].concat(props.data.reward))
    if (value === 0) {
      return false
    }
    if (props.data.type === TaskType.telegram) {
      return true
    }
    if (props.data.type === TaskType.twitter) {
      return true
    }
    if (props.data.type === TaskType.retwitter) {
      return true
    }
  }
  return false
})
</script>
<template>
  <GrowthpadTaskTitle :data="data">
    <template #right>
      <template v-if="showReward">
        <div class="flex items-center">
          <span class="reward inline-block mr-1.5 text-sm font-bold">
            <span class="font-kdExp">{{ getMax(data.reward) }}</span>
            <span class="ml-1 font-kdExp">{{ store.getNickName() }}</span>
          </span>
          <GrowthpadTaskCheck :data="data"></GrowthpadTaskCheck>
        </div>
      </template>
      <template v-else>
        <GrowthpadTaskCheck :data="data"></GrowthpadTaskCheck>
      </template>
    </template>
  </GrowthpadTaskTitle>
</template>

<style scoped lang="scss">
.reward {
  user-select: none;
  color: #2b8dfe;
}
</style>
