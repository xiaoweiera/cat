<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw, onMounted, ref, defineProps } from 'vue'
import rules from './rules'
import { messageError, messageSuccess } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { goDialogLogin } from '~/store/header/login'
import {
  registerData,
  registerForm,
  onRegisterSubmit,
  onCaptchaResgister,
} from '~/logic/user/login'
const props = defineProps({
  areaCode: Object,
})
const isHasCode = ref('')
// 活动名称
const getVisitNum = function(): string {
  const router = toRaw(useRoute())
  const query = router.query.value
  // @ts-ignore
  return query?.code || ''
}

onMounted(() => {
  const code = getVisitNum()
  registerData.invitation_code = code
  isHasCode.value = code
})
const submit = async function() {
  try {
    const result = await onRegisterSubmit()
    console.log(result)

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
    const result = await onCaptchaResgister()
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
    ref="registerForm"
    class="formLogo"
    :rules="rules"
    :model="registerData"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item class="mobileItem" prop="mobile">
      <el-input
        v-model="registerData.mobile"
        type="text"
        :placeholder="I18n.common.placeholder.tel"
        class="input-with-select"
        autocomplete="off"
      >
        <template #prepend>
          <el-select v-model="registerData.area_code" placeholder="+86">
            <el-option
              v-for="item in areaCode"
              :key="item.phone_code"
              :label="item.phone_code"
              :value="item.phone_code"
            >
              <span style="float: left">{{ item.phone_code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.cn
              }}</span>
            </el-option>
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="codeItem" prop="code">
      <el-input
        v-model="registerData.code"
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
        v-model="registerData.password"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-2">
      <el-input
        v-model="registerData.invitation_code"
        :disabled="isHasCode !== ''"
        :placeholder="I18n.common.user.invite"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="checkedText" prop="checked">
      <div class="text-center">
        <el-checkbox v-model="registerData.checked">
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
.codeContainer {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 0px solid white;
}
::v-deep(.mobileItem .el-input__inner) {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
::v-deep(.mobileItem .el-input-group__prepend) {
  background: white;
}
::v-deep(.codeItem .el-input-group__append) {
  background: white;
}
.checkedText {
  width: fit-content;
  margin: 20px auto;
}
::v-deep(.el-select .el-input__inner) {
  width: 52px;
  padding-left: 0px !important;
  margin-right: 10px !important;
  padding-right: 0px !important;
  text-align: center;
}
::v-deep(.el-input__suffix) {
  right: 0px;
  padding: 0px;
  margin: 0px;
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
