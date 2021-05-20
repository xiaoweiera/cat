<script setup lang="ts">
import { ref } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import I18n from '~/utils/i18n/index'
import { shareCode, TaskList1, TaskList2 } from '~/logic/growthpad/examples'
// 地址
const address = ref('')
const countdown = ref('2021-05-20 12:00:00')
</script>
<template>
  <div class="container flex">
    <div class="flex-1">
      <growthpadExamplesDasboard />
      <div>
        <growthpadExamplesTaskList
          skin="orange"
          :title="I18n.growthpad.examples.whiteList"
          :list="TaskList1"
        />
      </div>
      <div class="pt-15">
        <growthpadExamplesTaskList
          skin="blue"
          :title="I18n.growthpad.examples.growthTasks"
          :list="TaskList2"
        />
      </div>
      <div class="py-15">
        <h2 class="pb-4 text-base font-semibold">
          {{ I18n.growthpad.examples.register }}
        </h2>
        <div class="flex">
          <ElInput
            v-model="address"
            :placeholder="I18n.growthpad.examples.address"
          ></ElInput>
          <div class="ml-4">
            <ElButton type="primary">
              {{ I18n.growthpad.examples.submit }}
            </ElButton>
          </div>
        </div>
      </div>
      <growthpadExamplesAbout />
    </div>
    <div class="ml-15 tips hidden md:block">
      <div class="w-full pt-15">
        <div>
          <p>{{ I18n.growthpad.examples.countdown.title }}</p>
          <TimeCountdown :value="countdown" />
        </div>
        <div class="mt-15">
          <h2 class="font-medium">
            {{ I18n.growthpad.examples.project.addCard }}}
          </h2>
          <p class="text-xs sub">{{ I18n.growthpad.examples.project.desc }}</p>
          <div class="mt-3 rounded-xl p-3 share-code">
            <p class="break-all">{{ shareCode }}</p>
            <span class="text-xs font-color-theme">{{
              I18n.growthpad.examples.project.copy
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.tips {
  width: 220px;
}
.share-code {
  background: linear-gradient(180deg, #f8f9ff 0%, #e3eeff 100%);
  box-shadow: 0 6px 24px -12px rgba(43, 141, 255, 0.16);
}
.sub {
  color: rgba(37, 62, 111, 0.65);
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: examples
</route>
// @formatter:off
