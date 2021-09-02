<script setup lang="ts">
/**
 * @file 左右布局，左侧为菜单
 * @author svon.me@gmail.com
 */
import { defineProps } from 'vue'

defineProps({
  menuWidth: {
    type: Number,
    default: () => 240
  }
})
</script>

<template>
  <div class="layout-main">
    <div class="menu-main top-header" :style="{'width': `${menuWidth}px`}">
      <slot name="menu"></slot>
    </div>
    <div class="layout-main-box" :style="{'marginLeft': `${menuWidth}px`}">
      <div class="leftBorder ml-8">
        <slot name="content"></slot>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.leftBorder{
  border-left: 1px solid rgba(3, 54, 102, 0.06);
}
.layout-main {
  @apply w-full;
  .menu-main {
    @apply hidden md:block float-left;
  }
  @screen xl {
    @apply w-320 mx-auto;
    .menu-main {
      @apply left-1/2 bottom-0 fixed overflow-auto;
      transform: translateX(-40rem);
    }
  }
}
</style>
