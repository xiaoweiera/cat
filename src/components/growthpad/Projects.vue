<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import {
  mdxInfo,
  coinwindInfo,
  channelsInfo,
  growthInfo,
} from '/mock/growthpad/projectInfo'
import { getTimeStatus } from '~/components/growthpad/task/task'
const props = defineProps({
  title: String,
  projectName: String,
})
const mdxStatus = ref('')
const coinwindStatus = ref('')
const channelsStatus = ref('')
const growthpadStatus = ref('')
onMounted(() => {
  mdxStatus.value = getTimeStatus(mdxInfo)
  coinwindStatus.value = getTimeStatus(coinwindInfo)
  channelsStatus.value = getTimeStatus(channelsInfo)
  growthpadStatus.value = getTimeStatus(growthInfo)
})
</script>
<template>
  <div class="md:block hidden beginTxt">{{ props.title }}</div>
  <div>
    <div class="md:-m-3 md:flex md:flex-wrap">
      <div class="mt-6 w-full lg:w-1/3 md:w-1/2 md:px-3 md:min-w-96">
        <GrowthpadProject
          :value="
            mdxStatus === 'wait'
              ? mdxInfo.dashboard.begin
              : mdxInfo.dashboard.end
          "
          :status="mdxStatus"
          :project="mdxInfo"
        />
      </div>
      <div class="mt-6 w-full lg:w-1/3 md:w-1/2 md:px-3 md:min-w-96">
        <GrowthpadProject
          :value="
            coinwindStatus === 'wait'
              ? coinwindInfo.dashboard.begin
              : coinwindInfo.dashboard.end
          "
          :status="coinwindStatus"
          :project="coinwindInfo"
        />
      </div>
      <div class="mt-6 w-full lg:w-1/3 md:w-1/2 md:px-3 md:min-w-96">
        <GrowthpadProject
          :value="
            channelsStatus === 'wait'
              ? channelsInfo.dashboard.begin
              : channelsInfo.dashboard.end
          "
          :status="channelsStatus"
          :project="channelsInfo"
        />
      </div>
      <div
        v-if="!projectName"
        class="mt-6 w-full lg:w-1/3 md:w-1/2 md:px-3 md:min-w-96"
      >
        <GrowthpadProject
          :value="
            growthpadStatus === 'wait'
              ? growthInfo.dashboard.begin
              : growthInfo.dashboard.end
          "
          :status="growthpadStatus"
          :project="growthInfo"
        />
      </div>
    </div>
  </div>
</template>
