<script setup lang="ts">
import { defineProps } from 'vue'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'

import I18n from '~/utils/i18n/index'
const store = Task()
defineProps({
  data: {
    type: Object,
  },
})
// @ts-ignore
const link = (): string => {
  const { origin, pathname } = window.location
  let url = `${origin}${pathname}`
  const code = `${userData.my_invitation_code}${store.shareCode.value}`
  if (code) {
    url = `${url}?code=${code}`
  }
  const $title = document.querySelector('title')
  const value = $title.innerText
  return I18n.template(I18n.growthpad.mdx.copy, { title: value, url })
}
</script>

<template>
  <div v-login>
    <Copy :link="link">
      <slot></slot>
    </Copy>
  </div>
</template>
