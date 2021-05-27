<script setup lang="ts">
import { defineProps, reactive, ref, toRaw } from 'vue'
import { checkAddress } from '../task'
import rules from './rule'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import activity from '~/logic/growthpad/activity'
const store = Task()

defineProps({
  data: {
    type: Object,
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
    await form.validate()
    let status = checkAddress(store)
    // 判断活动时间
    if (status) {
      status = activity(store)
    }
    if (status) {
      loadingStatus.value = true
      await store.setReTwitter(formdata.input)
    }
  } catch (e) {
    console.log(e)
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
        :placeholder="I18n.growthpad.form.sina"
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
