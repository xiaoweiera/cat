<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: String,
  list: {
    type: Array,
    default: () => [],
  },
  // 主题颜色
  skin: {
    validator(value: string): boolean {
      return ['orange', 'blue'].includes(value)
    },
  },
})
</script>

<template>
  <div>
    <h2 class="font-medium text-base">{{ title }}</h2>
    <DotCountGroup class="pt-4">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'mt-1': index > 0 }"
        >
          <slot data="item" :skin="skin">
            <growthpadExamplesTask :data="item" :skin="skin" />
          </slot>
        </li>
      </ul>
    </DotCountGroup>
  </div>
</template>

<style scoped>
h2 {
  color: #033666;
}
</style>
