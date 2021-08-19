<script setup lang="ts">
import { defineProps } from "vue"
// @ts-ignore
import { numberUint, toNumber } from '~/utils'

defineProps({
  data: {
    type: Object
  }
})
</script>

<template>
  <a v-if="data" class="py-4.5 pl-7 pr-4.5 flex items-center text-kdFang" v-router="'/apy/token'" target="_blank">
    <div>
      <IconFont v-if="data.symbol_logo" :type="data.symbol_logo" size="32"/>
      <IconFont v-else type="icon-morentoken" size="32"/>
    </div>
    <div class="ml-2 flex-1 flex justify-between items-center">
      <div class="flex-1 w-1 items-center flex">
        <el-tooltip class="item" effect="dark" :content="data.symbol_alias" placement="top-start">
          <span class="flex flex-1 w-1 text-base text-global-highTitle text-opacity-85">
            <span class="inline-block whitespace-nowrap max-w-full truncate">{{ data.symbol_alias }}</span>
          </span>
        </el-tooltip>
        <IconFont class="inline-block text-global-highTitle text-opacity-45 ml-1.5" type="icon-star-weixuanzhong" size="16"/>
      </div>
      <div class="ml-2">
        <IconFont class="text-global-default text-opacity-35" type="icon-tiaozhuan" size="16"/>
      </div>
    </div>
  </a>
</template>


