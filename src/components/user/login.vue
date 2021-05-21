<script setup lang="ts">
import { ElMessage } from 'element-plus'
import * as rules from './rules'
import I18n from '~/utils/i18n/index'
import { formdata, logoForm, onSubmit } from '~/logic/user/login'

const submit = async function() {
  try {
    await onSubmit()
    console.log('登录成功')
  } catch (e) {
    const message = e?.message
    ElMessage({ type: 'error', message })
  }
}
</script>

<template>
  <div class="logo text-center mb-3.5">
    <img class="inline-block" src="https://res.ikingdata.com/nav/logoJpg.png" />
  </div>
  <el-form
    ref="logoForm"
    class="formLogo"
    :rules="rules"
    :model="formdata"
    @submit.stop.prevent="submit"
  >
    <el-form-item prop="mobile">
      <el-input
        v-model="formdata.mobile"
        placeholder="请输入手机号"
        class="input-with-select"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-2" prop="password">
      <el-input
        v-model="formdata.password"
        type="password"
        placeholder="请输入密码"
        class="input-with-select"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-0 py-0.5">
      <el-checkbox v-model="formdata.checked">
        <span class="font-normal">自动登录</span>
      </el-checkbox>
    </el-form-item>
    <el-form-item class="mb-0">
      <ElButton class="w-full" type="primary" native-type="submit">
        <span class="font-bold font-17 font-kdFang">{{
          I18n.common.login
        }}</span>
      </ElButton>
    </el-form-item>
    <div class="pt-4.5 pb-2.5">
      <div class="flex items-center justify-between">
        <a class="inline-block">
          <span class="font-normal link">注册账号</span>
        </a>
        <a class="inline-block">
          <span class="font-normal link">忘记密码</span>
        </a>
      </div>
    </div>
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
