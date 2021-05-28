<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps, ref, onMounted, reactive } from 'vue'
import { mdxInfo, kingInfo, chanelInfo } from '/mock/growthpad/projectInfo'
import { getTimeStatus } from '~/components/growthpad/task/task'
const mdxStatus = ref('')
const kingStatus = ref('')
const chanelStatus = ref('')
onMounted(() => {
  mdxStatus.value = getTimeStatus(mdxInfo)
  kingStatus.value = getTimeStatus(kingInfo)
  chanelStatus.value = getTimeStatus(chanelInfo)
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
          kingStatus.value === 'wait'
            ? kingInfo.dashboard.end
            : kingInfo.dashboard.begin
        "
        :status="kingStatus"
        :project="kingInfo"
      />
    </div>
    <div class="w-full projectContainer">
      <GrowthpadProject
        :value="
          chanelStatus.value === 'wait'
            ? chanelInfo.dashboard.end
            : chanelInfo.dashboard.begin
        "
        :status="chanelStatus"
        :project="chanelInfo"
      />
    </div>
  </div>
</template>
<style></style>
