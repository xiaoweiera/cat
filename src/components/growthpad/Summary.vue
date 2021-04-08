<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, onUnmounted } from 'vue'

import type { SummaryModel } from '~/types/growthpad'

const summary = reactive<SummaryModel>({
  total: 0,
  totalProject: 0,
  person: 0,
})

onMounted(async() => {
  await axios.get('/api/v1/growthpad/summary')
      .then(({ data }) => {
        const val: SummaryModel = data.data
        Object.assign(summary, val)
      })
})

</script>
<template>
  <div class="data-summary flex w-4/5 my-4 text-center rounded-md shadow-md p-2">
    <div class="flex-1">
      <div class="text-global-primary">
        ${{ summary.total.toLocaleString() }}
      </div>
      <div class="text-global-default">
        奖励总价值
      </div>
    </div>
    <div class="split w-0.5 bg-global-default opacity-10 my-3"></div>
    <div class="flex-1">
      <div class="text-global-primary">
        {{ summary.totalProject.toLocaleString() }}
      </div>
      <div class="text-global-default">
        服务项目
      </div>
    </div>
    <div class="split w-0.5 bg-global-default opacity-10 my-3"></div>
    <div class="flex-1">
      <div class="text-global-primary">
        {{ summary.person.toLocaleString() }}
      </div>
      <div class="text-global-default">
        参与总人数
      </div>
    </div>
  </div>
</template>
