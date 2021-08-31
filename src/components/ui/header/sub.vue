<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="h-12.5">
    <div v-if="list.length > 0" class="sub-menu-box px-20 flex items-center justify-between text-kdFang bg-white">
      <div class="sub-content text-global-highTitle text-opacity-65">
        <div class="flex h-full">
          <template v-for="(data, index) in list" :key="index">
            <template v-if="data.header">
              <a class="sub-menu-item" :class="{'active': index === 0}" v-router="data.href">{{ data.name }}</a>
            </template>
          </template>
        </div>
      </div>
      <div class="extend ml-5"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sub-menu-box {
  @apply h-full;
  border-bottom: 1px solid rgba(#1A1F36, 0.25);
  box-shadow: 0 1px 0 rgba(#fff, 0.08);
}
.sub-content {
  @apply h-full;
  .sub-menu-item {
    @apply h-full flex items-center px-2 ml-8 font-medium;
    &:first-child {
      @apply ml-0;
    }
    &.active, &[href]:hover {
      @apply text-global-primary text-opacity-100;
      box-shadow: inset 0px -2px 0px #2B8DFE;
    }
  }
}
</style>
