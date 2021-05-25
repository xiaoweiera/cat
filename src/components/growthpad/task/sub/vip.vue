<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { userData } from '~/logic/user/login'
const props = defineProps({
  data: {
    type: Object,
  },
})
const link = computed<string>((): string => {
  const { origin, pathname } = window.location
  let url = `${origin}${pathname}`
  const code = userData.my_invitation_code
  if (code) {
    url = `${url}?code=${code}`
  }
  return `邀请你注册Kingdata，「${url}」`
})
</script>

<template>
  <div v-login class="title">
    <div v-copy.message="link">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
