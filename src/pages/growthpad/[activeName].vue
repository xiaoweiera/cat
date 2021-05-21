<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, toRaw, onMounted } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import I18n from '~/utils/i18n/index'
import stroe from '~/logic/growthpad/task'

// 活动名称
const getActiveName = function() {
  const router = toRaw(useRoute())
  const params = router.params.value
  return safeGet<string>(params, 'activeName')
}

const TaskList = []
const countdown = ref('2021-05-25 12:00:00')

onMounted(async() => {
  const name = getActiveName()
  await stroe.init(name)
  console.log(stroe)
})
</script>
<template>
  <div class="container flex">
    <div class="flex-1">
      <growthpadTaskDasboard />
      <growthpadTaskAdress />
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
