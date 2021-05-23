<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Task from '~/logic/growthpad/task'

const store = Task()

const props = defineProps({
  data: {
    type: Object,
  },
})
const input = ref<string>('')

const onSubmit = async function() {
  try {
    await store.setTwitter(input.value)
  } catch (e) {
    // todo
  }
}
</script>

<template>
  <div class="check-box">
    <el-input v-model="input" placeholder="输入您的TwitterID" size="small" />
    <div class="suffix" @click="onSubmit">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './input.scss';
</style>
