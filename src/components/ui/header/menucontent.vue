<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true,
  }
})


</script>

<template>
  <div class="item-main" :class="{'active': data.active}">
    <a class="menu-content" v-router="data.href">
      <div class="label-box">
        <slot name="label">
          <span>{{ data.name }}</span>
        </slot>
      </div>
    </a>
    <template v-if="data.subHeader">
      <slot name="children" :list="data.children"></slot>
    </template>
  </div>
</template>

<style scoped lang="scss">
.item-main {
  @apply h-full relative;
  .menu-content {
    @apply px-8 h-full cursor-pointer whitespace-nowrap block;
    .label-box {
      @apply h-full flex items-center text-base;
      background-color: var(--menu-content-bg);
    }
    color: var(--menu-content-text);
  }
}
</style>
