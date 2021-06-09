<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw, onMounted, ref } from 'vue'
// @ts-ignore
import rules from './emailRules'
import { messageError, messageSuccess } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { goDialogLogin, showVisible } from '~/store/header/login'
import {
  registerMailData,
  registerMailForm,
  onRegisterMailSubmit,
  onMailCaptchaResgister,
} from '~/logic/user/login'
// @ts-ignore
import { getMailCaptcha } from '~/api/user'
const isHasCode = ref('')
// 活动名称
const getVisitNum = function(): string {
  const router = toRaw(useRoute())
  const query = router.query.value
  // @ts-ignore
  return query?.code || ''
}

onMounted(() => {
  registerMailData.csessionid = ''
  registerMailData.sig = ''
  registerMailData.token = ''
  registerMailData.checkValue = false
  const code = getVisitNum()
  registerMailData.invitation_code = code
  isHasCode.value = code
})
// 人机验证
const onCheckChange = (data) => {
  registerMailData.csessionid = data.csessionid
  registerMailData.sig = data.sig
  registerMailData.token = data.token
  registerMailData.checkValue = data.value
}

const submit = async function() {
  try {
    const result = await onRegisterMailSubmit()
    if (result.code !== 0) {
      messageError(result.message)
    } else {
      messageSuccess('注册成功')
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
    const result = await onMailCaptchaResgister('create')
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
</script>

<template>
  <div class="logo text-center mb-3.5">
    <img class="inline-block" src="https://res.ikingdata.com/nav/logoJpg.png" />
  </div>
  <!--  手机号 邮箱类型-->
  <UserLoginTag />
  <el-form
    ref="registerMailForm"
    class="formLogo"
    :rules="rules"
    :model="registerMailData"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item prop="email">
      <el-input
        v-model="registerMailData.email"
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
        v-model="registerMailData.code"
        name="emailCreateCode"
        :placeholder="I18n.common.placeholder.verification"
        class="input-with-select"
        autocomplete="off"
      >
        <template #append>
          <span
            class="link hand"
            @click="onGetCode"
          >{{ codeValue
          }}<span
            v-if="codeValue !== I18n.common.message.verification"
          >s</span></span>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="registerMailData.password"
        name="emailCreatePwd"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="registerMailData.invitation_code"
        name="emailInvit_code"
        :disabled="isHasCode !== ''"
        :placeholder="I18n.common.user.invite"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="checkValue">
      <UtilCheck @change="onCheckChange"></UtilCheck>
    </el-form-item>
    <el-form-item class="checkedText" prop="checked">
      <div class="text-center">
        <el-checkbox v-model="registerMailData.checked">
          <div class="register-box flex flex-wrap">
            <span class="inline-block">{{ I18n.common.user.read }}</span>
            <a
              class="link inline-block"
              target="_blank"
              href="https://ikingdata.com/privacy_policy/"
            >{{ I18n.common.user.agreement }}</a>
            <span class="defaultText inline-block">{{ I18n.common.and }}</span>
            <a
              class="link inline-block"
              target="_blank"
              href="https://ikingdata.com/agreement/"
            >{{ I18n.common.user.terms }}</a>
          </div>
        </el-checkbox>
      </div>
    </el-form-item>
    <el-form-item class="mb-0">
      <ElButton class="w-full" type="primary" native-type="submit">
        <span class="font-bold font-17 font-kdFang">{{
          I18n.common.register
        }}</span>
      </ElButton>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<style scoped lang="scss">
::v-deep(.el-dialog__body) {
  padding: 50px 40px;
}
::v-deep(.mobileItem .el-input-group__prepend) {
  background: white;
}
::v-deep(.codeItem .el-input-group__append) {
  background: white;
}
::v-deep(.checkedText .el-form-item__content) {
  line-height: 10px;
}
.checkedText {
  width: fit-content;
  margin: 20px auto;
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
