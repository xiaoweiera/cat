<script setup lang="ts">
/**
 * @file 排序组
 */

import { ref, provide, toRaw } from 'vue'
import { toArray } from '~/utils'

const state = ref<any[]>([])

provide('getSortGroup', state)

provide('setSortGroup', function(data: any) {
  const list = toArray(toRaw(state.value))
  list.push(data)
  state.value = list
})



</script>

<template>
  <div title="sort">
    <slot></slot>
  </div>
</template>
