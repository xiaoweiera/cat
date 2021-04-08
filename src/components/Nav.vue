<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const select = route.path.split('/')[1] || ''
const navIsSelect = (path) => {
  if (path === select) {
    return 'mx-1 text-global-primary'
  }
  return 'mx-1 text-global-default opacity-85'
}
</script>

<template>
  <nav class="flex items-center justify-start px-6 mt-2">
    <img src="/assets/logo.svg" alt="KingData" class="flex-none p-2">

    <div class="flex-grow mt-2">
      <div class="flex font-normal text-base text-navItem-default">
        <img src="/assets/more-nav-item.svg" alt="more">
        <router-link to="index" :class="navIsSelect('#')">7x27 小时监控</router-link>
        <router-link to="#" :class="navIsSelect('#')">数据图表</router-link>
        <router-link to="#" :class="navIsSelect('#')">DeFi 行情</router-link>
        <router-link to="#" :class="navIsSelect('#')">流动性分析</router-link>
        <router-link to="reports" :class="navIsSelect('reports')">研究报告</router-link>
        <router-link to="/growthpad" :class="navIsSelect('growthpad')">Growthpad</router-link>
      </div>
    </div>

    <ul class="flex-none text-navItem-default">
      <button class="bg-blue-600 w-20 h-10 rounded-md mx-1 px-1">
        <a href="#" class="text-white">链接钱包</a>
      </button>
      <a href="#" :class="navIsSelect('#')">APP下载</a>
      <a href="#"></a>
    </ul>
  </nav>
</template>
