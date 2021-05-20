<script setup lang="ts">
import { defineProps } from 'vue'
import { makeDescription } from './task'
defineProps({
  data: Object,
})
</script>
<template>
  <div class="flex justify-between items-center">
    <div>
      <div class="flex items-center pb-1">
        <span class="text-sm title">{{ data.title }}</span>
        <template v-if="data.tooltip">
          <span class="tooltip rounded ml-1.5 inline-flex items-center">
            <template v-if="data.tooltip.icon">
              <IconFont class="mr-1" :type="data.tooltip.icon" />
            </template>
            <span class="text-xs">{{ data.tooltip.value }}</span>
          </span>
        </template>
      </div>
      <div class="description text-xs">
        <slot name="desc">
          <p v-html="makeDescription(data)"></p>
        </slot>
      </div>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
span {
  user-select: none;
}
.tooltip {
  border: 1px solid rgba(43, 141, 254, 0.32);
  box-sizing: border-box;
  padding: 2px 6px;
  color: #2b8dfe;
}
.title {
  color: #033666;
}
.description {
  color: rgba(37, 62, 111, 0.35);
  user-select: none;
  :deep(i) {
    font-style: normal;
    font-weight: normal;
    color: #2b8dfe;
  }
}
</style>
