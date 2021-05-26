<script setup lang="ts">
import { defineProps } from 'vue'
import { copyTxt } from '~/lib/tool'
const props = defineProps({
  message: {
    type: Boolean,
    default() {
      return true
    },
  },
  link: {
    type: [Function, String],
    default() {
      return ''
    },
  },
})

const copy = function() {
  if (typeof props.link === 'function') {
    const value = props.link()
    copyTxt(value, props.message)
  } else {
    copyTxt(props.link, props.message)
  }
}
</script>

<template>
  <span class="inline-block" @click.stop.prevent="copy">
    <slot></slot>
  </span>
</template>
