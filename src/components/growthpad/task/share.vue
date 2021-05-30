<script setup lang="ts">
import { computed } from 'vue'
import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'
const store = Task()

const data = computed(() => {
  return {
    type: TaskType.share,
    title: I18n.growthpad.mdx.share.lable,
  }
})
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
  <GrowthpadTaskTitle class="flex justify-between items-center" :data="data">
    <template #desc>
      <span class="md:flex items-center pt-1.5">
        <span class="flex items-center">
          <span>{{ I18n.growthpad.invited.count }}</span>
          <i>{{ store.invited_count.value || 0 }}</i>
        </span>
        <span class="mt-1.5 md:mt-0 md:ml-6 flex items-center">
          <span class="">{{ I18n.growthpad.invited.code }}</span>
          <i>{{ userData.my_invitation_code }}{{ store.shareCode.value }}</i>
          <span v-login>
            <Copy :link="link">
              <IconFont
                class="ml-2 hand flex"
                type="copy"
                size="base"
              ></IconFont>
            </Copy>
          </span>
        </span>
      </span>
    </template>
    <template #right>
      <div class="pl-3">
        <GrowthpadTaskCheck :data="data"></GrowthpadTaskCheck>
      </div>
    </template>
  </GrowthpadTaskTitle>
</template>
