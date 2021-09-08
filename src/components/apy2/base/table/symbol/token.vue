<script setup lang="ts">
import { defineProps } from "vue"
// @ts-ignore
import { toBoolean, toNumberCashFormat, toNumberFormat } from '~/utils'

defineProps({
  data: {
    type: Object
  },
  type: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="h-18.5 px-2.5 flex items-center text-kdFang">
    <div class="flex items-center flex-1">
      <div class="flex">
        <IconFont :class="{'new-24': data.new }" :type="data.symbol_logo" size="32" rounded border/>
      </div>
      <div class="mx-2 flex-1">
        <div class="flex w-full items-center">
          <el-tooltip class="item" effect="dark" :content="data.symbol_alias" placement="top-start">
            <span class="flex flex-1 w-1 text-base text-global-highTitle text-opacity-85">
              <span class="inline-block whitespace-nowrap max-w-full truncate">{{ data.symbol_alias }}</span>
            </span>
          </el-tooltip>
          <Apy2BaseFollow class="ml-1 text-global-highTitle text-opacity-45" :type="type" :value="data.symbol_alias" :status="toBoolean(data.followed)"/>
        </div>
        <div class="mt-1 text-xs flex items-center text-kdExp">
          <span class="inline-block mr-1 text-global-highTitle text-opacity-85">{{ toNumberCashFormat(data.symbol_price, '$') }}</span>
          <span class="inline-block py-0.5 px-1 rounded bg-global-numRed bg-opacity-20 text-global-numRed leading-3.5">{{ toNumberFormat(data.symbol_change, '%') }}</span>
        </div>
      </div>
    </div>
    <div>
      <template v-if="data.expand">
        <IconFont class="inline-flex text-global-default text-opacity-35" type="icon-arrow-up" size="16"/>
      </template>
      <template v-else>
        <IconFont class="inline-flex text-global-default text-opacity-35" type="icon-arrow-down" size="16"/>
      </template>
    </div>
  </div>
</template>



