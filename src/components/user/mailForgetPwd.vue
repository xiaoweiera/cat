<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
// @ts-ignore
import { ElDialog } from 'element-plus'
import emailRules from './emailRules'
import { messageError, messageSuccess } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { goDialogLogin } from '~/store/header/login'
// @ts-ignore
import {
  forgetMailData,
  forgetMailForm,
  onFindPwdMail,
  onMailCaptchaForget,
  emailField,
} from '~/logic/user/login'
const codeDialog = ref(false)
let codeFlag = false
const clearCodeInfo = () => {
  forgetMailData.csessionid = ''
  forgetMailData.sig = ''
  forgetMailData.token = ''
  forgetMailData.checkValue = false
}
onMounted(() => {
  clearCodeInfo()
})
const showCodeDialog = async() => {
  if (!codeFlag) {
    await emailField(forgetMailForm)
    clearCodeInfo()
    codeDialog.value = true
  }
}
// @ts-ignore
const submit = async function() {
  try {
    const result = await onFindPwdMail()
    if (result.code !== 0) {
      messageError(result.message)
    } else {
      messageSuccess('重置密码成功')
      goDialogLogin()
    }
  } catch (e) {
    const message = e?.message
    if (message) {
      const data = {
        err: [message],
      }
      messageError(data)
    }
  }
}

let codeNumber = 120
let interval: any = 0

const codeValue = ref<string>(I18n.common.message.verification)

// @ts-ignore
const onGetCode = async function() {
  if (codeFlag) {
    return false
  }
  try {
    const result = await onMailCaptchaForget('forget')
    if (result.data.code !== 0) {
      messageError(result.data.message)
    } else {
      codeFlag = true
      interval = setInterval(() => {
        if (codeNumber <= 0) {
          codeNumber = 120
          clearInterval(interval)
          codeValue.value = I18n.common.message.verification
          codeFlag = false
        } else {
          // @ts-ignore
          codeValue.value = codeNumber
          codeNumber--
        }
      }, 1000)
    }
  } catch (e) {
    const message = e?.message
    if (message) {
      const data = {
        err: [message],
      }
      messageError(data)
    }
  }
}

const onCheckChange = (data) => {
  codeDialog.value = false
  forgetMailData.csessionid = data.csessionid
  forgetMailData.sig = data.sig
  forgetMailData.token = data.token
  forgetMailData.checkValue = data.value
  onGetCode()
}
</script>

<template>
  <ElDialog
    v-if="codeDialog"
    v-model="codeDialog"
    custom-class="dialog-login  codeDialogContainer"
    :append-to-body="true"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="text-kd16px24px mb-6.25 text-global-default">
        {{ I18n.common.message.codeDialog }}
      </div>
      <img
        class="w-18 mb-6.25"
        src="https://res.ikingdata.com/nav/codeHand.jpg"
        alt=""
      />
      <UtilCheck @change="onCheckChange"></UtilCheck>
    </div>
  </ElDialog>
  <!--  手机号 邮箱类型-->
  <UserLoginTag />
  <el-form
    ref="forgetMailForm"
    class="formLogo"
    :rules="emailRules"
    :model="forgetMailData"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item prop="email">
      <el-input
        v-model="forgetMailData.email"
        name="email"
        type="email"
        :placeholder="I18n.common.placeholder.email"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="codeItem" prop="code">
      <el-input
        v-model="forgetMailData.code"
        name="emailCode"
        :placeholder="I18n.common.placeholder.verification"
        class="input-with-select"
        autocomplete="off"
      >
        <template #append>
          <span
            class="link hand"
            @click="showCodeDialog"
          >{{ codeValue
          }}<span
            v-if="codeValue !== I18n.common.message.verification"
          >s</span></span>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="forgetMailData.password"
        name="emailPwd"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="new_password">
      <el-input
        v-model="forgetMailData.new_password"
        name="emailNewPwd"
        type="password"
        :placeholder="I18n.common.placeholder.new_password"
        class="input-with-select"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <ElButton class="w-full" type="primary" native-type="submit">
        <span class="font-bold font-17 font-kdFang">{{
          I18n.common.resetPassword
        }}</span>
      </ElButton>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<style scoped lang="scss">
.codeDialogContainer {
  position: absolute !important;
  height: fit-content !important;
  left: 0px;
  right: 0px;
  top: 15%;
  bottom: 0px;
}
::v-deep(.el-button--primary) {
  background: #2b8dfe !important;
}
::v-deep(.mobileItem .el-input-group__prepend) {
  background: white;
}
::v-deep(.codeItem .el-input-group__append) {
  background: white;
}
.mb-2 {
  margin-bottom: 8px !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.logo {
  img {
    width: 150px;
  }
}
.el-button {
  padding: 6px;
}
.link {
  color: #2b8cff;
}
.line-auto {
  line-height: initial;
}
.font-17 {
  font-size: 17px;
}
.register-box {
  line-height: initial;
}
</style>
