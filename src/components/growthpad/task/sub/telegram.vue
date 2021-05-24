<script setup lang="ts">
import { defineProps, reactive, ref, toRaw } from 'vue'
import rules from './rule'
import Task from '~/logic/growthpad/task'
import activity from '~/logic/growthpad/activity'
import Message from '~/utils/message'
import { checkAddress } from '~/components/growthpad/task/task'
const store = Task()

defineProps({
  data: {
    type: Object,
  },
})

const formRef = ref<any>(null)
const formdata = reactive({
  input: '',
})

const onSubmit = async function() {
  const form = toRaw(formRef).value
  try {
    await form.validate()
    let status = checkAddress(store)
    // 判断活动时间
    if (status) {
      status = activity(store)
    }
    if (status) {
      await store.setTelegram(formdata.input.value)
    }
  } catch (e) {
    // todo
  }
}
</script>

<template>
  <el-form
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
        placeholder="输入您加入电报群的ID"
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
