<script setup lang="ts">
import { ref } from 'vue'
const urlList = [
  {
    title: 'DeFi 数据分析',
    data: [{ name: 'APY 大全', desc: '区块链数据分析资源网' }],
  },
]
</script>
<template>
  <div>
    <el-popover placement="bottom-start" width="auto" trigger="click">
      <template #reference>
        <img
          class="w-6 h-6 ml-12"
          src="https://res.ikingdata.com/nav/navAll.png"
          alt=""
        />
      </template>
      <div class="flex p-3">
        <div>DeFi 数据分析</div>
        <div>企业数据服务</div>
        <div>项目数据监控与分析</div>
        <div>实用工具</div>
      </div>
    </el-popover>
  </div>
</template>
