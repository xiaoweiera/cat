<script setup lang="ts">
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'
const store = Task()

const data = {
  type: TaskType.share,
  title: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%',
}
const link = (): string => {
  const { origin, pathname } = window.location
  let url = `${origin}${pathname}`
  const code = userData.my_invitation_code
  if (code) {
    url = `${url}?code=${code}`
  }
  const $title = document.querySelector('title')
  const value = $title.innerText
  return `邀请您参与「${value}」，赢取百万美元奖励，「${url}」`
}
</script>
<template>
  <GrowthpadTaskTitle class="flex justify-between items-center" :data="data">
    <template #desc>
      <span class="md:flex items-center pt-1.5">
        <span class="flex items-center">
          <span>我邀请参与活动的人数：</span>
          <i>{{ store.user.invited_count || 0 }}</i>
        </span>
        <span class="mt-1.5 md:mt-0 md:ml-6 flex items-center">
          <span class="">我的邀请码：</span>
          <i>{{ userData.my_invitation_code }}</i>
          <span v-login>
            <IconFont
              v-copy.message="link"
              class="ml-2 hand flex"
              type="copy"
              size="base"
            ></IconFont>
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
<style scoped></style>
