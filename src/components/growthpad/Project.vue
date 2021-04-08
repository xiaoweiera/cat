<script setup lang="ts">
import { defineProps } from 'vue'

import type { ProjectInfo, ProjectStatus } from '~/types/growthpad'

const props = defineProps({
  project: Object as PropType<ProjectInfo>,
})
const formatRemainder = (ts: number | undefined): String => {
  if (ts === 0 || ts === undefined) {
    return '00 天 00小时 00分钟'
  }
  return ''
}
</script>
<template>
  <div class="project">
    <p class="text-center">即将开始</p>
    <div class="flex">
      <p class="desc">奖励数量</p>
      <p class="ml-2">{{ props.project?.reward_total || '-' }}</p>
    </div>
    <div class="flex">
      <p class="desc">奖励价值</p>
      <p class="ml-2">{{ props.project?.reward_value || '-' }}</p>
    </div>
    <div class="flex">
      <p class="desc">每人可领取</p>
      <p class="ml-2">{{ props.project?.reward_1_person || '-' }}</p>
    </div>
    <div class="flex">
      <p class="desc">距奖励距离</p>
      <p class="ml-2">{{ formatRemainder(props.project?.start_ts) }}</p>
    </div>
  </div>
</template>

<style scoped>
.project {
  background: linear-gradient(180deg, #F8F9FF 0%, rgba(248, 249, 255, 0.6) 100%);
  width: 320px;
  height: 200px;

  @apply shadow-md p-5;
}

.desc {
  width: 120px;
}
</style>
