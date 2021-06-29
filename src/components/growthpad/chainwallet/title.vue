<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<template>
  <div>
    <GrowthpadTaskTitle :data="data" class="flex justify-between items-center"/>
    <p v-if="data.rule" class="pt-1">
      <template v-for="(text, index) in data.rule" :key="index">
        <span class="block text-xs font-color leading-4">{{ index + 1 }}. {{ text }}</span>
      </template>
    </p>
  </div>
</template>

<style scoped lang="scss">
.font-color {
  color: #2b8dfe;
}
</style>
