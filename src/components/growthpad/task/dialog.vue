<script lang="ts" setup>
import { defineProps } from 'vue'
// @ts-ignore
const props = defineProps({
  type: String, // 弹窗类型
})
</script>

<template>
  <ElDialog
    v-model="visible"
    custom-class="dialog-login"
    width="400px"
    :append-to-body="true"
    :before-close="handleClose"
  >
    <UserLogin></UserLogin>
  </ElDialog>
</template>
