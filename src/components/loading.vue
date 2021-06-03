<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'

defineProps({
  value: {
    type: String,
    default() {
      return I18n.common.message.testing
    },
  },
})
</script>

<template>
  <span class="loading py-1 px-3 inline-flex">
    <IconFont class="loading-icon" type="loading" suffix="jpg"></IconFont>
    <span class="text-xs ml-1 inline-block">{{ value }}</span>
  </span>
</template>

<style scoped lang="scss">
.loading {
  color: #fff;
  background: #2b8dfe;
  border-radius: 12px;
  line-height: 20px;
}

@keyframes loadingHidden {
  /* 设置元素运动轨迹 */
  0% {
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
    font-size: 0;
  }
}
@keyframes loadingFont {
  /* 设置元素运动轨迹 */
  0% {
    opacity: 1;
  }
  100% {
    background: rgba(37, 62, 111, 0.1);
    color: rgba(37, 62, 111, 0.35);
  }
}
.loading {
  animation: loadingFont 1s ease-in-out 1 normal running;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
.loading-icon {
  animation: loadingHidden 1s ease-in-out 1 normal running;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
</style>
