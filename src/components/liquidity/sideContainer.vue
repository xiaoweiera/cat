<script setup lang="ts">
// @ts-ignore
import { ElTable, ElTableColumn } from 'element-plus'
import { ref, reactive, defineProps } from 'vue'
const tokenInfo = reactive({ address: '0xjjje...3029' })
</script>
<template>
  <div class="w-75 min-w-75 flex flex-col sideContainer">
    <LiquiditySideTop :token-info="tokenInfo" />
    <div class="flex flex-col h-full overflow-hidden bg-white flex-1">
      <div class="p-3">
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

.sideContainer {
  background: #ffffff;
  box-shadow: 4px 0px 12px rgba(44, 140, 248, 0.08);
}
</style>
