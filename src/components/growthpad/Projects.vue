<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps, ref, onMounted, reactive } from 'vue'
import {
  mdxInfo,
  coinwindInfo,
  channelsInfo,
} from '/mock/growthpad/projectInfo'
import { getTimeStatus } from '~/components/growthpad/task/task'
const mdxStatus = ref('')
const coinwindStatus = ref('')
const channelsStatus = ref('')
onMounted(() => {
  mdxStatus.value = getTimeStatus(mdxInfo)
  coinwindStatus.value = getTimeStatus(coinwindInfo)
  channelsStatus.value = getTimeStatus(channelsInfo)
})
</script>
<template>
  <div
    class="
      grid grid-cols-1
      mt-4
      md:mt-6
      gap-4
      md:gap-6
      md:mt-6
      lg:grid-cols-2
      xl:grid-cols-3
    "
  >
    <div class="w-full projectContainer">
      <GrowthpadProject
        :value="
          mdxStatus.value === 'wait'
            ? mdxInfo.dashboard.end
            : mdxInfo.dashboard.begin
        "
        :status="mdxStatus"
        :project="mdxInfo"
      />
    </div>
    <div class="w-full projectContainer">
      <GrowthpadProject
        :value="
          coinwindStatus.value === 'wait'
            ? coinwindInfo.dashboard.end
            : coinwindInfo.dashboard.begin
        "
        :status="coinwindStatus"
        :project="coinwindInfo"
      />
    </div>
    <div class="w-full projectContainer">
      <GrowthpadProject
        :value="
          channelsStatus.value === 'wait'
            ? channelsInfo.dashboard.end
            : channelsInfo.dashboard.begin
        "
        :status="channelsStatus"
        :project="channelsInfo"
      />
    </div>
  </div>
</template>
