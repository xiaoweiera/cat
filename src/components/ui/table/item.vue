<script setup lang="ts">
  import { defineProps } from 'vue'
  defineProps({
    label: {
      type: String
    }
  })
</script>

<template>
  <div class="w-full md:flex">
    <slot name="label">
      <div class="w-24 text-sm text-kdFang text-global-highTitle leading-10">{{ label }}</div>
    </slot>
    <div class="md:mt-0 flex-auto" :class="{'mt-2': !!label}">
      <slot></slot>
    </div>
  </div>
</template>
