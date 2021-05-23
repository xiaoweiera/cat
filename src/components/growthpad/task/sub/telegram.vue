<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Task from '~/logic/growthpad/task'

const store = Task()
// @ts-ignore
const props = defineProps({
  data: {
    type: Object,
  },
})
const input = ref<string>('')

// @ts-ignore
const onSubmit = async function() {
  try {
    await store.setTelegram(input.value)
  } catch (e) {
    // todo
  }
}
</script>

<template>
  <div class="check-box">
    <el-input v-model="input" placeholder="输入您加入电报群的ID" size="small" />
    <div class="suffix" @click="onSubmit">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './input.scss';
</style>
