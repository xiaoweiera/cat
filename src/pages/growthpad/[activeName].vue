<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, computed, watch, ref } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const format = 'YYYY-MM-DD HH:mm:ss'
const store = Task()
const timeType = ref('')
// 获取倒计时类型
const getTimeType = () => {
  // 当前时间
  const now = dayjs().valueOf()
  const time = dayjs(store.dashboard.begin, format)
  const duration = time.valueOf() - now
  if (duration > 0) {
    timeType.value = 'begin'
  } else {
    timeType.value = 'end'
  }
}
onMounted(async() => {
  getTimeType()
  await store.init()
})
</script>
<template>
  <div class="container flex px-4 pb-20 md:px-0">
    <div class="flex-1">
      <growthpadTaskDasboard />

      <div class="w-full pt-5 pb-15 md:hidden">
        <div v-if="timeType === 'begin'">
          <p class="text-kd14px18px font-kdFang text-global-default">
            {{ I18n.growthpad.examples.countdown.title }}
          </p>
          <TimeCountdown :value="store.dashboard.begin" />
        </div>
        <div v-else>
          <p class="text-kd14px18px font-kdFang text-global-default">
            {{ I18n.growthpad.examples.countdown.endTitle }}
          </p>
          <TimeCountdown :value="store.dashboard.end" />
        </div>
      </div>

      <growthpadTaskAdress class="md:pt-15" />

      <div>
        <h2 class="font-kdFang">奖励任务</h2>
        <div class="pb-15">
          <DotCountGroup class="pt-4">
            <ul>
              <li
                v-for="(item, index) in store.taskList.value"
                :key="index"
                class="pb-7.5"
              >
                <growthpadTaskItem :expant="index < 1" :data="item" />
              </li>
            </ul>
          </DotCountGroup>
        </div>
      </div>

      <growthpadTaskAbout></growthpadTaskAbout>
    </div>
    <div class="ml-15 tips hidden md:block">
      <div class="w-full pt-15">
        <div v-if="timeType === 'begin'">
          <p class="text-kd14px18px font-kdFang text-global-default">
            {{ I18n.growthpad.examples.countdown.title }}
          </p>
          <TimeCountdown :value="store.dashboard.begin" />
        </div>
        <div v-else>
          <p class="text-kd14px18px font-kdFang text-global-default">
            {{ I18n.growthpad.examples.countdown.endTitle }}
          </p>
          <TimeCountdown :value="store.dashboard.end" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
h2 {
  color: #033666;
  font-size: 18px;
  font-weight: 500;
}

.tips {
  width: 220px;
}

.sub {
  color: rgba(37, 62, 111, 0.65);
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: examples
</route>
// @formatter:off
