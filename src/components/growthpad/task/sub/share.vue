<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { userData } from '~/logic/user/login'
import { copyTxt } from '~/lib/tool'
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
  <div class="inline-block" @click="copyTxt(link)">
    <slot></slot>
  </div>
</template>
