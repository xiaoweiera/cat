<template>
  <div v-if="!isLogin">
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

  <div
    v-else
    class="
      relative
      text-global-default
      opacity-85
      text-kd16px24px
      font-normal
      ml-7.5
      flex
      items-center
    "
    @mouseleave="mouseLeave()"
    @mouseover="mouseover()"
  >
    <div>{{ userData.nickname }}</div>
    <img
      class="w-3 ml-2"
      src="https://res.ikingdata.com/nav/downTip.png"
      alt=""
    />
    <div
      v-if="outLogin"
      class="
        absolute
        top-6
        hand
        -right-2
        w-20
        h-8
        bg-global-primary
        loginOut
        flex
        items-center
        justify-center
        text-center
        px-3
      "
    >
      <img
        class="w-5 h-5"
        src="https://res.ikingdata.com/nav/outLogin.png"
        alt=""
      />
      <div class="text-kd14px16px ml-2 w-10 flex" @click="logout()">退出</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { visible, showVisible } from '~/store/header/login'
import { logout, syncUser, isLogin, userData } from '~/logic/user/login'

// 刷新用户信息
syncUser()
const outLogin = ref(false)
const mouseover = () => {
  outLogin.value = true
}
const mouseLeave = () => {
  outLogin.value = false
}
// 弹窗关闭前
const handleClose = function(next) {
  return next()
}
</script>

<style lang="scss">
.loginOut {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
}
.dialog-login {
  max-width: 100% !important;
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
