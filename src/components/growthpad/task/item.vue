<script setup lang="ts">
import { defineProps } from 'vue'
// @ts-ignore
import { uuid, getMin, getMax } from './task'
import TaskType from '~/logic/growthpad/tasktype'
const props = defineProps({
  expant: {
    type: Boolean,
    default() {
      return false
    },
  },
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
      <!-- 默认展开或者任务类型为阳光普照 -->
      <template v-if="expant || equal(TaskType.allin)">
        <input
          :id="data.id"
          class="task-radio"
          type="checkbox"
          checked
          :name="data.id"
        />
      </template>
      <template v-else>
        <input
          :id="data.id"
          class="task-radio"
          type="checkbox"
          :name="data.id"
        />
      </template>
      <label
        class="task-content block"
        :for="!equal(TaskType.allin) ? data.id : ''"
      >
        <GrowthpadTaskTitle
          :data="data"
          class="flex justify-between items-center"
        >
          <template v-if="!equal(TaskType.allin)" #right>
            <span class="inline-block hand pl-3 md:pl-0">
              <GrowthpadTaskReward :data="data">
                <span class="inline-block ml-1.5">
                  <span class="inline-block">
                    <IconFont
                      type="arrow"
                      suffix="png"
                      class="icon-arrow-up"
                    ></IconFont>
                    <IconFont
                      type="arrow"
                      suffix="png"
                      class="icon-arrow-down"
                    ></IconFont>
                  </span>
                </span>
              </GrowthpadTaskReward>
            </span>
          </template>
        </GrowthpadTaskTitle>
      </label>
      <div v-if="equal(TaskType.allin)" class="task-children w-full">
        <!--阳光普照 分享-->
        <div class="no-count task-item mt-1.5 py-1.5 pr-1.5 pl-3">
          <GrowthpadTaskShare></GrowthpadTaskShare>
        </div>
      </div>
      <div v-else-if="equal(TaskType.weibo)" class="task-children w-full">
        <!--微博文章-->
        <div class="no-count task-item mt-1.5 py-1.5 pr-1.5 pl-3">
          <GrowthpadTaskWeibo></GrowthpadTaskWeibo>
        </div>
      </div>
      <div v-else-if="equal(TaskType.friends)" class="task-children w-full">
        <!--朋友圈-->
        <div class="mt-1.5 py-1.5 pr-1.5">
          <GrowthpadTaskSubFriend></GrowthpadTaskSubFriend>
        </div>
      </div>
      <div v-else-if="equal(TaskType.groups)" class="task-children w-full">
        <!--聊天群-->
        <div class="mt-1.5 py-1.5 pr-1.5">
          <GrowthpadTaskSubGroup></GrowthpadTaskSubGroup>
        </div>
      </div>
      <template v-else>
        <ul
          v-if="data.children && data.children.length > 0"
          class="task-children py-1.5 block w-full"
        >
          <li
            v-for="(item, index) in data.children"
            :key="index"
            class="task-item mt-1.5 py-1.5 pr-1.5 pl-3 block"
          >
            <GrowthpadTaskChild class="ml-3" :data="item"></GrowthpadTaskChild>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./item.scss";
</style>
