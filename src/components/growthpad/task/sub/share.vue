<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { userData } from '~/logic/user/login'

defineProps({
  data: {
    type: Object,
  },
})
// @ts-ignore
const link = computed<string>((): string => {
  const url = 'http://kingdata.com/vip/'
  const code = userData.my_invitation_code
  if (code) {
    return `${url}?code=${code}`
  }
  return url
})
</script>

<template>
  <a class="inline-block" target="_blank" :href="link">
    <slot></slot>
  </a>
</template>
