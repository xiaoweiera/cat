<script setup lang="ts">
import { defineProps } from "vue"
defineProps({
  desc: {
    type: String
  },
  href: {
    type: Boolean
  },
})
</script>

<template>
  <UiHover width="inherit">
    <template #label>
      <div>
        <a class="hidden md:block cursor-pointer">
          <slot></slot>
        </a>
        <a class="block md:hidden" v-router.blank="href">
          <slot></slot>
        </a>
      </div>
    </template>
    <template #content>
      <div class="text-center">
        <div class="inline-block">
          <UiQrcode width="90" height="90" href :value="href"></UiQrcode>
        </div>
      </div>
      <div class="pt-1 text-center whitespace-nowrap">
        <span class="text-xs text-global-highTitle text-opacity-85">{{ desc }}</span>
      </div>
    </template>
  </UiHover>
</template>


