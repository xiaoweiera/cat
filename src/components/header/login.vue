<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'
import {
  visible,
  visibleRegister,
  showVisible,
  showRegisterVisible,
  hideVisible,
} from '~/store/header/login'
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
  hideVisible()
  return next()
}
</script>

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
    >
      <span class="whitespace-nowrap" @click.stop="showVisible">{{
        I18n.common.login
      }}</span>
      <img
        class="w-0.5 h-0.5 ml-1 mr-1 Z"
        src="https://res.ikingdata.com/nav/dian.png"
        alt=""
      />
      <span class="whitespace-nowrap" @click.stop="showRegisterVisible">{{
        I18n.common.register
      }}</span>
    </div>
    <ElDialog
      v-model="visible"
      custom-class="dialog-login"
      width="400px"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <!-- 显示注册 -->
      <UserRegister v-if="visibleRegister">
        <div class="pt-4.5 pb-2.5">
          <div class="flex items-center justify-center">
            <a class="inline-block font-normal link hand" @click="showVisible">
              <span>{{ I18n.common.switchLogin }}</span>
            </a>
          </div>
        </div>
      </UserRegister>
      <!-- 显示登录 -->
      <UserLogin v-else>
        <div class="pt-4.5 pb-2.5">
          <div @click="showRegisterVisible">
            <a class="inline-block font-normal link hand">
              <span>{{ I18n.common.switchRegister }}</span>
            </a>
          </div>
        </div>
      </UserLogin>
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
.link {
  color: #2b8cff;
}
</style>
