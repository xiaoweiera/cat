<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps({
    url: String,
    image: String,
  })
</script>

<template>
  <a class="inline-block max-w-full" v-if="url" :href="url" target="_blank">
    <img class="inline-block" :src="image" />
  </a>
  <img v-else class="inline-block max-w-full" :src="image" />
</template>
