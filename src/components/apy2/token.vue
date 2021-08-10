<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { useProvide } from '~/utils/use/state'
const [ date ] = useProvide('uiDate')

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
    </template>
  </UiLayoutMenu>

</template>

<style scoped lang="scss">

</style>
