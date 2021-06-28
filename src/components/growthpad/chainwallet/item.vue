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
const equal = function(type: TaskType): boolean {
  return props.data?.type === type
}

</script>

<template>
  <div class="flex">
    <DotCount size="sm" />
    <div class="flex-1 ml-2.5">
      <div class="task-content md:flex md:items-center">
        <div class="md:mr-3">
          <GrowthpadTaskTitle :data="data" class="flex justify-between items-center"/>
          <p v-if="data.rule" class="pt-1">
            <template v-for="(text, index) in data.rule" :key="index">
              <span class="block text-xs font-color leading-4">{{ index + 1 }}. {{ text }}</span>
            </template>
          </p>
        </div>
        <div class="flex justify-between mt-3 md:mt-0 md:justify-end md:flex-1">
          <GrowthpadTaskCheck class="text-right mr-7 flex items-center" :data="data"/>
          <span class="inline-block cursor-pointer md:pl-0">
              <GrowthpadTaskReward :data="data"/>
            </span>
        </div>
      </div>

      <div v-if="equal(TaskType.weibo)" class="no-count task-item mt-1.5 py-1.5 pr-1.5 pl-3">
        <GrowthpadTaskWeibo></GrowthpadTaskWeibo>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../task/item.scss";

.font-color {
  color: #2b8dfe;
}

</style>
