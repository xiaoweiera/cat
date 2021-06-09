<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  placement: {
    type: String,
    default() {
      return 'top'
    },
  },
})
</script>

<template>
  <div class="relative">
    <div class="cursor-pointer">
      <slot name="reference"></slot>
    </div>
    <div
      class="whitespace-pre-wrap placement-box p-2 text-xs"
      :class="`placement-${placement}`"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.relative {
  &:hover {
    .placement-box {
      display: block;
    }
  }
}
.placement-box {
  position: absolute;
  left: 50%;
  background: #fff;
  border-radius: 6px;
  //display: none;
  width: 435px;
}
.placement-top {
  bottom: 100%;
  transform: translate(-50%, -14px);
  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    left: 50%;
    top: 100%;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #fff;
    transform: translateX(-50%);
  }
}
</style>
