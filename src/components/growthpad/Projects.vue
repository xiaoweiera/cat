<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import {
  mdxInfo,
  coinwindInfo,
  channelsInfo,
} from '/mock/growthpad/projectInfo'
import { getTimeStatus } from '~/components/growthpad/task/task'
const props = defineProps({
  title: String,
})
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
  <div class="md:block hidden beginTxt">{{ props.title }}</div>
  <div class="md:mt-6 flex justify-between flex-wrap">
    <div class="w-full md:max-w-97 mt-4">
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
    <div class="w-full md:max-w-97 mt-4">
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
    <div class="w-full md:max-w-97 mt-4">
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
