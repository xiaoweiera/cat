<script setup lang="ts">

</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0">
      <div class="flex justify-between items-center">
        <div>
          <span>CoinWind - BTC 相关 APY 走势图</span>
          <span>更新时间：1分钟前</span>
        </div>
        <div class="flex items-center">
          <slot></slot>
          <EchartsDownload class="ml-3"/>
        </div>
      </div>
    </el-header>
    <el-main class="p-0">
      <span>diff 2 图表</span>
    </el-main>
  </el-container>
</template>


