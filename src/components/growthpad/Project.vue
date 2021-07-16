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

const TaskStyle = computed<string>(function() {
  if (props.status === TimeStatus.closure) {
    return `background-image: url("https://res.ikingdata.com/nav/grothpadOver.png")`
  }
  if (imgs[props.project.title]) {
    const src = imgs[props.project.title]
    console.log(src)
    return `background-image: url("${src}")`
  }
  return ''
})

const isVisible = function(value: any) {
  if (value) {
    return ''
  }
  return 'hidden'
}

</script>
<template>
  <div class="relative rounded-xl item-detail font-kdFang p-6">
    <div class="absolute top-6 right-6 bottom-6 left-6 task-bg z-0" :class="props.status" :style="TaskStyle"></div>
    <div class="relative z-10">
      <div class="flex items-center">
        <!-- 项目 ICON -->
        <IconFont :type="props.project.icon" size="4xl"></IconFont>
        <!-- 项目 名称 -->
        <span class="text-2xl ml-2 text-global-highTitle">{{ props.project.title }}</span>
        <!-- 项目 状态 -->
        <div class="task-status py-1.5 px-3 bg-white bg-opacity-20 text-sm ml-4" :class="props.status">
          <span v-if="props.status === TimeStatus.wait">
            <span>⏱</span>
            <span class="ml-1">{{ I18n.growthpadShow.coming }}</span>
          </span>
          <span v-else-if="props.status === TimeStatus.ing">
            <span>🔥</span>
            <span class="ml-1">{{ I18n.growthpadShow.ongoing }}</span>
          </span>
        </div>
      </div>
      <div class="py-2">
        <p class="text-sm leading-5 text-global-default text-opacity-65 description">{{ props.project.dashboard.description }}</p>
      </div>
      <ul class="pt-2.5 min-h-28">
        <li class="py-1.5 text-sm text-global-default text-opacity-65" :class="isVisible(props.project.dashboard.reward.countStr)">
          <label class="label mr-8">{{ I18n.growthpadShow.reward }}</label>
          <span>{{ props.project.dashboard.reward.countStr }}</span>
        </li>
        <li class="py-1.5 text-sm text-global-default text-opacity-65" :class="isVisible(props.project.dashboard.reward.limits[0])">
          <label class="label mr-8">{{ I18n.growthpadShow.perPersion }}</label>
          <span>
            {{ formatCash(props.project.dashboard.reward.limits[0]) }}{{ props.project.coin }}
          </span>
        </li>
        <li class="py-1.5 text-sm text-global-default text-opacity-65" v-if="props.project.website">
          <label class="label mr-8">{{ I18n.growthpad.about.website }}</label>
          <span>
            <a class="link" :href="`https://${props.project.website}`" target="_blank">{{ props.project.website }}</a>
          </span>
        </li>
        <li class="py-1.5 text-sm" v-if="timerValue && props.status !== TimeStatus.closure">
          <GrowthpadTimer class="w-full task-time" :class="props.status" :value="timerValue">
            <template #label>
              <div class="label whitespace-nowrap mr-8 text-global-default text-opacity-65">
                <span>{{props.status === TimeStatus.wait ? I18n.growthpadShow.timeBegin : I18n.growthpadShow.timeLeft }}</span>
              </div>
            </template>
          </GrowthpadTimer>
        </li>
        <li class="py-1.5 text-sm" v-if="props.project.warn">
          <span class="text-global-primary">{{ props.project.warn }}</span>
        </li>
      </ul>
      <GrowthpadIndexProjectButton :url="props.project.url" :status="props.status"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .item-detail {
    background: linear-gradient(180deg, #F8F9FF 0%, rgba(248, 249, 255, 0.6) 100%);
    border: 1px solid rgba(43, 141, 255, 0.08);
    box-shadow: 0 0 12px rgba(43, 141, 255, 0.26);
  }

  .task-bg {
    background-size: 10rem 10rem;
    background-position: top right;
    background-repeat: no-repeat;
    &.closure {
      background-size: 7.5rem 7.5rem;
      @apply opacity-50;
    }
  }

  .task-status {
    border-radius: 50px;
    &.wait {
      background: rgba(43, 141, 254, 0.12);
      @apply text-global-primary;
    }
    &.ing {
      background: rgba(30, 209, 130, 0.14);
      color: rgba(0, 180, 100, 1);
    }
  }

  .task-time {
    &.wait {
      @apply text-global-primary;
    }
    &.ing {
      color: #00B464;
    }
    &.closure {
      color: #00B464;
    }
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .label {
    width: 100px;
    min-width: 70px;
    display: inline-block;
  }
</style>
