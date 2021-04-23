<script setup lang="ts">
import { defineProps, onMounted, watch } from 'vue'

const props = defineProps({
  itemData: {
    type: Object,
  },
  id: {
    type: String,
  },
  index: {
    type: Number,
  },
})
</script>
<template>
  <div class="w-53 h-full flex flex-col justify-center   px-3">
    <template v-for="(item,i) in itemData">
      <div v-if="item.status" class="flex mb-0.5 items-center  flex-wrap ">
        <span class="desName mr-1">{{ item.name }}</span>
        <div :class="i===0?'desNum':'text-global-hightTitle text-kd12px16px' ">{{ item.value ? item.value : '-' }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="postcss">
.topBg {
  background: linear-gradient(270deg, rgba(43, 141, 254, 0) 0%, rgba(43, 141, 254, 0.04) 2.61%, rgba(43, 141, 254, 0.04) 93.5%, rgba(43, 141, 254, 0) 100%);
}

.desName {
  @apply text-kd12px16px flex items-center text-global-default font-normal opacity-65;
}

.desNum {
  font-size: 14px;
  @apply font-kdExp font-bold text-global-highTitle ;
}

.desInfo {
  @apply text-kd12px16px font-kdExp font-normal;
}
</style>
