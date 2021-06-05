<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import {
  visible,
  visibleRegister,
  showVisible,
  loginTypeStatus,
  showRegisterVisible,
  goLogin,
  goRegister,
  goDialogforGet,
  goDialogLogin,
  hideVisible,
} from '~/store/header/login'
import { logout, syncUser, isLogin, userData } from '~/logic/user/login'
import { areaCode } from '~/api/user'

const outLogin = ref(false)
const areaCodes = ref([])
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
onMounted(async() => {
  // 刷新用户信息
  syncUser()
  areaCodes.value = await areaCode()
})
</script>

<template>
  <div v-if="!isLogin">
    <div
      class="
        ml-7.5
        hand
        text-global-default
        opacity-85
        text-kd16px24px
        font-normal
        flex
        items-center
      "
    >
      <!-- 新版登录 -->
      <IconFont type="user" size="3xl" @click.stop="goLogin"></IconFont>
      <!-- 旧版登录 -->
      <!--
      <span class="whitespace-nowrap" @click.stop="goLogin">{{
        I18n.common.login
      }}</span>
      <img
        class="w-0.5 h-0.5 ml-1 mr-1 Z"
        src="https://res.ikingdata.com/nav/dian.png"
        alt=""
      />
      <span class="whitespace-nowrap" @click.stop="goRegister">{{
        I18n.common.register
      }}</span>
      -->
    </div>
    <ElDialog
      v-model="visible"
      custom-class="dialog-login"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <!-- 显示注册 -->
      <UserRegister
        v-if="
          loginTypeStatus.type === 'tel' && loginTypeStatus.name === 'register'
        "
        :area-code="areaCodes"
      >
        <div class="pt-4.5 pb-2.5">
          <div class="flex items-center justify-center">
            <a
              class="inline-block font-normal link hand"
              @click="goDialogLogin"
            >
              <span>{{ I18n.common.switchLogin }}</span>
            </a>
          </div>
        </div>
      </UserRegister>
      <!-- 显示注册 -->
      <UserMailRegister
        v-if="
          loginTypeStatus.type === 'email' &&
            loginTypeStatus.name === 'register'
        "
        :area-code="areaCodes"
      >
        <div class="pt-4.5 pb-2.5">
          <div class="flex items-center justify-center">
            <a
              class="inline-block font-normal link hand"
              @click="goDialogLogin"
            ><span>{{ I18n.common.switchLogin }}</span></a>
          </div>
        </div>
      </UserMailRegister>
      <!-- 显示登录 -->
      <UserLogin
        v-if="
          loginTypeStatus.type === 'tel' && loginTypeStatus.name === 'login'
        "
        :area-code="areaCodes"
      >
        <div class="pt-4.5 pb-2.5 flex justify-between items-center">
          <div @click="goDialogLogin">
            <a class="inline-block font-normal link hand">
              <span>{{ I18n.common.switchRegister }}</span>
            </a>
          </div>
          <div @click="goDialogforGet">
            <a class="inline-block font-normal link hand">
              <span>{{ I18n.common.switchRorget }}</span>
            </a>
          </div>
        </div>
      </UserLogin>
      <UserMailLogin
        v-if="
          loginTypeStatus.type === 'email' && loginTypeStatus.name === 'login'
        "
        :area-code="areaCodes"
      >
        <div class="pt-4.5 pb-2.5 flex justify-between items-center">
          <div @click="goDialogLogin">
            <a class="inline-block font-normal link hand">
              <span>{{ I18n.common.switchRegister }}</span>
            </a>
          </div>
          <div @click="goDialogforGet">
            <a class="inline-block font-normal link hand">
              <span>{{ I18n.common.switchRorget }}</span>
            </a>
          </div>
        </div>
      </UserMailLogin>
      <UserForgetPwd
        v-if="
          loginTypeStatus.type === 'tel' && loginTypeStatus.name === 'forget'
        "
        :area-code="areaCodes"
      >
        <div class="pt-4.5 pb-2.5">
          <div class="flex items-center justify-center">
            <a
              class="inline-block font-normal link hand"
              @click="goDialogLogin"
            >
              <span>{{ I18n.common.switchLogin }}</span>
            </a>
          </div>
        </div>
      </UserForgetPwd>
      <UserMailForgetPwd
        v-if="
          loginTypeStatus.type === 'email' && loginTypeStatus.name === 'forget'
        "
        :area-code="areaCodes"
      >
        <div class="pt-4.5 pb-2.5">
          <div class="flex items-center justify-center">
            <a
              class="inline-block font-normal link hand"
              @click="goDialogLogin"
            >
              <span>{{ I18n.common.switchLogin }}</span>
            </a>
          </div>
        </div>
      </UserMailForgetPwd>
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
      @click="logout()"
    >
      <img
        class="w-5 h-5"
        src="https://res.ikingdata.com/nav/outLogin.png"
        alt=""
      />
      <div class="text-kd14px16px ml-2 w-10 flex">
        {{ I18n.common.loginOut }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (max-width: 768px) {
  .el-dialog {
    width: 350px !important;
    margin-top: 7vh;
  }
}
@media screen and (min-width: 768px) {
  .el-dialog {
    width: 400px !important;
  }
}
.el-dialog .el-dialog__body {
  padding: 0px 40px 20px 40px !important;
}
::v-deep(.mobileItem .el-input__inner) {
  border-left: 0px;
}
::v-deep(.mobileItem .el-input-group__prepend) {
  background: white;
}
::v-deep(.codeItem .el-input__inner) {
  border-right: 0px;
}
::v-deep(.codeItem .el-input-group__append) {
  background: white;
}
::v-deep(.checkedText .el-form-item__content) {
  line-height: 10px;
}
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
