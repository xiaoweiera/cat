<script setup lang="ts">
import { onBeforeMount } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
import { ProjectKey } from '~/logic/growthpad/config'
import Task from '~/logic/growthpad/task'
// @ts-ignore
import { loading, ready } from '~/logic/growthpad/active'
import { headerTag } from '~/store/header/login'

const store = Task()
onBeforeMount(() => {
  headerTag.name = 'GrowthPad'
  ready(store)
})

</script>
<template>
  <div v-show="!loading" class="examples pb-20">
    <growthpadTaskDashboard />

    <div class="pt-15 px-4 md:px-6">
      <template v-if="store.getNickName() === ProjectKey.heco">
        <growthpadHecoAddress/>
      </template>
      <template v-else>
        <growthpadTaskAdress>
          <template #default v-if="store.getNickName() === ProjectKey.chainwallet">
            <GrowthpadChainwalletReward/>
          </template>
        </growthpadTaskAdress>
      </template>

      <template v-if="store.projectName === ProjectKey.coinwind">
        <growthpadTaskCoinwind></growthpadTaskCoinwind>
      </template>

      <div>
        <h2 class="font-kdFang">{{ I18n.growthpad.growthTasks }}</h2>
        <p class="text-sm text-global-highTitle">{{ store.taskDetail.value }}</p>
        <div class="pb-15">
          <DotCountGroup class="pt-4">
            <ul class="task-list">
              <li
                v-for="(item, index) in store.taskList.value"
                :key="index"
                class="pb-7.5"
              >
                <template v-if="store.getNickName() === ProjectKey.chainwallet">
                  <growthpadChainwalletItem :data="item"></growthpadChainwalletItem>
                </template>
                <template v-else-if="store.getNickName() === ProjectKey.heco">
                  <growthpadChainwalletItem :data="item"></growthpadChainwalletItem>
                </template>
                <template v-else>
                  <growthpadTaskItem :expant="index < 1" :data="item" />
                </template>
              </li>
            </ul>
          </DotCountGroup>
        </div>
      </div>

      <growthpadTaskAbout></growthpadTaskAbout>
    </div>
    <template v-if="store.projectName === ProjectKey.chainwallet">
      <HelpFeedback>
        <GrowthpadChainwalletHelp/>
      </HelpFeedback>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '~/styles/growthpad/task.scss';
.examples {
  max-width: 848px;
  margin: 0 auto;
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: examples
</route>
// @formatter:off
