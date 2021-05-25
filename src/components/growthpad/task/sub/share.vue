<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { userData } from '~/logic/user/login'
defineProps({
  data: {
    type: Object,
  },
})
// @ts-ignore
const link = (): string => {
  const { origin, pathname } = window.location
  let url = `${origin}${pathname}`
  const code = userData.my_invitation_code
  if (code) {
    url = `${url}?code=${code}`
  }
  const $title = document.querySelector('title')
  const value = $title.innerText
  return `${url},邀请您参与「${value}」，赢取百万美元奖励，「${url}」`
}
</script>

<template>
  <div v-copy.message="link" class="inline-block">
    <slot></slot>
  </div>
</template>
