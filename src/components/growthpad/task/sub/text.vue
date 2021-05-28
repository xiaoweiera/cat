<script setup lang="ts">
import { defineProps, reactive, ref, toRaw } from 'vue'
import { checkAddress } from '../task'
import rules from './rule'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import activity from '~/logic/growthpad/activity'
import Message from '~/utils/message'
const store = Task()

const addressEnum = {
  telegram: 'setTelegram',
  twitter: 'setTwitter',
  retwitter: 'setReTwitter',

  pancake: 'setPancake',
  uniswap: 'setUniswap',
  sushiswap: 'setSushiswap',

  sina: 'setSinaNickname',
  venus: 'setVenus',
  compound: 'setCompound',
  cream: 'setCream',

  autofarm: 'setAutofarm',
  beltfit: 'setBeltfit',
}

const props = defineProps({
  // 判断地址名称
  name: {
    type: String,
  },
  // 输入框提示信息
  placeholder: {
    type: String,
  },
  data: {
    type: Object,
  },
  confirm: {
    type: Boolean,
    default: () => {
      return false
    },
  },
})

const loadingStatus = ref<boolean>(false)

const formRef = ref<any>(null)
const formdata = reactive({
  input: '',
})

const onSubmit = async function() {
  const form = toRaw(formRef).value
  try {
    // 表单校验
    await form.validate()
    // 判断信息登记
    let status = checkAddress(store)
    // 判断活动时间
    if (status) {
      status = activity(store)
    }
    // 在活动时间范围内判断是否需要二次确认
    if (status && props.confirm) {
      // 输入内容确认
      status = await Message(I18n.growthpad.form.address, {
        value: formdata.input,
        warn: I18n.growthpad.form.warning,
      })
    }
    if (status) {
      loadingStatus.value = true
      const name = addressEnum[props.name]
      if (name && store[name]) {
        await store[name](formdata.input)
      }
    }
  } catch (e) {
    // todo
  }
}
</script>

<template>
  <Loading v-if="loadingStatus"></Loading>
  <el-form
    v-else
    ref="formRef"
    class="check-box"
    label-width="0px"
    :show-message="false"
    :model="formdata"
    :rules="rules"
    @submit.stop.prevent="onSubmit"
  >
    <el-form-item prop="input">
      <el-input
        v-model="formdata.input"
        :placeholder="placeholder"
        size="small"
      />
    </el-form-item>
    <div class="suffix" @click="onSubmit">
      <slot></slot>
    </div>
  </el-form>
</template>

<style scoped lang="scss">
@import './input.scss';
</style>
