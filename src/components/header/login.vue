<template>
  <div>
    <ElButton type="text" @click="showVisible">登录/注册</ElButton>
  </div>
  <ElDialog v-model="visible" width="400px" :before-close="handleClose">
    <UserLogin></UserLogin>
  </ElDialog>
</template>

<script setup lang="ts">
// @ts-ignore
import { ElDialog, ElButton } from 'element-plus'
import { visible, showVisible } from '~/store/header/login'

// 弹窗关闭前
const handleClose = function(next) {
  return next()
}
</script>

<style scoped></style>
