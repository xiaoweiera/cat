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
      <span class="text-sm text-global-highTitle text-kdExp leading-6" :class="data.className">{{ data.node_name }}</span>
    </div>
  </div>
</template>

