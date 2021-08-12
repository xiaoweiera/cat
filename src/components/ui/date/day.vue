<script setup lang="ts">
/**
 * @file 基于 UiDate 组件，抽象出一个只提供日期的选择器
 */
import { defineEmit, defineProps } from 'vue'
const emitEvent = defineEmit(['change', 'update:value'])

defineProps({
  shortcuts: {
    type: Array,
    default () {
      return [{ value: '7', 'default': true }, '30', '90', 'custom']
    }
  }
})
// @ts-ignore
const onChange = function(value: any) {
  console.log(value)
  emitEvent('update:value', value)
  emitEvent('change', value)
}

</script>

<template>
  <UiDate hidden-type :shortcuts="{'day': shortcuts}" @change="onChange"></UiDate>
</template>
