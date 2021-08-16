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
    <div class="flex items-center w-1 flex-1">
      <div>
        <IconFont type="icon-facebook-circle-fill" size="32"/>
      </div>
      <div class="ml-2 flex-1 w-1">
        <div class="flex items-center">
          <span class="text-base mr-1.5 text-global-highTitle text-opacity-85">ETH</span>
          <IconFont class="text-global-highTitle text-opacity-45" type="icon-star-weixuanzhong" size="16"/>
        </div>
        <div class="mt-1 text-xs flex items-center">
          <span class="inline-block mr-1 text-global-highTitle text-opacity-85">$21312.2</span>
          <span class="inline-block p-1 rounded bg-global-numRed bg-opacity-20 text-global-numRed">-3.23%</span>
        </div>
      </div>
    </div>
    <div>
      <IconFont class="inline-flex text-global-default text-opacity-35" type="icon-arrow-down" size="16"/>
    </div>
  </div>
</template>

<style scoped>

</style>
