<script setup lang="ts">
// @ts-ignore
import { ElTable, ElTableColumn } from 'element-plus'
</script>
<template>
  <div class="w-75 flex flex-col sideContainer">
    <LiquiditySideTop />
    <div class="px-3 flex flex-col bg-white flex-1">
      <div class="tagContainer py-3">
        <span class="defaultTag">自选</span>
        <span class="ml-6 text-global-primary text-kd14px18px">相关交易对</span>
      </div>
      <LiquidityTokenTable />
    </div>
  </div>
</template>
<style scoped lang="postcss">
.defaultTag {
  @apply text-kd14px18px font-kdFang text-global-default opacity-65;
}
.tagContainer {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
}
.sideContainer {
  background: #ffffff;
  box-shadow: 4px 0px 12px rgba(44, 140, 248, 0.08);
}
</style>
