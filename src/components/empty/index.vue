<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  desc: {
    type: String,
    default () {
      return ''
    }
  }
})

// @ts-ignore
const image = 'https://res.ikingdata.com/nav/noData.png'
</script>

<template>
  <div class="py-18">
    <el-empty :image="image" :image-size="240">
      <template #description>
        <p class="text-sm font-normal">
          <span class="text-global-primary text-opacity-60">{{ desc }}</span>
        </p>
      </template>
    </el-empty>
  </div>
</template>



