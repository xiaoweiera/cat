<script setup lang="ts">
  import { ref } from 'vue'
  // @ts-ignore
  import { ElInput, ElButton } from 'element-plus'
  // @ts-ignore
  import { shareCode, TaskList1, TaskList2 } from '~/logic/growthpad/examples'
  // 地址
  // @ts-ignore
  const address = ref('')
</script>
<template>
  <div class="container flex">
    <div class="flex-1">
      <growthpadExamplesDasboard />
      <div>
        <growthpadExamplesTaskList skin="orange" title="白名单资格预审" :list="TaskList1" />
      </div>
      <div class="pt-15">
        <growthpadExamplesTaskList skin="blue" title="增长任务（根据项目需求定制）" :list="TaskList2" />
      </div>
      <div class="py-15">
        <h2 class="pb-4 text-base font-semibold">REGISTERED ADDRESS</h2>
        <div class="flex">
          <ElInput v-model="address" placeholder="请输入内容"></ElInput>
          <div class="ml-4">
            <ElButton type="primary">登记</ElButton>
          </div>
        </div>
      </div>
      <growthpadExamplesAbout />
    </div>
    <div class="ml-15 tips hidden md:block">
      <div class="w-full pt-15">
        <div>
          <p>开始倒计时</p>
          <TimeCountdown value="2021-05-12 12:12:00" />
        </div>
        <div class="mt-15">
          <h2 class="font-medium">添加项目卡片</h2>
          <p class="text-xs sub">将此项目卡片添加到你的网站</p>
          <div class="mt-3 rounded-xl p-3 share-code">
            <p class="break-all">{{ shareCode }}</p>
            <span class="text-xs font-color-theme">复制代码</span>
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
    background: linear-gradient(180deg, #F8F9FF 0%, #E3EEFF 100%);
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
