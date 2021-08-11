<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { useProvide } from '~/utils/use/state'
// @ts-ignore
const [ date ] = useProvide('uiDate')

// @ts-ignore
const radios = [
  { label: '单币', value: 1 },
  { label: 'LP', value: 2 }
]

const onSumbit = function(value: Array<string | number>) {
  console.log(value)
}

</script>

<template>
  <UiLayoutMenu>
    <template #menu>
      <span>左侧菜单</span>
    </template>

    <template #content>
      <div class="p-5">
        <UiDateDay :shortcuts="['7', { value: '30', 'default': true }, '180']"></UiDateDay>
      </div>

      <div>{{ date }}</div>

      <UiTransfer title="添加币种 & LP" sub-title="已选" :radios="radios" @submit="onSumbit">
        <template #item="scope">
          <span class="text-global-highTitle text-xs font-normal">BTC/ETH-{{ scope.data }}</span>
        </template>

        <template #result="scope">
          <span>BTC/ETH-{{ scope.id }}</span>
        </template>
      </UiTransfer>

    </template>
  </UiLayoutMenu>

</template>

<style scoped lang="scss">

</style>
