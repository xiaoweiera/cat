<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import { Project } from '~/api/growtask'
import Task from '~/logic/growthpad/task'
import { wxShare } from '~/lib/wxShare'
const store = Task()

const loading = ref<boolean>(true)

// 获取分享地址
const getShare = () => {
  if (window.location.href.toLowerCase().includes('mdx')) {
    wxShare('Mdex增长-GrowthPad', '做任务支持MDEX，领百万token奖励')
  } else if (window.location.href.toLowerCase().includes('coinwind')) {
    wxShare('CoinWind增长-GrowthPad', '做任务支持CoinWind，领百万token奖励')
  } else if (window.location.href.toLowerCase().includes('channels')) {
    wxShare('Channels增长-GrowthPad', '做任务支持Channels，领百万token奖励')
  }
}
onBeforeMount(async() => {
  getShare()
  // @ts-ignore
  // 判断 URL 地址是否正确
  switch (store.projectName) {
  case Project.coinwind:
  case Project.mdx:
  case Project.channels:
    loading.value = false
    // 初始化项目数据
    await store.init()
    break
  default:
    window.location.href = `/growthpad${window.location.search}`
    break
  }
})
</script>
<template>
  <div v-show="!loading" class="pb-20">
    <growthpadTaskDashboard />

    <div class="px-4 md:px-6">
      <growthpadTaskAdress class="pt-15" />

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
.task-list {
  li {
    position: relative;
    &:after {
      position: absolute;
      content: '';
      width: 1px;
      background: rgba(37, 62, 111, 0.1);
      top: 30px;
      bottom: 6px;
      left: 12px;
    }
    &:last-child {
      padding-bottom: 0 !important;
      &:after {
        content: none;
      }
    }
  }
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: examples
</route>
// @formatter:off
