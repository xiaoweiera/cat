<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps({
  filterData: Object,
})
</script>
<template>
  <div class="flex ml-3.5">
    <div class="flex h-7.8 items-center timeFilter">
      <template v-for="(item, index) in filterData">
        <div :class="item.selected ? 'timeTagSelected' : 'timeTag'">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.timeTag {
  border-radius: 2px;
  cursor: pointer;
  @apply px-2 py-1 text-kd14px18px text-global-default opacity-65 min-w-12 text-center;
}
.timeTagSelected {
  cursor: pointer;
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-primary bg-white min-w-12 text-center;
}
.timeFilter {
  padding: 2px;
  background: rgba(43, 141, 254, 0.08);
  border-radius: 4px;
}
</style>
