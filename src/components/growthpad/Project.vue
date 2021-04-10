<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

import type { ProjectInfo } from '~/types/growthpad'



const props = defineProps({
  project: Object as PropType<ProjectInfo>,
  title: String,
})

const router = useRouter()
const formatRemainder = (ts: number | undefined): String => {
  if (ts === 0 || ts === undefined) {
    return '00 天 00小时 00分钟'
  }
  return '00 天 00小时 00分钟'
}

const go = (value: String) => {
  router.push(`/growthpad/${encodeURIComponent(value)}`)
}

/**
 * 右侧背景图片
 **/
const rightTopImageStyle = () => {
  const style = {}
  if (props.project.status === 'done') {
    style.backgroundImage = 'url("/assets/growthpad/join-button.svg")'
  }
  else if (props.project.chain === 'Heco') {
    style.backgroundImage = 'url("/assets/growthpad/feature1.svg")'
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
  <div class="project font-kdFang ">
<!--    <div class="absolute right-0 top-0 h-32 w-32 bg-no-repeat bg-center" :style=" rightTopImageStyle() "/>-->
    <p class="text-center text-global-highTitle text-kd24px150">{{ title }}</p>
    <div class="flex  mt-6 items-center font-normal">
      <p class="desc">奖励数量</p>
      <p class="ml-8 text-kd14px18px">{{ props.project?.reward_total || '-' }}</p>
    </div>
    <div class="flex blockItem">
      <p class="desc">奖励价值</p>
      <p class="ml-8 text-kd14px18px">{{ props.project?.reward_value || '-' }}</p>
    </div>
    <div class="flex blockItem">
      <p class="desc">每人可领取</p>
      <p class="ml-8 text-kd14px18px">{{ props.project?.reward_1_person || '-' }}</p>
    </div>
    <div class="flex mt-3 items-end  font-normal ">
      <p class="desc">距奖励距离</p>
      <div class="ml-8 flex  text-left items-center  justify-center text-global-primary ">
        <div class="flex items-end">
          <div class="text-kd24px110 font-bold font-kdExp">00</div>
          <div class="ml-1">天</div>
        </div>
        <div class="flex ml-2 items-end">
          <div class="text-kd24px110 font-bold font-kdExp">00</div>
          <div class="ml-1">小时</div>
        </div>
        <div class="flex ml-2 items-end">
          <div class="text-kd24px110 font-bold font-kdExp">00</div>
          <div class="ml-1">分钟</div>
        </div>
      </div>
    </div>

<!--    <div class="project-default-btn" :style="projectBtnStyle()" @click="go(props.project.slug)">-->
<!--      立即参与 ->-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.project {
  background: linear-gradient(180deg, #F8F9FF 0%, rgba(248, 249, 255, 0.6) 100%);
  border: 1px solid rgba(43, 141, 255, 0.08);
  box-sizing: border-box;
  box-shadow: 0px 12px 42px -12px rgba(43, 141, 255, 0.26);
  border-radius: 12px;
  @apply   relative p-6  w-full;
}

.desc {
  width:70px;
  @apply  text-global-defalut opacity-65 text-kd14px18px ;
}

.right-logo {
  @apply h-32;
}
.blockItem{
  @apply items-center mt-3 font-normal
}
.project-default-btn {
  @apply mx-auto w-full text-center flex items-center justify-center rounded-large cursor-pointer;
}
</style>
