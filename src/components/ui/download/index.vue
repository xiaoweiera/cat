<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useProvide } from '~/utils/use/state'
const instance = getCurrentInstance()

const getContent = function() {
  const vnode = instance?.vnode
  if (vnode) {
    return vnode.el
  }
  return null
}

useProvide('downloadContent', getContent)

</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

