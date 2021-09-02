<script setup lang="ts">
// @ts-ignore
import QrCode from 'qrcode'
import router from '~/utils/router'
import { defineProps, getCurrentInstance, onMounted } from 'vue'

const instance = getCurrentInstance()

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  href: {
    type: Boolean,
    default: () => false
  },
  width: {
    type: [Number, String],
    required: true
  },
  height: {
    type: [Number, String],
    required: true
  }
})

const getContent = function() {
  const vnode = instance?.vnode
  if (vnode) {
    return vnode.el
  }
  return null
}

onMounted(function(){
  const dom = getContent()
  if (dom) {
    const value = props.href ? router(props.value) : props.value
    console.log(value)
    QrCode.toCanvas(dom, value, {
      margin: 0,
      width: props.width,
      height: props.height
    })
  }
})

</script>

<template>
  <canvas class="inline-block"></canvas>
</template>


