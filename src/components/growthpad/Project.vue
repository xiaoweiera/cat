<script setup lang="ts">
// @ts-ignore
import { formatCash, toNumber } from '~/utils/index'
// @ts-ignore
import { TimeStatus } from '~/components/growthpad/task/task'

import { defineProps, computed } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
const props = defineProps({
  status: String,
  project: Object,
  value: [String, Number],
})

// @ts-ignore
const imgs = {
  MDEX: 'https://res.ikingdata.com/nav/mdexStatus.png',
  CoinWind: 'https://res.ikingdata.com/nav/coinwindStatus.png',
  Channels: 'https://res.ikingdata.com/nav/channelsStatus.png',
  ChainWallet: 'https://res.ikingdata.com/nav/chainwalletStatus.png'
}
// @ts-ignore
const timerValue = computed<string>((): string => {
  // @ts-ignore
  if (props.status === TimeStatus.wait) {
    // @ts-ignore
    return props.project.dashboard.begin
  }
  // @ts-ignore
  if (props.status === TimeStatus.ing) {
    // @ts-ignore
    return props.project.dashboard.end
  }
  return ''
})

</script>
<template>
  <div class="project reative font-kdFang relative i8n-font-en-inter">
    <div class="relative z-2">
      <div class="flex items-center">
        <img :src="props.project.icon" class="w-10.5"/>
        <div class="text-kd24px36px ml-2 font-medium">{{ props.project.title }}</div>
        <div v-if="props.status !== TimeStatus.closure" :class="{'statusTxtWait': props.status === TimeStatus.wait, 'statusTxtIng': props.status !== TimeStatus.wait}">
          <span v-if="props.status === TimeStatus.wait">
            <span>⏱</span>
            <span class="ml-1">{{ I18n.growthpadShow.coming }}</span>
          </span>
          <span v-else>
            <span>🔥</span>
            <span class="ml-1">{{ I18n.growthpadShow.ongoing }}</span>
          </span>
        </div>
      </div>
      <div class="overDes">
        <div :class="{'max-w-43': props.status === TimeStatus.closure}">{{ props.project.dashboard.description }}</div>
        <img v-if="props.status === TimeStatus.closure" class="w-30 absolute top-4 right-0" src="https://res.ikingdata.com/nav/grothpadOver.png"/>
      </div>
      <div class="flex mt-6 items-center font-normal">
        <p class="desc">{{ I18n.growthpadShow.reward }}</p>
        <p class="projectNum">{{ props.project.dashboard.reward.countStr }}</p>
      </div>
      <!--      <div class="flex blockItem">-->
      <!--        <p class="desc">{{ I18n.growthpadShow.values }}</p>-->
      <!--        <p class="projectNum">${{ cost }}</p>-->
      <!--      </div>-->

      <div class="flex blockItem" :class="{ 'v-hidden': props.project.projectName === 'Growth' }">
        <p class="desc">{{ I18n.growthpadShow.perPersion }}</p>
        <p class="projectNum">
          {{ formatCash(props.project.dashboard.reward.limits[0]) }}
          {{ props.project.coin }}
        </p>
      </div>

      <div class="flex blockItem" v-if="props.project.website">
        <p class="desc">{{ I18n.growthpad.about.website }}</p>
        <p class="projectNum">
          <a class="link" :href="`https://${props.project.website}`" target="_blank">{{ props.project.website }}</a>
        </p>
      </div>

      <!-- 活动倒计时 -->
      <GrowthpadTimer class="w-full mt-3" :class="props.status + 'Color'" :value="timerValue">
        <template #label>
          <div class="desc whitespace-nowrap mr-8">
            <span>{{props.status === TimeStatus.wait ? I18n.growthpadShow.timeBegin : I18n.growthpadShow.timeLeft }}</span>
          </div>
        </template>
      </GrowthpadTimer>

      <!-- 提示 -->
      <div class="flex blockItem mt-3" v-if="props.project.warn">
        <p class="projectNum" style="margin: 0;">
          <a class="link">{{ props.project.warn }}</a>
        </p>
      </div>

      <GrowthpadIndexProjectButton :url="props.project.url" :status="props.status"/>
    </div>
    <img v-if="props.status !== TimeStatus.closure" class="w-40 absolute top-4 right-5" :src="imgs[props.project.title]"/>
  </div>
</template>

<style scoped lang="scss">
.v-hidden {
  visibility: hidden;
}
.ingColor {
  color: #0ec674;
}
.waitColor {
  color: #2b8dfe;
}
.closureColor {
  color: #2b8dfe !important;
}
.itemTxt {
  @apply ml-8 flex text-left items-center justify-center;
}
.projectNum {
  @apply ml-8 text-kd14px18px font-kdExp text-global-default;
}
.overDes {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @apply mt-2 text-kd14px20px text-global-default opacity-65;
}
.noOverDes {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  @apply m-2 text-kd14px20px text-global-default opacity-65;
}
.statusTxtWait {
  padding: 6px 12px;
  background: rgba(43, 141, 254, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 50px;
  @apply text-kd14px18px text-global-primary font-kdFang font-medium  ml-4;
}
.statusTxtIng {
  padding: 6px 12px;
  background: rgba(30, 209, 130, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  color: rgba(0, 180, 100, 1);
  border-radius: 50px;
  @apply text-kd14px18px  font-kdFang font-medium  ml-4;
}

.project {
  background: linear-gradient(180deg, #f6f7ff 0%, #ddeafd 100%);
  box-shadow: 0px 12px 42px -12px rgba(43, 141, 255, 0.26),
    inset 0px -3px 66px rgba(255, 255, 255, 0.7);
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
  width: 100px;
  min-width: 70px;
  color: rgba(37, 62, 111, 0.65);
  font-family: i8n-font-inter !important;
  @apply text-kd14px18px;
}

.goButton {
  border-radius: 44px;
}

.right-logo {
  @apply h-32;
}

.blockItem {
  @apply items-center mt-3 font-normal;
}

.project-default-btn {
  @apply mx-auto w-full text-center flex items-center justify-center rounded-large cursor-pointer;
}
</style>
