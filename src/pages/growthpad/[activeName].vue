<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, toRaw } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { ElInput, ElButton } from 'element-plus'
import I18n from '~/utils/i18n/index'
import { TaskList } from '~/logic/growthpad/examples'
// 活动名称
const getActiveName = function() {
  const router = toRaw(useRoute())
  const params = router.params.value
  return safeGet<string>(params, 'activeName')
}

// 地址
const address = ref('')
const countdown = ref('2021-05-20 12:00:00')
</script>
<template>
  <div class="container flex">
    <div class="flex-1">
      <growthpadTaskDasboard />
      <div class="pb-15">
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
        <div class="pt-1.5 text-xs">
          <p>
            *
            请登记您的领取奖励地址（持仓量相关任务奖励直接发放至验证地址），如未及时登记，则奖励不进行发放。
          </p>
        </div>
      </div>
      <div class="pb-15">
        <DotCountGroup class="pt-4">
          <ul>
            <li v-for="(item, index) in TaskList" :key="index" class="pb-7.5">
              <growthpadTaskMdxItem :expant="index < 1" :data="item" />
            </li>
          </ul>
        </DotCountGroup>
      </div>
      <growthpadTaskAbout />
    </div>
    <div class="ml-15 tips hidden md:block">
      <div class="w-full pt-15">
        <div>
          <p>{{ I18n.growthpad.examples.countdown.title }}</p>
          <TimeCountdown :value="countdown" />
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
