<script setup lang="ts">
import { computed, defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
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
  return I18n.template(I18n.growthpad.copy, { url })
})
</script>

<template>
  <div v-login class="title">
    <Copy :link="link">
      <slot></slot>
    </Copy>
  </div>
</template>

<style scoped></style>
