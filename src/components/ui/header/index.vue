<script setup lang="ts">
import { env } from '~/lib/process'
</script>

<template>
  <div class="ui-header">
    <div class="bg-global-darkblue px-6 flex justify-between">
      <div class="flex items-center">
        <a class="inline-block" v-router="env.dashboard">
          <img class="w-28" src="https://res.ikingdata.com/common/logo-white.svg">
        </a>
        <div class="ml-10">
          <!-- 导航菜单 -->
          <UiHeaderMenu/>
        </div>
      </div>
      <!-- 右侧用户相关内容 -->
      <UiHeaderUser/>
    </div>
    <div>
      <UiHeaderSub :list="[]"></UiHeaderSub>
    </div>
  </div>
</template>


<style scoped lang="scss">
.ui-header {
  @apply sticky top-0 z-1000;
}
</style>
