<script setup lang="ts">
import { defineProps, ref } from 'vue'
import rules from './rules'
import I18n from '~/utils/i18n/index'
import { messageError, messageSuccess } from '~/lib/tool'
import { goDialogLogin, hideVisible } from '~/store/header/login'
import { formMailData, logoMailForm, onSubmitMail } from '~/logic/user/login'
const props = defineProps({
  areaCode: Object,
})
const submit = async function() {
  try {
    await onSubmitMail()
    hideVisible()
    window.location.reload()
  } catch (e) {
    const message = e?.message
    if (message) {
      messageError(message)
    }
  }
}
</script>
<template>
  <div class="logo text-center mb-6">
    <img class="inline-block" src="https://res.ikingdata.com/nav/logoJpg.png" />
  </div>
  <!--  手机号 邮箱类型-->
  <UserLoginTag />
  <el-form
    ref="logoMailForm"
    class="formLogo"
    :rules="rules"
    :model="formMailData"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item prop="email">
      <el-input
        v-model="formMailData.email"
        name="email"
        type="email"
        :placeholder="I18n.common.placeholder.email"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-2" prop="password">
      <el-input
        v-model="formMailData.password"
        name="emailPwd"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-0 py-0.5">
      <el-checkbox v-model="formMailData.checked">
        <span class="font-normal">{{ I18n.common.placeholder.login }}</span>
      </el-checkbox>
    </el-form-item>
    <el-form-item class="mb-0">
      <ElButton class="w-full" type="primary" native-type="submit">
        <span class="font-bold font-17 font-kdFang">{{
          I18n.common.login
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
  line-height: inherit;
}
.font-17 {
  font-size: 17px;
}
</style>
