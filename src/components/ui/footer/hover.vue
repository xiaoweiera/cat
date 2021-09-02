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
  <UiHover :width="102">
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
      <div class="w-21.5 h-21.5">
        <UiQrcode width="86" height="86" href :value="href"></UiQrcode>
      </div>
      <div class="pt-1 text-center text-xs text-global-highTitle text-opacity-85">{{ desc }}</div>
    </template>
  </UiHover>
</template>


