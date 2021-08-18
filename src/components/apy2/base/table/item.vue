<script setup lang="ts">
import { defineProps } from "vue"
defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <div class="apy-item">
    <el-popover popper-class="apy-hover-detail" placement="bottom-start" title="" width="fit-content" :show-after="300" trigger="hover" :show-arrow="false" :offset="0">
      <template #reference>
        <div class="py-2 pl-4 pr-2 text-kdFang">
          <div>
            <span class="text-global-numGreen font-bold text-xl">34.33%</span>
            <span class="ml-1 text-xs text-global-highTitle text-opacity-45">3X</span>
          </div>
          <div class="text-xs mt-1">
            <span class="text-global-highTitle text-opacity-85">Coinwind</span>
            <span class="text-global-highTitle text-opacity-45 ml-1">TVL</span>
            <span class="text-global-highTitle text-opacity-85 ml-1">$3.4亿</span>
          </div>
          <div class="text-xs mt-1 flex items-center">
            <IconFont type="icon-BSC" size="14"/>
            <IconFont type="icon-V" size="14" class="ml-1"/>
            <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1">
              <span class="text-global-highTitle text-opacity-45 ml-1">MDEX 董事会</span>
            </span>
          </div>
        </div>
      </template>
      <Apy2BaseTableDetail :data="data"/>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
  .apy-item {
    transition: all 03s;
    @apply relative;
    &:hover {
      background-color: #EDF0F5;
    }
    .apy-detail {
      @apply w-65;
      background-color: #EDF0F5;
    }
  }
</style>
<style lang="scss">
.apy-hover-detail {
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 0 !important;
}
</style>
