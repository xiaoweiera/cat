<script setup lang="ts">
import { computed, defineProps, reactive, ref, toRaw } from 'vue'
import { checkAddress } from '../task'
import { addressEnum, getValueStatus, ValueStatus } from './value'
// @ts-ignore
import rules from './rule'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import activity from '~/logic/growthpad/activity'
import Message from '~/utils/message'

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

const store = Task()

// @ts-ignore
const loadingStatus = computed<ValueStatus>((): ValueStatus => {
  const status: ValueStatus = getValueStatus(props.name, store)
  return status
})

const formRef = ref<any>(null)
const formdata = reactive({
  input: '',
})

// @ts-ignore
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
      // @ts-ignore
      const name = addressEnum[props.name]
      // @ts-ignore
      if (name && store[name]) {
        console.log(name, formdata.input)
        // @ts-ignore
        await store[name](formdata.input)
      }
    }
  } catch (e) {
    console.log(e)
    // todo
  }
}
</script>

<template>
  <Loading v-if="loadingStatus === ValueStatus.check"></Loading>
  <IconFont
    v-else-if="loadingStatus === ValueStatus.success"
    type="success"
  ></IconFont>
  <el-form
    v-else
    ref="formRef"
    class="check-box md:w-56"
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
