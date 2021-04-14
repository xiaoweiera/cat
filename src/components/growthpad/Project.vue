<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { ProjectInfo } from '~/types/growthpad'

const { t } = useI18n()

const props = defineProps({
  project: Object as PropType<ProjectInfo>,
  title: String,
  status: String,
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

const tipImg = () => {
  let src = ''
  if (props.project.status === 'doing' || props.project.status === 'done') {
    src = 'https://res.ikingdata.com/nav/doing.png'
  }
  else {
    src = 'https://res.ikingdata.com/nav/over.png'
  }
  return src
}

/**
 * 按钮颜色样式
 **/
const projectBtnStyle = () => {
  const style = {}
  if (props.project.status === 'done') {
    style.backgroundColor = '#0EC674'
    return style
  }
  else if (props.project.status === 'doing') {
    style.backgroundColor = '#2B8DFE'
    return style
  }
  else if (props.project.status === 'over') {
    style.backgroundColor = '#ffffff'
    style.opacity = 0.3
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
  <div class="project  font-kdFang relative">
    <!--    <img style="border-radius: 13px" class="absolute  w-full  h-full left-0 top-0 z-1 " src="https://res.ikingdata.com/nav/cardBgnoBroder.png" alt="">-->
    <!--    <div class="absolute right-0 top-0 h-32 w-32 bg-no-repeat bg-center" :style=" rightTopImageStyle() "/>-->
    <div class="relative z-2">
      <p v-if="status==='progress'" class="text-center flex flex-col text-global-highTitle text-kd24px150">{{
          title
        }}</p>
      <img v-if="status==='doing' || status==='done'" class="absolute opacity-6 right-3.5 top-2.5  w-43 h-43"
           :src="tipImg()" alt=""
      >
      <div v-if="status!=='progress'" class="flex">
        <div>
          <div class="flex items-center">
            <img class="w-10.5 h-10.5" src="https://res.ikingdata.com/nav/payLogo.png" alt="">
            <div class="ml-2 text-kd24px150 font-medium text-global-highTitle">MDEX</div>
            <div v-if="status==='doing'"
                 class="font-medium bg-global-primary bg-opacity-12 time px-3 ml-4 py-1.5 text-global-primary text-kd14px18px"
            >
              ⏱ {{ t('project.status.coming') }}
            </div>
          </div>
          <div class="text-kd14px20px mt-2   text-global-default opacity-65 font-normal">
            HECO上最大的DEX交易所HECO上最大的DEX交易所HECO上最大的DEX...
          </div>
        </div>
        <img v-if="status==='over'" class=" opacity-80 relative left-1 -top-0.5 shadows   w-30 h-30.5" :src="tipImg()"
             alt=""
        >
      </div>
      <div class="flex  mt-6 items-center font-normal">
        <p class="desc">{{ t('project.award_number') }}</p>
        <p class="ml-8 text-kd14px18px">{{ props.project?.reward_total || '-' }}</p>
      </div>
      <div class="flex blockItem">
        <p class="desc">{{ t('project.reward_value') }}</p>
        <p class="ml-8 text-kd14px18px">{{ props.project?.reward_value || '-' }}</p>
      </div>
      <div class="flex blockItem">
        <p class="desc">{{ t('project.per_person') }}</p>
        <p class="ml-8 text-kd14px18px">{{ props.project?.reward_1_person || '-' }}</p>
      </div>
      <div v-if="status!=='over'" class="flex mt-3 items-end  font-normal ">
        <p class="desc">{{ t('t.remaing_time') }}</p>
        <div class="ml-8 flex  text-left items-center  justify-center text-global-primary ">
          <div class="flex items-end">
            <div class="text-kd24px110 font-bold font-kdExp">00</div>
            <div class="ml-1 text-kd12px18px" style="font-size:12px">{{ t('project.day') }}</div>
          </div>
          <div class="flex ml-2 items-end">
            <div class="text-kd24px110 font-bold font-kdExp">00</div>
            <div class="ml-1 text-kd12px18px">{{ t('project.hour') }}</div>
          </div>
          <div class="flex ml-2 items-end">
            <div class="text-kd24px110 font-bold font-kdExp">00</div>
            <div class="ml-1 text-kd12px18px ">{{ t('project.minute') }}</div>
          </div>
        </div>
      </div>
      <div v-if="status!=='progress'" :style="projectBtnStyle()" @click="go(props.project.slug)"
           class="flex items-center justify-center text- mt-6 bg-global-primary py-2.5 px-3 goButton"
      >
        <div
            :class="status==='over'?'text-global-primary text-kd14px18px font-medium':'text-white text-kd14px18px font-medium'"
        >
          参与预热任务
        </div>
        <img class="ml-1.5" src="https://res.ikingdata.com/nav/goTip.svg" alt="">
      </div>
      <!--    <div class="project-default-btn"  @click="go(props.project.slug)">-->
      <!--      立即参与 ->-->
      <!--    </div>-->
    </div>
  </div>
</template>

<style scoped>

.project {
  background: linear-gradient(180deg, #F6F7FF 0%, #DDEAFD 100%);
  box-shadow: 0px 12px 42px -12px rgba(43, 141, 255, 0.26), inset 0px -3px 66px rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  @apply relative p-6  w-full;
}

.shadows {
  filter: drop-shadow(0px 0px 20px rgba(43, 141, 254, 0.16));
}

.time {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 50px;
}

.desc {
  width: 70px;
  @apply text-global-defalut opacity-65 text-kd14px18px ;
}

.goButton {
  border-radius: 44px;

}

.right-logo {
  @apply h-32;
}

.blockItem {
  @apply items-center mt-3 font-normal
}

.project-default-btn {
  @apply mx-auto w-full text-center flex items-center justify-center rounded-large cursor-pointer;
}
</style>
