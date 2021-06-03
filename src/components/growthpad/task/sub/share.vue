<script setup lang="ts">
import { defineProps } from 'vue'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'

import I18n from '~/utils/i18n/index'
import { Project } from '~/api/growtask'
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
  let value = ''

  // @ts-ignore
  const name: Project = store.projectName
  if (name === Project.coinwind) {
    value = I18n.growthpad.coinwind.title
  } else if (name === Project.mdx) {
    value = I18n.growthpad.mdx.title
  } else if (name === Project.channels) {
    value = I18n.growthpad.channels.title
  } else if (name === Project.growth) {
    value = I18n.growthpad.growth.title
  } else {
    const $title = document.querySelector('title')
    value = $title.innerText
  }
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
