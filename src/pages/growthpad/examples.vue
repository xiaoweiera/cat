<script setup lang="ts">
  import { ref } from 'vue'
  import { ElInput, ElButton } from 'element-plus'
  const address = ref('')

  const task1 = {
    title: '白名单资格预审',
    list: [
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: '4' },
    ],
  }
  const task2 = {
    title: '增长任务（根据项目需求定制）',
    list: [
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: '4' },
    ],
  }
  const code = '<frame src="https://embed.KingData.com/embe d/s/914814682750.htm"style-"border: none;" width="490"height=”164” frameborder="0" scrolling="no" allowfullscreen></iframe>'
</script>
<template>
  <div class="container flex">
    <div class="flex-1">
      <growthpadExamplesTotal />
      <div>
        <growthpadExamplesList title="task1.title" :list="task1.list">
        </growthpadExamplesList>
      </div>
      <div class="pt-15">
        <growthpadExamplesList title="task2.title" :list="task2.list">
        </growthpadExamplesList>
      </div>
      <div>
        <h2>登记地址</h2>
        <div class="flex">
          <ElInput v-model="address" placeholder="请输入内容"></ElInput>
          <div class="ml-4">
            <ElButton>登记</ElButton>
          </div>
        </div>
      </div>
      <growthpadExamplesAbout />
    </div>
    <div class="ml-15 tips hidden md:block">
      <div class="w-full">
        <div>
          <p>开始倒计时</p>
          <TimeCountdown value="2021-05-12 12:12:00" />
        </div>
        <div class="rounded-2xl">
          <h2>添加项目卡片</h2>
          <p>将此项目卡片添加到你的网站</p>
          <div>
            <p class="break-all">{{ code }}</p>
            <span>复制代码</span>
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
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: home
</route>
// @formatter:off
