<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw, onMounted, ref } from 'vue'
import rules from './rules'
import { messageError } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { showVisible } from '~/store/header/login'
import {
  registerData,
  registerForm,
  onRegisterSubmit,
} from '~/logic/user/login'
import { getCaptcha } from '~/api/user'

// 活动名称
const getVisitNum = function(): string {
  const router = toRaw(useRoute())
  const query = router.query.value
  return query?.code || ''
}

onMounted(() => {
  const code = getVisitNum()
  registerData.visitNum = code
})

const submit = async function() {
  try {
    const result = await onRegisterSubmit()
    if (result.code === 1) {
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
const codeValue = ref<string>('获取验证码')

const onGetCode = function() {
  if (codeFlag) {
    return false
  }
  codeFlag = true
  getCaptcha(registerData.mobile).catch(() => {
    // todo
  })
  interval = setInterval(() => {
    if (codeNumber <= 0) {
      codeNumber = 120
      clearInterval(interval)
      codeValue.value = '获取验证码'
      codeFlag = false
    } else {
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
  <el-form
    ref="registerForm"
    class="formLogo"
    :rules="rules"
    :model="registerData"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item prop="mobile">
      <el-input
        v-model="registerData.mobile"
        placeholder="请输入手机号"
        class="input-with-select"
        autocomplete="off"
      >
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>

    <el-form-item prop="code">
      <el-input
        v-model="registerData.code"
        placeholder="请输入验证码"
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
        v-model="registerData.password"
        type="password"
        placeholder="请输入密码"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-2">
      <el-input
        v-model="registerData.visitNum"
        placeholder="请输入邀请码"
        class="input-with-select"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <span>注册前请阅读</span>
      <a
        class="link"
        target="_blank"
        href="https://ikingdata.com/privacy_policy/"
      >用户隐私协议</a>
      <span class="defaultText">及</span>
      <a
        class="link"
        target="_blank"
        href="https://ikingdata.com/agreement/"
      >服务条款</a>
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
  line-height: inherit;
}
.font-17 {
  font-size: 17px;
}
</style>
