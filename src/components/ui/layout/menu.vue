<script setup lang="ts">
/**
 * @file 左右布局，左侧为菜单
 * @author svon.me@gmail.com
 */
import { defineProps } from 'vue'

defineProps({
  menuClass: {
    type: String,
    default: () => 'w-60'
  }
})
</script>

<template>
  <div class="layout-main flex">
    <div class="menu-box" :class="menuClass">
      <div class="menu-main" :class="menuClass">
        <slot name="menu"></slot>
      </div>
    </div>
    <div class="flex-1 w-1 ml-8">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-main {
  @apply w-full;
  @screen xl {
    @apply w-320 mx-auto;
    .menu-main {
      @apply top-18 left-1/2 bottom-0 fixed overflow-auto;
      transform: translateX(-40rem);
    }
  }
}
</style>
