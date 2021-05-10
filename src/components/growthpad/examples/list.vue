<script setup lang="ts">
  import { defineProps } from 'vue'
  defineProps({
    title: String,
    list: {
      type: Array,
      default: () => [],
    },
  })
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="flex pt-1">
          <DotChar :value="index + 1" size="sm" />
          <div class="ml-1 flex-1 flex justify-between">
            <slot data="item">
              <p>{{ item.text }}</p>
              <p>已完成</p>
            </slot>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
