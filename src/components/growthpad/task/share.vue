<script setup lang="ts">
import { TaskType } from '~/logic/growthpad/examples'
const data = {
  type: TaskType.share,
  title: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%',
}
</script>
<template>
  <GrowthpadTaskTitle :data="data">
    <template #desc>
      <span class="block pt-1.5">
        <span>我邀请参与活动的人数：</span>
        <i>11</i>
        <span class="ml-6">我的邀请码：</span>
        <i>HC432R</i>
        <b class="ml-2 el-icon-document-copy"></b>
      </span>
    </template>
    <template #right>
      <GrowthpadTaskCheck :data="data"></GrowthpadTaskCheck>
    </template>
  </GrowthpadTaskTitle>
</template>
<style scoped></style>
