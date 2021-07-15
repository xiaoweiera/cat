<script setup lang="ts">
import { uuid } from '~/utils/index'
import { ref, defineEmit, onMounted, toRaw, onUnmounted } from 'vue'
const emitEvent = defineEmit(['onload'])
import * as scroll from '~/utils/event/scroll'

const winShowRef = ref<any>(null)
const loaded = ref<boolean>(false)
const winKey = uuid()

const offsetY = function (dom: HTMLElement, number = 0): number {
  const body = document.body || document.querySelector('body')
  if (dom) {
    const value = number + dom.offsetTop
    const parent = dom.offsetParent
    if (parent === body) {
      return value
    }
    return offsetY(parent, value)
  }
  return number
}

const onScroll = function() {
  const top = scroll.scrollTop()
  const viewHeight = scroll.viewHieght()
  const box = toRaw(winShowRef).value
  const offsetTop = offsetY(box)

  if (offsetTop < top + viewHeight) {
    loaded.value = true
    scroll.unbind(winKey)
    emitEvent('onload')
  }
}

onMounted(function() {
  scroll.bind(winKey, onScroll)
  onScroll()
})

onUnmounted(function() {
  scroll.unbind(winKey)
})

</script>

<template>
  <div ref="winShowRef"></div>
  <slot v-if="loaded"></slot>
</template>


