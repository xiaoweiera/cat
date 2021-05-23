<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Object,
  },
})
</script>
<template>
  <GrowthpadTaskTitle :data="data">
    <template #right>
      <GrowthpadTaskCheck :data="data"></GrowthpadTaskCheck>
    </template>
  </GrowthpadTaskTitle>
</template>
