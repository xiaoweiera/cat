<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="w-full block">
    <Apy2HecoCustom v-if="data.custom" :name="data.node_name"/>
    <div class="flex items-center" v-else>
      <span :class="data.className">{{ data.node_name }}</span>
    </div>
  </div>
</template>

