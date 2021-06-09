<script setup lang="ts">
import { computed } from 'vue'
import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'
import { Project } from '~/api/growtask'
const store = Task()
// @ts-ignore
const data = computed(() => {
  return {
    type: TaskType.share,
    title: I18n.growthpad.mdx.share.lable,
  }
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
    value = I18n.growthpad.growthpad.title
  } else {
    const $title = document.querySelector('title')
    value = $title.innerText
  }
  return I18n.template(I18n.growthpad.mdx.copy, { title: value, url })
}
</script>
<template>
  <GrowthpadTaskTitle class="flex justify-between items-center" :data="data">
    <template #desc>
      <span class="md:flex items-center pt-1.5">
        <span class="flex items-center">
          <span>{{ I18n.growthpad.invited.userCount }}</span>
          <i class="ml-1">{{ userData.invited_count || 0 }}</i>
        </span>
        <span class="flex items-center md:ml-6 mt-1.5 md:mt-0">
          <span>{{ I18n.growthpad.invited.activeCount }}</span>
          <i class="ml-1">{{ userData.growthpad_invited_count || 0 }}</i>
          <div class="ml-1.5 hidden md:inline-block">
            <UiPopover>
              <template #reference>
                <IconFont class="flex" type="help" size="base"></IconFont>
              </template>
              <template #content>
                <p
                  class="leading-loose"
                  v-html="I18n.growthpad.invited.help"
                ></p>
              </template>
            </UiPopover>
          </div>
        </span>
        <span
          v-if="userData.my_invitation_code"
          class="mt-1.5 md:mt-0 md:ml-6 flex items-center"
        >
          <span>{{ I18n.growthpad.invited.code }}</span>
          <i
            class="ml-1"
          >{{ userData.my_invitation_code }}{{ store.shareCode.value }}</i>
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
