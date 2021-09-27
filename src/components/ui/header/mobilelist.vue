<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  menus: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<template>
  <div class="block p-4 text-kdFang text-white" v-for="(data, key) in menus" :key="key">
    <div class="pb-3 border-b border-solid border-white border-opacity-24">
      <h3>
        <span class="text-14-18">{{ data.name }}</span>
      </h3>
    </div>
    <template v-if="data.children">
      <UiHeaderMobilesub :list="data.children"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
  h3 {
    font-weight: normal;
  }
</style>
