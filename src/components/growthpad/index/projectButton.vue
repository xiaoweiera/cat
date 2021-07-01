<script setup lang="ts">
import { defineProps, computed } from 'vue'
import I18n from '~/utils/i18n'
import { TimeStatus } from '~/components/growthpad/task/task'

const props = defineProps({
  status: String,
  url: String,
})
// 得到背景颜色
const txts = {
  ing: I18n.growthpadShow.ingButton,
  wait: I18n.growthpadShow.waitButton,
  closure: I18n.growthpadShow.lockreward,
}

const link = computed<string>(function(): string {
  if (props.status !== TimeStatus.wait) {
    return props.url
  }
  return ''
})

</script>
<template>
<!--  v-if="props.status"-->
  <a v-router="link" class="w-full mt-6 text-white hand text-center flex justify-center items-center" :class="props.status" target="_blank">
    <span class="text-kd14px18px font-medium inline-block">{{ txts[props.status] }}</span>
    <IconFont class="ml-1 flex" type="status-right" size="xs"></IconFont>
  </a>
</template>
<style scoped lang="scss">
%button {
  padding: 9px 12px;
  border-radius: 44px;
}
.ing {
  background: #0ec674;
  @extend %button;
}
.wait {
  cursor: default;
  @extend %button;
  @apply bg-white bg-opacity-30 text-global-primary text-opacity-30;
  .icon-font {
    display: none;
  }
}
.closure {
  @extend %button;
  @apply bg-global-primary;
}
</style>
