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
  <Apy2HecoCustom v-if="data.custom" :data="data"/>
  <div class="flex items-center" v-else>
    <IconFont class="mr-2" :type="data.node_logo" rounded size="24"/>
    <span :class="data.className">{{ data.node_name }}</span>
  </div>
</template>

