<script setup lang="ts">
import { defineProps } from 'vue'

import type { ProjectInfo, ProjectStatus } from '~/types/growthpad'

const props = defineProps({
  project: Object as PropType<ProjectInfo>,
  title: String,
})

const formatRemainder = (ts: number | undefined): String => {
  if (ts === 0 || ts === undefined) {
    return '00 天 00小时 00分钟'
  }
  return ''
}

/**
 * 右侧背景图片
 **/
const rightTopImageStyle = () => {
  const style = {}
  if (props.project.status === 'done') {
    style.backgroundImage = 'url("growthpad/join-button.svg")'
  }
  else if (props.project.chain === 'Heco') {
    style.backgroundImage = 'url("growthpad/feature1.svg")'
  }
  return style
}

/**
 * 按钮颜色样式
 **/
const projectBtnStyle = () => {
  const style = {}
  if (props.project.status === 'done') {
    style.backgroundColor = 'none'
    return style
  }
  if (props.project.status === 'progress') {
    if (props.project.active === true) {
      style.backgroundColor = '#368'
      return style
    }
    style.backgroundColor = 'red'
    return style
  }
  style.backgroundColor = 'green'
  return style
}


</script>
<template>
  <div class="project relative">
    <div class="absolute right-0 top-0 h-32 w-32 bg-no-repeat bg-center" :style=" rightTopImageStyle() "/>
    <p class="text-center mb-4">{{ title }}</p>
    <div class="flex">
      <p class="desc">奖励数量</p>
      <p class="ml-2 m-1">{{ props.project?.reward_total || '-' }}</p>
    </div>
    <div class="flex">
      <p class="desc">奖励价值</p>
      <p class="ml-2 m-1">{{ props.project?.reward_value || '-' }}</p>
    </div>
    <div class="flex">
      <p class="desc">每人可领取</p>
      <p class="ml-2 m-1">{{ props.project?.reward_1_person || '-' }}</p>
    </div>
    <div class="flex">
      <div v-if="props.active">
        <p class="desc">距奖励距离</p>
        <p class="ml-2 m-1">{{ formatRemainder(props.project?.start_ts) }}</p>
      </div>
    </div>
    <div class="project-default-btn" :style="projectBtnStyle()">
      立即参与 ->
    </div>
  </div>
</template>

<style scoped>
.project {
  background: linear-gradient(180deg, #F8F9FF 0%, rgba(248, 249, 255, 0.6) 100%);
  width: 384px;
  height: 338px;

  @apply shadow-lg p-5 m-5;
}

.desc {
  width: 120px;
  @apply m-1;
}

.right-logo {
  @apply h-32;
}

.project-default-btn {
  @apply mx-auto w-full text-center flex items-center justify-center h-10 rounded-large cursor-pointer;
}
</style>
