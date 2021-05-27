<script setup lang="ts">
import { defineProps, computed } from 'vue'
// @ts-ignore
import { uuid, getMin, getMax, makeDescription } from './task'
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
  },
})

// 判断任务类型是否为阳光普照
// @ts-ignore
const isAllIn = computed((): boolean => {
  return props.data?.type === TaskType.allin
})
// @ts-ignore
const isWeibo = computed((): boolean => {
  return props.data?.type === TaskType.weibo
})
</script>

<template>
  <div class="flex">
    <DotCount size="sm" />
    <div class="flex-1 ml-2.5">
      <!-- 默认展开或者任务类型为阳光普照 -->
      <template v-if="expant || isAllIn">
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
      <label class="task-content block" :for="data.id">
        <GrowthpadTaskTitle
          :data="data"
          class="flex justify-between items-center"
        >
          <template v-if="!isAllIn" #right>
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
      <div v-if="isAllIn" class="task-children w-full">
        <!--分享-->
        <div class="no-count task-item mt-1.5 py-1.5 pr-1.5 pl-3">
          <GrowthpadTaskShare></GrowthpadTaskShare>
        </div>
      </div>
      <div v-else-if="isWeibo" class="task-children w-full">
        <!--分享-->
        <div class="no-count task-item mt-1.5 py-1.5 pr-1.5 pl-3">
          <GrowthpadTaskWeibo></GrowthpadTaskWeibo>
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
.icon-arrow-down {
  transform: rotate(180deg);
}
.icon-arrow-up,
.icon-arrow-down {
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
}

.task-radio {
  display: none;
  & ~ .task-content .icon-arrow-down {
    display: inline-block;
  }
  & ~ .task-children,
  & ~ .task-content .icon-arrow-up {
    display: none;
  }
  &:checked {
    & ~ .task-children,
    & ~ .task-content .icon-arrow-up {
      display: inline-block;
    }
    & ~ .task-content .icon-arrow-down {
      display: none;
    }
  }
}

.task-children {
  counter-reset: number;
}

.task-item {
  padding-left: 36px;
  position: relative;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(43, 141, 254, 0.08) 0%,
    rgba(43, 141, 254, 0) 100%
  );
  &:before {
    counter-increment: number;
    content: counter(number);
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    color: #2b8dfe;
    font-size: 20px;
  }
  &.no-count {
    padding-left: 12px;
    &:before {
      content: none;
    }
  }
}
</style>
