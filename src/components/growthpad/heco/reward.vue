<script setup lang="ts">
import { computed } from 'vue'
import Task from '~/logic/growthpad/task'
import { toNumber } from '~/utils/index'
import TaskType from '~/logic/growthpad/tasktype'
import { getValueStatus } from '~/components/growthpad/task/sub/value'
import { MissionStatus } from '~/store/growthpad/props'
import { getMax } from '~/components/growthpad/task/task'
const store = Task()

const WinType = {
  init: 'init', // 未开奖
  success: 'success', // 已开奖
  lottery: 'lottery' // 中奖
}

// @ts-ignore
const winStatus = computed(function() {
  // 如果奖励字段不为空时，证明已开奖并且已中奖
  if (store.info.rewardData) {
    return WinType.lottery
  }
  // @ts-ignore
  if (toNumber(store.lottery) === 0) {
    return WinType.init
  }
  return WinType.success
})

// 计算中奖概率
// @ts-ignore
const rewardProbability = computed<number>((): number => {
  let size: number = 0
  for(const task of store.taskList.value) {
    if (task.type !== TaskType.weibo) {
      const status = getValueStatus(task.type, store)
      if (status === MissionStatus.success) {
        const value = getMax(task.reward)
        size += value
      }
    }
  }
  return size
})

</script>

<template>
  <div class="leading-7 text-global-highTitle">
    <p class="text-sm">
      <span class="block md:inline-block mr-1.5">Result:</span>
      <span class="block md:inline whitespace-pre-wrap break-all">
        <template v-if="winStatus === WinType.lottery">
          <span class="text-lg font-medium text-global-numGreen text-lg">{{ store.info.rewardData }}</span>
        </template>
        <template v-else-if="winStatus === WinType.success">
          <span class="text-lg font-medium text-global-numRed text-lg">Not winning</span>
        </template>
        <template v-else>
          <span class="text-lg font-medium mr-1">Waiting for the draw</span>
          <!-- 显示中奖概率 -->
          <template v-if="rewardProbability">
            <span class="mr-1">(</span>
            <span>The probability of winning is 10%</span>
            <span class="text-global-numGreen text-lg ml-1">{{ rewardProbability }}%</span>
            <span class="ml-1">)</span>
          </template>
          <span v-else>(Not eligible for the draw)</span>
        </template>
      </span>
    </p>
  </div>
</template>


