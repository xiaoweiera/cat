<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw, ref } from 'vue'
import rules from './rules'
import { messageError } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { showVisible } from '~/store/header/login'
import { forgetData, forgetForm, onFindPwd } from '~/logic/user/login'
import { getCaptcha, findPwd } from '~/api/user'

const submit = async function() {
  try {
    const result = await onFindPwd()
    if (result.code !== 0) {
      messageError(result.message)
    } else {
      showVisible()
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
const onGetCode = function() {
  if (codeFlag) {
    return false
  }
  codeFlag = true
  getCaptcha(forgetData.mobile).catch(() => {
    // todo
  })
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
</script>

<template>
  <div class="logo text-center mb-3.5">
    <img class="inline-block" src="https://res.ikingdata.com/nav/logoJpg.png" />
  </div>
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
    <el-form-item prop="mobile">
      <el-input
        v-model="forgetData.mobile"
        :placeholder="I18n.common.placeholder.tel"
        class="input-with-select"
        autocomplete="off"
      >
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        v-model="forgetData.code"
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
        v-model="forgetData.password"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="forgetData.confirmPassword"
        type="password"
        :placeholder="I18n.common.placeholder.confirmPassword"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="register-box">
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
