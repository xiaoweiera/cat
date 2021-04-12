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
  <div class="flex tagContainer  items-center  text-center  shadow-md py-2 px-4 md:py-4 mt-6 md:mt-kd32px">
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px">
        -
<!--        ${{ summary.total.toLocaleString() }}-->
      </div>
      <div class="text-global-default opacity-65 mt-kd4px text-kd14px18px">
        奖励总价值
      </div>
    </div>
    <div class=" w-0.25 bg-global-default opacity-10 h-6"></div>
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px">
        -
<!--        {{ summary.totalProject.toLocaleString() }}-->
      </div>
      <div class="text-global-default opacity-65 mt-kd4px  text-kd14px18px">
        服务项目
      </div>
    </div>
    <div class=" w-0.25 bg-global-default opacity-10 h-6"></div>
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px">
        -
<!--        {{ summary.person.toLocaleString() }}-->
      </div>
      <div class="text-global-default opacity-65 mt-kd4px text-kd14px18px">
        参与总人数
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tagContainer{
  border: 1px solid rgba(43, 141, 255, 0.08);
  background: linear-gradient(180deg, #FFFFFF 0%, #EDF5FF 100%);
  box-sizing: border-box;
  box-shadow: 0px 12px 42px -12px rgba(43, 141, 255, 0.26);
  border-radius: 12px;
}
</style>
