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
    <h2>{{ title }}</h2>
    <DotCountGroup>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="flex mt-1 p-1">
            <DotCount size="sm" :skin="skin"/>
            <div class="ml-1 flex-1 flex justify-between">
              <slot data="item">
                <growthpadExamplesTask :data="item" />
              </slot>
            </div>
          </div>
        </li>
      </ul>
    </DotCountGroup>
  </div>
</template>

