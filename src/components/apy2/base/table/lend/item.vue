<script setup lang="ts">
import { defineProps } from "vue"
// @ts-ignore
import { numberUint, toNumber } from '~/utils'
import { TabCategoryData } from '~/logic/apy2/interface'

defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <Apy2PoolDialog :type="TabCategoryData.lend" :id="data.id">
    <template #reference>
      <div class="apy-item">
      <el-popover popper-class="apy-hover-detail" placement="bottom-start" title="" width="fit-content" :show-after="300" trigger="hover" :show-arrow="false" :offset="0">
        <template #reference>
          <div class="h-18.5 flex items-center w-full">
            <div class="pl-4 pr-2 text-kdFang w-full">
              <div>
                <span class="text-global-numGreen font-bold text-xl">{{ toNumber(data.apy) }}%</span>
              </div>
              <div class="text-xs mt-1 whitespace-nowrap max-w-full truncate">
                <span class="text-global-highTitle text-opacity-85">{{ data.project }}</span>
                <span class="text-global-highTitle text-opacity-45 ml-1">可借金额</span>
                <span class="text-global-highTitle text-opacity-85 ml-1">${{ numberUint(data.quota_remain) }} ({{ toNumber(data.quota_remain_percent) }}%)</span>
              </div>
              <div class="text-xs mt-1 flex justify-between">
                <div class="flex items-center">
                  <IconFont :type="data.chain" size="14"/>
                  <IconFont :type="data.project_category" size="14" class="ml-1"/>
                  <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1" v-if="data.strategy_tags">
                    <span class="text-global-highTitle text-opacity-45 ml-1">{{ data.strategy_tags }}</span>
                  </span>
                </div>
                <div class="text-global-highTitle text-opacity-25">
                  <IconFont type="icon-info2" size="16"/>
                </div>
              </div>
            </div>
          </div>
        </template>
        <Apy2BaseTableLendDetail :data="data"/>
      </el-popover>
    </div>
    </template>
  </Apy2PoolDialog>
</template>
