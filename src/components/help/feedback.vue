<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as scroll from '~/utils/event/scroll'

const hide = ref<boolean>(false)

const namespace = 'feedback'

let body: any

function scrollTop(): number {
  let scroll_top = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop
  }
  else if (document.body) {
    scroll_top = document.body.scrollTop
  }
  return scroll_top;
}

const onScroll = function(e: Event) {
  if (!body) {
    body = document.querySelector('body')
  }
  const width = body.clientWidth
  if (width <= 768) {
    const top = scrollTop()
    if (top > 200) {
      hide.value = true
      return void 0
    }
  }
  hide.value = false
}


onMounted(() => {
  // 组件加载后绑定事件
  scroll.bind(namespace, onScroll)
})

onUnmounted(() => {
  // 组件销毁时移除事件
  scroll.unbind(namespace)
})

</script>

<template>
  <div class="hidden md:block fixed top-1/2 right-5 transform -translate-y-1/2">
    <HelpFeedbackContent></HelpFeedbackContent>
  </div>
  <div class="block md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 help-main" :class="{'hide': hide}">
    <HelpFeedbackContent class="whitespace-nowrap"></HelpFeedbackContent>
  </div>
</template>

<style scoped lang="scss">
  .help-main {
    transition: all 0.3s;
  }
  .hide {
    bottom: 0;
    transform: translateX(-50%) translateY(200%);
  }
</style>
