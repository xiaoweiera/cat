<script setup lang="ts">
import { defineProps } from "vue"
defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <div class="apy-detail pt-2.5 pb-3 px-4 text-kdFang">
    <div class="item-row flex items-center">
      <span class="label">公链类型</span>
      <IconFont class="ml-1" type="icon-BSC" size="14"/>
      <span class="ml-1 text-xs text-global-highTitle">BSC</span>
    </div>
    <div class="item-row flex items-center">
      <span class="label">矿池类型</span>
      <IconFont type="icon-V" size="14" class="ml-1"/>
      <span class="ml-1 text-xs text-global-highTitle">存款收益</span>
    </div>
    <div class="item-row flex items-center">
      <span class="label">矿池标签</span>
      <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1">
        <span class="text-global-highTitle text-opacity-45 ml-1">MDEX 董事会</span>
      </span>
    </div>
    <div class="item-row flex items-center">
      <span class="label">杠杆倍数</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45">3X</span>
    </div>
    <div class="item-row">
      <div>
        <span class="label">APY构成</span>
      </div>
      <div class="flex items-center mt-1">
        <span class="label dot">单利收益</span>
        <span class="ml-1 text-xs text-global-highTitle">COW 3.35% + COW 3.35%</span>
      </div>
      <div class="flex items-center mt-1">
        <span class="label dot">复利收益</span>
        <span class="ml-1 text-xs text-global-highTitle">COW 3.35% + COW 3.35%</span>
      </div>
    </div>
    <div class="item-row flex items-center">
      <span class="label">剩余额度</span>
      <span class="ml-1 text-xs text-global-highTitle text-opacity-45">$15578  (20%)</span>
    </div>
    <div class="item-row flex items-center text-global-numRed">
      <IconFont type="icon-info2" size="16"/>
      <span class="text-xs ml-1.5">投入后需锁仓30天</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.apy-detail {
  min-width: 260px;
  background-color: #EDF0F5;
  transform: translateX(-1px);
  .item-row {
    @apply mt-1.5;
    &:first-child {
      @apply mt-0;
    }
  }
  .label {
    @apply text-xs text-global-highTitle text-opacity-45;
  }
  .dot {
    @apply relative pl-5.5;
    &:before {
      @apply absolute left-2.5 top-1/2;
      @apply w-1.5 h-1.5 inline-block;
      @apply bg-global-highTitle bg-opacity-45;
      content: "";
      border-radius: 50%;
      vertical-align: middle;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
