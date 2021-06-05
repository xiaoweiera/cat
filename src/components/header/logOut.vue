<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import { logout, userData } from '~/logic/user/login'
</script>

<template>
  <div @click="logout()">
    <el-popover placement="bottom-start" width="auto" trigger="click">
      <template #reference>
        <div class="flex items-center">
          <div>{{ userData.nickname }}</div>
          <img
            class="w-3 ml-2"
            src="https://res.ikingdata.com/nav/downTip.png"
            alt=""
          />
        </div>
      </template>
      <div>
        <img
          class="w-5 h-5"
          src="https://res.ikingdata.com/nav/outLogin.png"
          alt=""
        />
        <div class="text-kd14px16px ml-2 w-10 flex">
          {{ I18n.common.loginOut }}
        </div>
      </div>
    </el-popover>
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
