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
  <span class="loading px-3 whitespace-nowrap">
    <IconFont class="loading-icon flex" type="loading" suffix="jpg"></IconFont>
    <span class="text-xs inline-block">{{ value }}</span>
  </span>
</template>

<style scoped lang="scss">
.loading {
  color: #fff;
  background: #2b8dfe;
  border-radius: 12px;
  display: inline-block;
  height: 26px;
  line-height: 24px;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
  padding-left: 36px;
  .loading-icon {
    overflow: hidden;
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translate(0, -50%);
  }
}

@keyframes loadingHidden {
  0% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
    transform: translateY(-50%) scale(0.1);
  }
}
@keyframes loadingFont {
  /* 设置元素运动轨迹 */
  0% {
    padding-left: 36px;
  }
  100% {
    padding-left: 12px;
    background: rgba(37, 62, 111, 0.1);
    color: rgba(37, 62, 111, 0.35);
  }
}
.loading {
  animation: loadingFont 0.8s ease-in-out 1 normal running;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
.loading-icon {
  animation: loadingHidden 0.5s ease-in-out 1 normal running;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
</style>
