<script setup lang="ts">
import { computed, defineProps, reactive, ref, toRaw } from 'vue'
import { checkAddress } from '../task'
import { addressEnum, getValueStatus } from './value'
// @ts-ignore
import rules from './rule'
import { MissionStatus } from '~/store/growthpad/props'
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

const editStatus = ref<boolean>(false)

// @ts-ignore
const loadingStatus = computed<MissionStatus>((): MissionStatus => {
  const status: MissionStatus = getValueStatus(props.name, store)
  if (status) {
    return status
  }
  // 默认为空
  return MissionStatus.init
})

const formRef = ref<any>(null)
const formdata = reactive({
  input: '',
})

// @ts-ignore
const onSubmit = async function() {
  const form = toRaw(formRef).value
  const value = formdata.input
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
        value,
        warn: I18n.growthpad.form.warning,
      })
    }
    if (status) {
      editStatus.value = true
      // @ts-ignore
      const name = addressEnum[props.name]
      // @ts-ignore
      if (name && store[name]) {
        // 清空表单
        form.resetFields()
        // 清除验证结果
        form.clearValidate()

        // @ts-ignore
        await store[name](value)
      }
    }
  } catch (e) {
    console.log(e)
    // todo
  }
}
</script>

<template>
  <Loading v-if="loadingStatus === MissionStatus.loading"></Loading>
  <IconFont
    v-else-if="loadingStatus === MissionStatus.success"
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
        :placeholder="
          loadingStatus === MissionStatus.fail
            ? I18n.common.message.fail
            : placeholder
        "
        autocomplete="off"
        size="small"
        :class="{ fail: loadingStatus === MissionStatus.fail }"
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
