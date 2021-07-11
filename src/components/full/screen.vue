<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProvide } from '~/utils/use/state'

const [ fullStatus ] = useProvide('fullStatus', false)

/*
const fullStatus = ref<boolean>(false)

function fullScreen(dom: HTMLElement): boolean {
  // @ts-ignore
  const rfs = dom.requestFullScreen || dom.webkitRequestFullScreen || dom.mozRequestFullScreen || dom.msRequestFullScreen
  if (typeof rfs != "undefined" && rfs) {
    fullStatus.value = true
    rfs.call(dom)
    return true
  }
  return false
}

function exitFullScreen(): boolean {
  const el = document
  // @ts-ignore
  const cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  if (typeof cfs != "undefined" && cfs) {
    cfs.call(el)
    setTimeout(() => {
      fullStatus.value = false
    }, 500)
    return true
  }
  return false
}

// @ts-ignore
const onFull = function() {
  const dom: any = echartBox.value
  const status = fullStatus.value ? exitFullScreen(dom) : fullScreen(dom)
  console.log(status)
}
*/

const className = computed<string>(function(): string {
  const [ status ] = fullStatus?.value
  if (status) {
    return 'fixed top-0 right-0 bottom-0 left-0 bg-white z-1000'
  }
  return ''
})

</script>

<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

