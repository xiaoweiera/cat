<script setup lang="ts">
import { onBeforeMount } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
// @ts-ignore
import { loading, ready } from '~/logic/growthpad/active'

const store = Task()

onBeforeMount(() => ready(store))

const countLable = I18n.growthpad.growthpad.dashboard.reward.count
const valueLabel = I18n.growthpad.growthpad.dashboard.reward.value
const personLabel = I18n.growthpad.growthpad.dashboard.reward.person
</script>
<template>
  <div v-show="!loading">
    <div class="examples">
      <growthpadTaskDashboard
        :reward-count-title="countLable"
        :reward-value-title="valueLabel"
        :reward-person-title="personLabel"
      />

      <div class="pt-15 px-4 md:px-6">
        <growthpadTaskAdress />

        <div>
          <h2 class="font-kdFang">{{ I18n.growthpad.growthTasks }}</h2>
          <div class="pb-15">
            <DotCountGroup class="pt-4">
              <ul class="task-list">
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
    </div>
    <!--  即将开始-->
    <div class="progress px-4 pb-20">
      <div class="text-left mt-4 md:mt-15 md:mt-20">
        <GrowthpadProjects :title="I18n.growthpadShow.projectState" />
      </div>

      <div class="pt-15">
        <growthpadTaskAbout></growthpadTaskAbout>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/styles/growthpad/task.scss';

.examples {
  max-width: 848px;
  margin: 0 auto;
}
.progress {
  max-width: 1000px;
  margin: 0 auto;
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: examples
</route>
// @formatter:off
