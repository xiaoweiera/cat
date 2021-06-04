<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import { Project } from '~/api/growtask'
import Task from '~/logic/growthpad/task'
// @ts-ignore
import { loading, ready } from '~/logic/growthpad/active'

const store = Task()

onBeforeMount(() => ready(store))
</script>
<template>
  <div v-show="!loading" class="pb-20">
    <growthpadTaskDashboard />

    <div class="pt-15 px-4 md:px-6">
      <growthpadTaskAdress />

      <template v-if="store.projectName === Project.coinwind">
        <growthpadTaskCoinwind></growthpadTaskCoinwind>
      </template>

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

      <growthpadTaskAbout></growthpadTaskAbout>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/styles/growthpad/task.scss';
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: examples
</route>
// @formatter:off
