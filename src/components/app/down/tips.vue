<script setup lang="ts">
import { defineEmit } from 'vue'
const emitEvent = defineEmit(['click'])

// @ts-ignore
const onClick = function() {
  emitEvent('click')
}

</script>

<template>
  <div class="text-center">
    <p class="text-xs desc">扫码下载 APP 接收全部异动</p>
    <div class="py-4">
      <img class="w-40 h-40 inline-table" src="https://res.ikingdata.com/nav/topicDown.png">
    </div>
    <div>
      <div class="w-56 px-0.5 inline-block" @click="onClick">
        <el-button class="w-full" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.desc {
  color: #989898;
}
</style>
