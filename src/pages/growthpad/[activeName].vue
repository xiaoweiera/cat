<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, computed } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const store = Task()

onMounted(async() => {
  await store.init()
})
</script>
<template>
  <div class="container flex">
    <div class="flex-1">
      <growthpadTaskDasboard />

      <growthpadTaskAdress />

      <div>
        <h2>奖励任务</h2>
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
    </div>
    <div class="ml-15 tips hidden md:block">
      <div class="w-full pt-15">
        <div>
          <p>{{ I18n.growthpad.examples.countdown.title }}</p>
          <TimeCountdown :value="store.dashboard.begin" />
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
