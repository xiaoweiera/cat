<template>
  <div v-show="!isLogin">
    <div
      class="
        hand
        text-global-default
        opacity-85
        text-kd16px24px
        font-normal
        ml-7.5
        flex
        items-center
      "
      @click="showVisible()"
    >
      <span type="text" @click="showVisible">登录</span>
      <img
        class="w-0.5 h-0.5 ml-1 mr-1 Z"
        src="https://res.ikingdata.com/nav/dian.png"
        alt=""
      />
      <span type="text" @click="showVisible">注册</span>
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
  </div>
</template>

<script setup lang="ts">
import { visible, showVisible } from '~/store/header/login'
import { syncUser, isLogin } from '~/logic/user/login'

// 刷新用户信息
syncUser()

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
