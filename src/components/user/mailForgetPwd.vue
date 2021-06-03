<script setup lang="ts">
import { ref, defineProps } from 'vue'
// @ts-ignore
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
} from '~/logic/user/login'
import { getMailCaptcha } from '~/api/user'
// @ts-ignore
const props = defineProps({
  areaCode: Object,
})
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
let codeFlag = false
const codeValue = ref<string>(I18n.common.message.verification)

// @ts-ignore
const onGetCode = async function() {
  if (codeFlag) {
    return false
  }
  try {
    const result = await onMailCaptchaForget()
    if (result.data.code !== 0) {
      messageError(result)
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
</script>

<template>
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
        :placeholder="I18n.common.placeholder.email"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="codeItem" prop="code">
      <el-input
        v-model="forgetMailData.code"
        :placeholder="I18n.common.placeholder.verification"
        class="input-with-select"
        autocomplete="off"
      >
        <template #append>
          <span class="link hand" @click="onGetCode">{{ codeValue }}</span>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="forgetMailData.password"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="new_password">
      <el-input
        v-model="forgetMailData.new_password"
        type="password"
        :placeholder="I18n.common.placeholder.new_password"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-0">
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
