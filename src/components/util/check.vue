<script setup lang="ts">
import { defineEmit } from 'vue'
import { current } from '~/utils/lang'

const emitEvent = defineEmit(['change', 'error'])

const callback = `callback_${Date.now()}`
// @ts-ignore
const url = `/util/check.html?lang=${current.value}&callback=${callback}`

// @ts-ignore
window[callback] = function(result: any) {
  const data: any = result?.data
  if (data) {
    emitEvent('change', data)
  } else {
    emitEvent('error')
  }
}
</script>

<template>
  <div class="flex">
    <div class="inline-block">
      <iframe
        class="check-main"
        :src="url"
        frameborder="0"
        scrolling="No"
        leftmargin="0"
        topmargin="0"
      ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
.check-main {
  height: 44px;
  width: 360px;
}
</style>
