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
      <h3 class="text-sm">
        <span>{{ data.name }}</span>
      </h3>
    </div>
    <ul class="block">
      <template v-for="(item, index) in data.children" :key="index">
        <li class="block pt-3" v-if="item.more">
          <a class="flex items-center" v-router="item.href">
            <IconFont class="flex mr-2" :type="item.icon" size="32"/>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  h3 {
    line-height: 18px;
    font-weight: normal;
  }
</style>
