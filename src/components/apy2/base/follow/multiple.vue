<script setup lang="ts">/**
 * @file 币种多选收藏
 */
import { ref } from 'vue'

// @ts-ignore
const title = ref<string>('添加币种 & LP')
// @ts-ignore
const subTitle = ref<string>('已选')
// @ts-ignore
const radios = [
  { label: '单币', value: 'token' },
  { label: 'LP', value: 'lp' }
]

</script>

<template>
  <UiTransfer :title="title" :sub-title="subTitle" :radios="radios">
    <template #content>
      <el-button type="primary" size="medium">
        <div class="py-1.5 px-7">{{ title }}</div>
      </el-button>
    </template>
  </UiTransfer>
</template>
