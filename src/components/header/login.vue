<template>
  <div>
    <ElButton type="text" @click="showVisible">登录/注册</ElButton>
  </div>
  <ElDialog
    v-model="visible"
    custom-class="dialog-login"
    width="400px"
    :append-to-body="true"
    :before-close="handleClose"
  >
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

<style lang="scss">
.dialog-login {
  max-width: 100% !important;
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
