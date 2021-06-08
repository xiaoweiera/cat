<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw, ref, defineProps } from 'vue'
import rules from './rules'
import { messageError, messageSuccess } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { goDialogLogin } from '~/store/header/login'
import {
  forgetData,
  forgetForm,
  onFindPwd,
  onCaptchaForget,
} from '~/logic/user/login'
const props = defineProps({
  areaCode: Object,
})
const submit = async function() {
  try {
    const result = await onFindPwd()
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
    const result = await onCaptchaForget()
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
  <!--  手机号 邮箱类型-->
  <UserLoginTag />
  <el-form
    ref="forgetForm"
    class="formLogo"
    :rules="rules"
    :model="forgetData"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item class="mobileItem" prop="mobile">
      <el-input
        v-model="forgetData.mobile"
        type="text"
        :placeholder="I18n.common.placeholder.tel"
        class="input-with-select"
        autocomplete="off"
      >
        <template #prepend>
          <el-select v-model="forgetData.area_code" placeholder="+86">
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
        v-model="forgetData.code"
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
        v-model="forgetData.password"
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
        v-model="forgetData.new_password"
        type="password"
        :placeholder="I18n.common.placeholder.new_password"
        class="input-with-select"
        show-password
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
