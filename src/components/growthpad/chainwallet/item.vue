<script setup lang="ts">
import { defineProps } from 'vue'
import TaskType from '~/logic/growthpad/tasktype'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    },
  },
})

// 判断任务类型是否相同
// @ts-ignore
const equal = function(type: TaskType): boolean {
  return props.data?.type === type
}

</script>

<template>
  <div class="flex">
    <DotCount size="sm" />
    <div class="flex-1 ml-2.5">
      <!-- 微博任务 -->
      <template v-if="equal(TaskType.weibo)">
        <div class="flex justify-between">
          <div class="mr-3">
            <growthpadChainwalletTitle :data="data" />
          </div>
          <GrowthpadTaskReward :data="data"/>
        </div>
        <div class="mt-3 md:mr-5">
          <GrowthpadTaskWeibo></GrowthpadTaskWeibo>
        </div>
      </template>
      <!-- 普通任务 -->
      <template v-else>
        <div class="flex justify-between md:items-center">
          <div class="mr-3 md:flex md:flex-auto md:justify-between">
            <growthpadChainwalletTitle :data="data" />
            <GrowthpadTaskCheck class="mt-3 md:mt-0 text-right flex items-center" :data="data"/>
          </div>
          <GrowthpadTaskReward class="inline-block" :data="data"/>
        </div>
      </template>
    </div>
  </div>
</template>

