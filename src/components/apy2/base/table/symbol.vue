<script setup lang="ts">
import { defineProps } from "vue"
defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <div class="py-4.5 px-2.5 flex items-center text-kdFang">
    <template v-if="data.type === 'symbol'">
      <div class="flex items-center flex-1">
        <div>
          <IconFont type="icon-facebook-circle-fill" size="32"/>
        </div>
        <div class="ml-2 flex-1">
          <div class="flex items-center">
            <span class="inline-block whitespace-nowrap text-base mr-1.5 text-global-highTitle text-opacity-85">{{ data.symbol_alias }}</span>
            <IconFont class="text-global-highTitle text-opacity-45" type="icon-star-weixuanzhong" size="16"/>
          </div>
          <div class="mt-1 text-xs flex items-center">
            <span class="inline-block mr-1 text-global-highTitle text-opacity-85">$21312.2</span>
            <span class="inline-block p-1 rounded bg-global-numRed bg-opacity-20 text-global-numRed">-3.23%</span>
          </div>
        </div>
      </div>
      <div>
        <template v-if="data.expand">
          <IconFont class="inline-flex text-global-default text-opacity-35" type="icon-right" size="16"/>
        </template>
        <template v-else>
          <IconFont class="inline-flex text-global-default text-opacity-35" type="icon-arrow-down" size="16"/>
        </template>
      </div>
    </template>
    <template v-else>
      <a class="pl-5.5 flex items-center flex-1" v-router="'/apy/token'" target="_blank">
        <div>
          <IconFont type="icon-facebook-circle-fill" size="32"/>
        </div>
        <div class="ml-2 flex-1 flex justify-between items-center">
          <div class="flex items-center">
            <span class="inline-block whitespace-nowrap text-base mr-1.5 text-global-highTitle text-opacity-85">{{ data.symbol_alias }}</span>
            <IconFont class="text-global-highTitle text-opacity-45" type="icon-star-weixuanzhong" size="16"/>
          </div>
          <div>
            <IconFont class="text-global-default text-opacity-35" type="icon-tiaozhuan" size="16"/>
          </div>
        </div>
      </a>
    </template>
  </div>
</template>
