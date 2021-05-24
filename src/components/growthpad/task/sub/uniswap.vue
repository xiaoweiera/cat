<script setup lang="ts">
import { defineProps, reactive, ref, toRaw } from 'vue'
import rules from './rule'
import Task from '~/logic/growthpad/task'
import activity from '~/logic/growthpad/activity'
import Message from '~/utils/message'
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
    // 判断活动时间
    let status = activity(store)
    // 在活动时间范围内
    if (status) {
      // 提示地址确认
      status = await Message('确认地址', {
        value: formdata.input,
        warn: '地址一旦确认不可修改，任务奖励将发放到该地址中',
      })
    }
    if (status) {
      await store.setUniswap(formdata.input.value)
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
        placeholder="请输入验证的 ETH 地址"
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
