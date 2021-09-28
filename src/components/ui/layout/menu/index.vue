<script setup lang="ts">
/**
 * @file 左右布局，左侧为菜单
 * @author svon.me@gmail.com
 */
import { defineProps, computed, toRaw } from 'vue'
import { useProvide } from '~/utils/use/state'

defineProps({
  menuWidth: {
    type: Number,
    default: () => 240
  }
})

const [state] = useProvide('layout-menu', false)

const status = computed<boolean>(function(): boolean {
  const data = state.value
  return !!data[0];
})

</script>

<template>
  <div class="layout-main" :style="`--layout-menu-width: ${menuWidth}px;`">
    <div class="menu-main top-header" :class="{'mobile-menu': status}">
      <slot name="menu"></slot>
    </div>
    <div class="layout-main-box">
      <div class="left-border">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@mixin show() {
  @apply visible opacity-100 bottom-0;
}

.layout-main {
  @apply w-full;
  .menu-main {
    transition: all 0.6s;
    @apply invisible opacity-0;
    @apply fixed overflow-auto;
    &.mobile-menu {
      @apply left-0 right-0 ;
      @apply bg-white;
      @apply z-1001;
      @include show();
    }
  }
  @screen md {
    .menu-main {
      transition: none;
    }
  }
  @screen xl {
    @apply w-320 mx-auto;
    .menu-main {
      @include show();
      @apply left-1/2;
      transform: translateX(-40rem);
      width: var(--layout-menu-width);
      &.mobile-menu {
        @apply left-1/2;
        z-index: initial;
        right: initial;
      }
    }
    .left-border{
      @apply ml-8;
      margin-left: var(--layout-menu-width);
      border-left: 1px solid rgba(3, 54, 102, 0.06);
    }
  }
}
</style>
