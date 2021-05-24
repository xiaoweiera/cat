<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { copyTxt } from '~/lib/tool'
import { userData } from '~/logic/user/login'
const props = defineProps({
  data: {
    type: Object,
  },
})
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
  <div @click="copyTxt(link)">
    <slot></slot>
  </div>
</template>

<style scoped></style>
