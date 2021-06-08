<script setup lang="ts">
import { defineProps, ref } from 'vue'
import rules from './rules'
import I18n from '~/utils/i18n/index'
import { messageError } from '~/lib/tool'
import { hideVisible } from '~/store/header/login'
// @ts-ignore
import { formdata, logoForm, onSubmit } from '~/logic/user/login'

const props = defineProps({
  areaCode: Object,
})
console.log(props.areaCode)
const submit = async function() {
  try {
    await onSubmit()
    hideVisible()
    window.location.reload()
  } catch (e) {
    console.log(e)
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
  <div class="logo text-center mb-6">
    <img class="inline-block" src="https://res.ikingdata.com/nav/logoJpg.png" />
  </div>
  <!--  手机号 邮箱类型-->
  <UserLoginTag />
  <el-form
    ref="logoForm"
    class="formLogo"
    :rules="rules"
    :model="formdata"
    autocomplete="off"
    @submit.stop.prevent="submit"
  >
    <el-form-item class="mobileItem" prop="mobile">
      <div class="flex items-center">
        <el-input
          v-model="formdata.mobile"
          name="mobile"
          type="text"
          :placeholder="I18n.common.placeholder.tel"
          class="input-with-select"
          autocomplete="off"
        >
          <template #prepend>
            <el-select v-model="formdata.area_code" placeholder="+86">
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
      </div>
    </el-form-item>
    <el-form-item class="mb-2" prop="password">
      <el-input
        v-model="formdata.password"
        name="pwd"
        type="password"
        :placeholder="I18n.common.placeholder.password"
        class="input-with-select"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="mb-0 py-0.5">
      <el-checkbox v-model="formdata.checked">
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
::v-deep(.checkedText .el-form-item__content) {
  line-height: 10px;
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
  line-height: inherit;
}
.font-17 {
  font-size: 17px;
}
</style>
