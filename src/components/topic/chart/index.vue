<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  menu: {
    type: Object
  }
})
</script>

<template>
  <div class="p-5">
    <p>{{ menu.name }}</p>
  </div>
</template>

